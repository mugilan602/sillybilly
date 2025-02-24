import { useState, useEffect } from "react";
import { ShoppingCart, Inbox, Database, Image, Film } from "lucide-react";
import { Link } from "react-router-dom";
function Dashboard() {
    const [inquiries, setInquiries] = useState([]);

    useEffect(() => {
        fetch("https://backend.sillybillysilkies.workers.dev/responses")
            .then((res) => res.json())
            .then((data) => {
                // Sort by created_at (latest first) and get the top 3
                const sortedData = data
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 3)
                    .map(inquiry => ({
                        ...inquiry,
                        // Convert UTC to Canada (Eastern Time)
                        created_at: new Date(inquiry.created_at).toLocaleString("en-CA", {
                            timeZone: "America/Toronto",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        })
                    }));

                setInquiries(sortedData);
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                <StatCard title="Available Bunnies" value="24" icon={ShoppingCart} />
                <StatCard title="Sold Bunnies" value="156" icon={ShoppingCart} />
                <StatCard title="Storage Used" value="75%" icon={Database} />
                <StatCard title="New Messages" value={inquiries.length} icon={Inbox} />
                <StatCard title="Gallery Listings" value="85" icon={Image} />
                <StatCard title="Carousel Images" value="32" icon={Film} />
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
                {inquiries.length > 0 ? (
                    inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="py-3 border-b last:border-0 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{inquiry.firstname} {inquiry.lastname}</p>
                                <p className="text-gray-600 text-sm">{inquiry.message}</p>
                            </div>
                            <p className="text-gray-500 text-sm">{inquiry.created_at.split(",")[0] + inquiry.created_at.split(",")[1]}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No recent inquiries.</p>
                )}
                <Link to="/admin/forms" className="mt-4 w-full bg-black text-white py-2 rounded text-center block">
                    View All Messages
                </Link>

            </div>

            {/* System Status */}
            <div className="bg-white p-4 rounded-lg shadow mt-6 flex justify-between items-center">
                <p className="flex items-center text-green-600">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span> System Status: Operational
                </p>
                <p className="text-gray-500">Last Update: 5 minutes ago</p>
            </div>
        </div>
    );
}

// StatCard Component
const StatCard = ({ title, value, icon: Icon }) => {
    return (
        <div className="bg-white px-2 py-4 rounded-lg shadow flex items-center space-x-4">
            <div className="bg-gray-200 p-3 rounded-full">
                <Icon size={24} className="text-gray-700" />
            </div>
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-semibold">{value}</p>
            </div>
        </div>
    );
};

export default Dashboard;
