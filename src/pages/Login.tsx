import { useState } from "react";
import { login } from "../api/auth.ts";
import { setToken } from "../lib/token.ts";
import { useNavigate } from "react-router-dom";
import { useToast } from "../app/providers/ToastProvider";

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
        <div className="min-h-screen font-[Orbitron] flex items-center justify-center bg-gradient-to-bl from-dark via-neutral-950 to-fuchsia-950">
            <form onSubmit={handleSubmit}
                  className="flex flex-col items-center justify-center px-12 py-10 rounded-3xl bg-dark backdrop-blur-xl border border-fuchsia-950
                    [box-shadow:0_0_15px_var(--color-purple),0_0_40px_var(--color-accent),0_0_80px_#4c0033]"
            >
                <div className="absolute inset-0 rounded-3xl blur-2xl opacity-40 bg-violet-500/20 -z-10"></div>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 p-3 rounded bg-gray-800 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-violet-700 hover:bg-violet-800 text-white p-3 rounded cursor-pointer"
                >
                    Login
                </button>
            </form>
        </div>
    );
}