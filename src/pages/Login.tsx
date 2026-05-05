import { useState } from "react";
import { login } from "../api/auth.ts";
import { setToken } from "../lib/token.ts";
import { useNavigate } from "react-router-dom";
import { useToast } from "../app/providers/ToastProvider";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import EmailIcon from '../components/icons/email.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import LockIcon from '../components/icons/lock.svg?react';
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const res = await login(email, password);

        setLoading(false);

        if (!res.success) {
            showToast({
                message: res.message || "Login error",
                status: res.status,
            });
            return;
        }

        setToken(res.token);
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen font-[Orbitron] flex items-center justify-center bg-[#030712] text-white">
            <div className="w-full max-w-[600px] px-6">
                <div className="text-center mb-12">
                    <h1 className="text-6xl font-bold tracking-wide">
                        Life<span className="text-primary">OS</span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="relative w-full rounded-2xl px-16 py-12 bg-[#050816]/95 border border-primary/25 shadow-[0_0_25px_rgba(0,255,255,0.10)]">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold mb-4">
                            Welcome back
                        </h2>
                        <p className="text-cyan-100/50 text-lg">
                            Sign in to continue to your account
                        </p>
                    </div>

                    <div className="mb-7">
                        <label className="block mb-3 text-sm text-white/90">
                            Email
                        </label>

                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary text-2xl h-min">
                                <EmailIcon className="w-7 h-7"></EmailIcon>
                            </span>

                            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-16 pl-16 pr-5 rounded-xl bg-[#020617] border border-primary/20 text-white placeholder:text-cyan-100/40 outline-none
                                    focus:border-primary/70 focus:shadow-[0_0_18px_rgba(0,255,255,0.25)] transition"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-3 text-sm text-white/90">
                            Password
                        </label>

                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-primary text-3xl h-min">
                                <LockIcon className="w-6 h-6"></LockIcon>
                            </span>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-16 pl-16 pr-5 rounded-xl bg-black/20 border border-primary/20 text-white placeholder:text-cyan-100/40
                                    outline-none focus:border-primary/70 focus:shadow-[0_0_18px_rgba(0,255,255,0.25)] transition
                                "
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mb-10">
                        <button type="button" className="text-primary text-sm hover:text-white transition">
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-16 rounded-xl border border-primary text-primary font-bold text-lg bg-primary/5 shadow-[0_0_20px_rgba(0,255,255,0.35)]
                            hover:bg-primary hover:text-dark disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition
                        "
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}