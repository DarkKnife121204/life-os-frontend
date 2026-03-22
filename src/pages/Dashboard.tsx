import { useState } from "react";

export default function Dashboard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log({
            email,
            password,
        });

        // тут будет axios -> /api/login
    };

    return (
        <div className="min-h-screen font-[Orbitron] flex items-center justify-center bg-gradient-to-bl from-dark via-neutral-950 to-fuchsia-950">
            <form onSubmit={handleSubmit}
                  className="flex flex-col items-center justify-center px-12 py-10 rounded-2xl bg-dark backdrop-blur-xl border border-deep [box-shadow:0_0_15px_var(--color-purple),0_0_40px_var(--color-accent),0_0_80px_#4c0033]"
            >
                <h1 className="text-white text-2xl mb-6">Вход</h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-3 rounded bg-gray-700 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    className="w-full mb-6 p-3 rounded bg-gray-700 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
                >
                    Войти
                </button>
            </form>
        </div>
    );
}