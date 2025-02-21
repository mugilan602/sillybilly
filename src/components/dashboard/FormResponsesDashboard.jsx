import { useEffect, useState } from "react";
import { FaEye, FaTrash, FaReply } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const FormResponsesDashboard = () => {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");
    const [sendingReply, setSendingReply] = useState(false);
    const responsesPerPage = 10;

    useEffect(() => {
        const fetchResponses = async () => {
            try {
                const response = await fetch("https://workers-getting-started.mugilan7778.workers.dev/responses");
                const data = await response.json();

                if (Array.isArray(data)) {
                    setResponses(data);
                } else {
                    console.error("Unexpected data format:", data);
                    setError("Invalid response format");
                }
            } catch (error) {
                console.error("Error fetching responses:", error);
                setError("Failed to fetch responses");
            } finally {
                setLoading(false);
            }
        };

        fetchResponses();
    }, []);

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await fetch(`https://workers-getting-started.mugilan7778.workers.dev/delete/${id}`, {
                method: "DELETE",
            });
            setResponses(responses.filter(response => response.id !== id));
        } catch (err) {
            console.error("Error deleting response:", err);
        } finally {
            setDeletingId(null);
        }
    };

    const handleReply = async () => {
        if (!replyMessage.trim()) return;
        setSendingReply(true);

        try {
            await fetch("https://workers-getting-started.mugilan7778.workers.dev/reply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: selectedResponse.email,
                    message: replyMessage,
                }),
            });

            alert("Reply sent successfully!");
            setReplyMessage("");
            setSelectedResponse(null);
        } catch (err) {
            console.error("Error sending reply:", err);
            alert("Failed to send reply.");
        } finally {
            setSendingReply(false);
        }
    };

    const totalPages = Math.ceil(responses.length / responsesPerPage);
    const currentResponses = responses.slice((currentPage - 1) * responsesPerPage, currentPage * responsesPerPage);

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            <h1 className="text-xl md:text-2xl font-semibold mb-2 text-center md:text-left">Form Responses Dashboard</h1>
            <p className="text-gray-500 mb-6 text-center md:text-left">Total Responses: {responses.length}</p>

            {loading ? (
                <p className="text-center text-gray-700">Loading responses...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max border-collapse">
                            <thead>
                                <tr className="border-b text-gray-700 text-sm md:text-base">
                                    <th className="p-3 text-left">First Name</th>
                                    <th className="p-3 text-left">Last Name</th>
                                    <th className="p-3 text-left hidden md:table-cell">Email</th>
                                    <th className="p-3 text-left hidden md:table-cell">Message</th>
                                    <th className="p-3 text-left hidden md:table-cell">Date</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentResponses.map((response) => (
                                    <tr key={response.id} className="border-b hover:bg-gray-50 text-sm">
                                        <td className="p-3 font-semibold">{response.firstname}</td>
                                        <td className="p-3">{response.lastname}</td>
                                        <td className="p-3 hidden md:table-cell">{response.email}</td>
                                        <td className="p-3 hidden md:table-cell truncate max-w-xs">{response.message}</td>
                                        <td className="p-3 hidden md:table-cell">
                                            {new Date(response.created_at).toLocaleDateString("en-CA", {
                                                timeZone: "America/Toronto",
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="p-3 flex items-center space-x-3">
                                            <FaEye
                                                className="text-gray-500 cursor-pointer hover:text-black text-lg"
                                                onClick={() => setSelectedResponse(response)}
                                            />
                                            <button
                                                onClick={() => handleDelete(response.id)}
                                                disabled={deletingId === response.id}
                                                className={`text-lg flex items-center justify-center w-6 h-6 ${deletingId === response.id ? "opacity-50 cursor-not-allowed" : "hover:text-red-700"
                                                    }`}
                                            >
                                                {deletingId === response.id ? (
                                                    <ImSpinner2 className="animate-spin text-red-500" />
                                                ) : (
                                                    <FaTrash className="text-red-500" />
                                                )}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal for Viewing and Replying */}
            {selectedResponse && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setSelectedResponse(null)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full"
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                    >
                        <h2 className="text-xl font-semibold mb-3">Response</h2>
                        <p className="text-gray-700 mb-4">{selectedResponse.message}</p>

                        <div className="mt-4">
                            <label className="text-xl font-medium mb-2 block">Reply</label>
                            <textarea
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                                rows="4"
                                placeholder="Type your reply here..."
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="flex justify-end mt-4 space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                onClick={() => setSelectedResponse(null)}
                            >
                                Close
                            </button>
                            <button
                                className={`px-4 py-2 flex items-center space-x-2 bg-gray-800 text-white rounded hover:bg-gray-700 ${sendingReply ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={handleReply}
                                disabled={sendingReply}
                            >
                                {sendingReply ? <ImSpinner2 className="animate-spin" /> : <FaReply />}
                                <span>{sendingReply ? "Sending..." : "Send Reply"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormResponsesDashboard;
