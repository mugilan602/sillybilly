import { useState } from "react";
import { ShoppingCart, Inbox, Database, Image, Film } from "lucide-react"; // Import Icons
function Dashboard() {
    const [inquiries] = useState([
        { name: "Sarah Wilson", message: "Interested in adopting a Holland Lop bunny...", time: "5m ago" },
        { name: "Michael Brown", message: "Questions about bunny care and housing...", time: "2h ago" },
        { name: "David Chen", message: "Requesting more information about breeding pairs...", time: "1d ago" }
    ]);
    
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                <StatCard title="Available Bunnies" value="24" icon={ShoppingCart} />
                <StatCard title="Sold Bunnies" value="156" icon={ShoppingCart} />
                <StatCard title="Storage Used" value="75%" icon={Database} />
                <StatCard title="New Messages" value="12" icon={Inbox} />
                <StatCard title="Gallery Listings" value="85" icon={Image} />
                <StatCard title="Carousel Images" value="32" icon={Film} />
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
                {inquiries.map((inquiry, index) => (
                    <div key={index} className="py-3 border-b last:border-0 flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{inquiry.name}</p>
                            <p className="text-gray-600 text-sm">{inquiry.message}</p>
                        </div>
                        <p className="text-gray-500 text-sm">{inquiry.time}</p>
                    </div>
                ))}
                <button className="mt-4 w-full bg-black text-white py-2 rounded">View All Messages</button>
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

// StatCard Component (Reusable)
const StatCard = ({ title, value, icon: Icon }) => {
    return (
        <div className="bg-white px-2 py-4 rounded-lg shadow flex items-center space-x-4">
            {/* Icon */}
            <div className="bg-gray-200 p-3 rounded-full">
                <Icon size={24} className="text-gray-700" />
            </div>

            {/* Text Content */}
            <div>
                <p className="text-gray-500 text-sm">{title}</p>
                <p className="text-2xl font-semibold">{value}</p>
            </div>
        </div>
    );
};


export default Dashboard;
