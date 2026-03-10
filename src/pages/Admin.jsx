import { useEffect, useState } from "react";
import { Users, BookOpen, Code, Layers, TrendingUp, Activity, BarChart3 } from "lucide-react";

function Admin() {
    const [stats, setStats] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5001/admin/stats")
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching stats:", err);
                setIsLoading(false);
            });
    }, []);

    const statCards = [
        { label: "Total Users", value: stats.totalUsers || 0, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "DSA Topics", value: stats.dsaTopics || 0, icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Total Problems", value: stats.totalProblems || 0, icon: Code, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Subjects", value: stats.subjects || 0, icon: Layers, color: "text-amber-600", bg: "bg-amber-50" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-1">Monitor your platform's growth and metrics</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                        <div className="p-2 bg-green-50 rounded-lg">
                            <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 pr-2">System Live</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statCards.map((card, idx) => (
                        <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-2xl ${card.bg} group-hover:scale-110 transition-transform duration-300`}>
                                    <card.icon className={`w-6 h-6 ${card.color}`} />
                                </div>
                                <TrendingUp className="w-5 h-5 text-gray-300" />
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium">{card.label}</h3>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {isLoading ? "..." : card.value.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity / Placeholder Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-blue-600" />
                                Growth Overview
                            </h2>
                            <select className="bg-gray-50 border border-gray-100 text-sm rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-100">
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                            </select>
                        </div>

                        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-2xl text-gray-400">
                            <TrendingUp className="w-12 h-12 mb-2 opacity-20" />
                            <p>Analytics visualization placeholder</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-blue-500/25 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                            <div className="space-y-4">
                                <button className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all font-semibold flex items-center justify-center gap-2">
                                    Add New DSA Topic
                                </button>
                                <button className="w-full py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all font-semibold flex items-center justify-center gap-2">
                                    Post Announcement
                                </button>
                                <button className="w-full py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-bold flex items-center justify-center gap-2">
                                    System Settings
                                </button>
                            </div>
                        </div>
                        {/* Background decorative circles */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
