import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const FormResponsesDashboard = () => {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [subject, setSubject] = useState("");
    const [replyMessage, setReplyMessage] = useState("");
    const [sendingReply, setSendingReply] = useState(false);
    const responsesPerPage = 10;

    useEffect(() => {
        const fetchResponses = async () => {
            setLoading(true);
            try {
                const response = await fetch("https://backend.sillybillysilkies.workers.dev/responses");
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
    const handleReply = async () => {
        if (!replyMessage.trim() || !subject.trim()) {
            alert("Please enter both subject and message.");
            return;
        }

        setSendingReply(true);

        try {
            const formData = new FormData();
            formData.append("to", selectedResponse.email);
            formData.append("subject", subject);
            formData.append("message", replyMessage);

            await fetch("https://backend.sillybillysilkies.workers.dev/sendmail", {
                method: "POST",
                body: formData, // FormData automatically sets the correct Content-Type
            });

            alert("Reply sent successfully!");
            setReplyMessage("");
            setSubject("");
            setSelectedResponse(null);
        } catch (err) {
            console.error("Error sending reply:", err);
            alert("Failed to send reply.");
        } finally {
            setSendingReply(false);
        }
    };

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            await fetch(`https://backend.sillybillysilkies.workers.dev/delete/${id}`, {
                method: "DELETE",
            });
            setResponses(responses.filter(response => response.id !== id));
        } catch (err) {
            console.error("Error deleting response:", err);
        } finally {
            setDeletingId(null);
        }
    };

    const totalPages = Math.ceil(responses.length / responsesPerPage);
    const currentResponses = responses.slice((currentPage - 1) * responsesPerPage, currentPage * responsesPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            <h1 className="text-xl text-[#754E1A] md:text-2xl font-semibold mb-2 text-center md:text-left">
                Form Responses Dashboard
            </h1>
            <p className="text-[#754E1A] mb-6 text-center md:text-left">
                Total Responses: {responses.length}
            </p>

            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <span className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12"></span>
                    <p className="ml-3 text-gray-700">Loading responses...</p>
                </div>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max border-collapse">
                            <thead>
                                <tr className="border-b border-[#4A3B2D] text-gray-700 text-sm md:text-base">
                                    <th className="p-3 text-[#754E1A] text-left">First Name</th>
                                    <th className="p-3 text-[#754E1A] text-left">Last Name</th>
                                    <th className="p-3 text-[#754E1A] text-left hidden md:table-cell">Email</th>
                                    <th className="p-3 text-[#754E1A] text-left hidden md:table-cell">Message</th>
                                    <th className="p-3 text-[#754E1A] text-left hidden md:table-cell">Date</th>
                                    <th className="p-3 text-[#754E1A] text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentResponses.map((response) => (
                                    <tr key={response.id} className="border-b hover:bg-gray-50 text-sm">
                                        <td className="p-3 text-[#754E1A] font-semibold">{response.firstname}</td>
                                        <td className="p-3 text-[#754E1A]">{response.lastname}</td>
                                        <td className="p-3 text-[#754E1A] hidden md:table-cell">{response.email}</td>
                                        <td className="p-3 text-[#754E1A] hidden md:table-cell truncate max-w-xs">{response.message}</td>
                                        <td className="p-3 text-[#754E1A] hidden md:table-cell">
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
                    {selectedResponse && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedResponse(null)}>
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
                                <h2 className="text-xl font-semibold mb-3">Response</h2>
                                <p className="text-gray-700 mb-4">{selectedResponse.message}</p>
                                <input className="w-full border rounded-md p-2" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                                <textarea className="w-full p-2 border rounded-md mt-3" rows="4" placeholder="Type your reply..." value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)}></textarea>
                                <div className="flex justify-end mt-4">
                                    <button className="px-4 py-2 bg-[#754E1A] cursor-pointer hover:bg-[#5f482a] text-white rounded mr-2" onClick={() => setSelectedResponse(null)}>Close</button>
                                    <button className="px-4 py-2 bg-[#754E1A] cursor-pointer hover:bg-[#5f482a] text-white rounded mr-2" onClick={handleReply} disabled={sendingReply}>{sendingReply ? "Sending..." : "Send Reply"}</button>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4 text-gray-700">
                        <p className="text-sm">
                            Showing {responses.length === 0 ? 0 : (currentPage - 1) * responsesPerPage + 1} to{" "}
                            {Math.min(currentPage * responsesPerPage, responses.length)} of {responses.length} results
                        </p>
                        <div className="flex space-x-2">
                            <button
                                className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                &lt;
                            </button>
                            {[...Array(totalPages).keys()].map((num) => (
                                <button
                                    key={num}
                                    className={`px-3 py-1 border rounded ${currentPage === num + 1 ? "bg-gray-300" : "hover:bg-gray-200"}`}
                                    onClick={() => handlePageChange(num + 1)}
                                >
                                    {num + 1}
                                </button>
                            ))}
                            <button
                                className={`px-3 py-1 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormResponsesDashboard;
