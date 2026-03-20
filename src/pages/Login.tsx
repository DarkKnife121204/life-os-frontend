import { useState } from "react";

export default function Login() {
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
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-2xl w-full max-w-sm"
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