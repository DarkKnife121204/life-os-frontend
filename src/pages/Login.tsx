import { useState } from "react";
import { login } from "../api/auth.ts";
import { setToken } from "../lib/token.ts";
import { useNavigate } from "react-router-dom";
import { useToast } from "../app/providers/ToastProvider";

import EmailIcon from "../components/icons/email.svg?react";
import LockIcon from "../components/icons/lock.svg?react";

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
                title: "Login Error",
                message: res.message || "Login error",
                status: res.status,
            });
            return;
        }

        setToken(res.token);
        navigate("/dashboard");
    };

    return (
        <div className="min-h-dvh bg-[#030712] px-4 py-6 text-white font-[Orbitron] flex items-center justify-center">
            <div className="w-full max-w-[600px]">
                <div className="mb-8 text-center md:mb-12">
                    <h1 className="text-4xl font-bold tracking-wide sm:text-5xl md:text-6xl">
                        Life<span className="text-primary">OS</span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="relative w-full rounded-2xl border border-primary/25 bg-[#050816]/95 px-5 py-7
                        sm:px-8 sm:py-9 md:px-16 md:py-12 shadow-[0_0_25px_rgba(0,255,255,0.10)]">
                    <div className="mb-7 text-center md:mb-10">
                        <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:mb-4 md:text-4xl">
                            Welcome back
                        </h2>

                        <p className="text-sm text-cyan-100/50 sm:text-base md:text-lg">
                            Sign in to continue to your account
                        </p>
                    </div>

                    <div className="mb-5 md:mb-7">
                        <label className="mb-2 block text-sm text-white/90 md:mb-3">
                            Email
                        </label>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary md:left-5">
                                <EmailIcon className="h-5 w-5 md:h-7 md:w-7" />
                            </span>

                            <input type="email" placeholder="Enter your email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 w-full rounded-xl border border-primary/20 bg-[#020617] pl-12 pr-4 text-sm text-white placeholder:text-cyan-100/40 outline-none
                                    transition focus:border-primary/70 focus:shadow-[0_0_18px_rgba(0,255,255,0.25)] md:h-16 md:pl-16 md:pr-5 md:text-base"/>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="mb-2 block text-sm text-white/90 md:mb-3">
                            Password
                        </label>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary md:left-5">
                                <LockIcon className="h-5 w-5 md:h-6 md:w-6" />
                            </span>

                            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}
                                className="h-12 w-full rounded-xl border border-primary/20 bg-black/20 pl-12 pr-4 text-sm text-white placeholder:text-cyan-100/40
                                    outline-none transition focus:border-primary/70 focus:shadow-[0_0_18px_rgba(0,255,255,0.25)] md:h-16 md:pl-16 md:pr-5 md:text-base"/>
                        </div>
                    </div>

                    <div className="mb-7 flex justify-end md:mb-10">
                        <button type="button" className="cursor-pointer text-sm text-primary transition hover:text-white">
                            Forgot password?
                        </button>
                    </div>

                    <button type="submit" disabled={loading}
                        className="h-12 w-full rounded-xl border border-primary bg-primary/5 text-base font-bold text-primary shadow-[0_0_20px_rgba(0,255,255,0.35)] transition
                            hover:bg-primary hover:text-dark disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer md:h-16 md:text-lg">
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}