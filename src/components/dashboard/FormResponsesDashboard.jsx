import { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";

const FormResponsesDashboard = () => {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
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

    const totalPages = Math.ceil(responses.length / responsesPerPage);
    const currentResponses = responses.slice((currentPage - 1) * responsesPerPage, currentPage * responsesPerPage);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-2">Form Responses Dashboard</h1>
            <p className="text-gray-500 mb-6">Total Responses: {responses.length}</p>

            {loading ? (
                <p>Loading responses...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="bg-white p-4 rounded-lg shadow">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b text-gray-700">
                                <th className="p-3 text-left">First Name</th>
                                <th className="p-3 text-left">Last Name</th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Message</th>
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentResponses.map((response) => (
                                <tr key={response.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-semibold">{response.firstname}</td>
                                    <td className="p-3">{response.lastname}</td>
                                    <td className="p-3">{response.email}</td>
                                    <td className="p-3 truncate max-w-xs">{response.message}</td>
                                    <td className="p-3">{new Date(response.created_at).toISOString().split("T")[0]}</td>
                                    <td className="p-3 flex items-center space-x-4">
                                        <FaEye className="text-gray-500 cursor-pointer hover:text-black text-lg" />
                                        <button
                                            onClick={() => handleDelete(response.id)}
                                            disabled={deletingId === response.id}
                                            className={`text-lg flex items-center justify-center w-6 h-6 ${deletingId === response.id ? "opacity-50 cursor-not-allowed" : "hover:text-red-700"}`}
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

                    <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-sm text-gray-600">Showing {responsesPerPage} results per page</span>
                        <div className="flex items-center space-x-2">
                            <button
                                className={`px-3 py-1 border rounded ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"}`}
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                {"<"}
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-gray-800 text-white" : "hover:bg-gray-200"}`}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                className={`px-3 py-1 border rounded ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"}`}
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                {">"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormResponsesDashboard;
