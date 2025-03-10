import { useState, useEffect } from "react";
import { ShoppingCart, Inbox, Database, Image, Film } from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
    // State to store fetched data
    const [stats, setStats] = useState({
        availableBunnies: 0,
        soldBunnies: 0,
        storageUsed: "0%",
        messagesCount: 0,
        galleryCount: 0,
        carouselCount: 0
    });
    const [inquiries, setInquiries] = useState([]);
    console.log(stats);

    // Function to fetch dashboard stats
    const fetchStats = async () => {
        try {
            // Fetch all required API data concurrently
            const [
                bunniesRes,
                storageRes,
                messagesRes,
                galleryRes,
                homepageRes
            ] = await Promise.all([
                fetch("https://backend.sillybillysilkies.workers.dev/bunny-status-count").then(res => res.json()),
                fetch("https://backend.sillybillysilkies.workers.dev/storage-usage").then(res => res.json()),
                fetch("https://backend.sillybillysilkies.workers.dev/responses").then(res => res.json()),
                fetch("https://backend.sillybillysilkies.workers.dev/pet-count").then(res => res.json()),
                fetch("https://backend.sillybillysilkies.workers.dev/homepage-image-count").then(res => res.json())
            ]);
            console.log(storageRes);

            // Update state with fetched values
            setStats({
                availableBunnies: bunniesRes.total.available || 0,
                soldBunnies: bunniesRes.total.sold || 0,
                storageUsed: storageRes.usagePercentage || "0%",
                messagesCount: messagesRes.length || 0,
                galleryCount: galleryRes.count || 0,
                carouselCount: homepageRes.count || 0
            });

            // Sort and format recent inquiries
            const sortedInquiries = messagesRes
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 3)
                .map(inquiry => ({
                    ...inquiry,
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

            setInquiries(sortedInquiries);

        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                <StatCard title="Available Bunnies" value={stats.availableBunnies} icon={ShoppingCart} />
                <StatCard title="Sold Bunnies" value={stats.soldBunnies} icon={ShoppingCart} />
                <StatCard title="Storage Used" value={stats.storageUsed} icon={Database} />
                <StatCard title="New Messages" value={stats.messagesCount} icon={Inbox} />
                <StatCard title="Gallery Listings" value={stats.galleryCount} icon={Image} />
                <StatCard title="Carousel Images" value={stats.carouselCount} icon={Film} />
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
                            <p className="text-gray-500 text-sm">
                                {inquiry.created_at.split(",")[0] + inquiry.created_at.split(",")[1]}
                            </p>
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
