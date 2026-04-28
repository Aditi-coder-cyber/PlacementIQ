import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/";
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("http://localhost:5001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.href = "/";
            } else {
                alert(data.message || "Login failed");
            }
        } catch (err) {
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-500">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-semibold text-gray-700">Password</label>
                                <Link to="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">Forgot?</Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-70 transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-bold text-blue-600 hover:text-blue-700">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
