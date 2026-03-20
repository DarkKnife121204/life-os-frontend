import { Link } from "react-router-dom";

const menu = [
    { path: "/", label: "Dashboard" },
    { path: "/tasks", label: "Задачи" },
    { path: "/planning", label: "План дня" },
    { path: "/habits", label: "Привычки" },
    { path: "/mood", label: "Настроение" },
    { path: "/sleep", label: "Сон" },
    { path: "/health", label: "Здоровье" },
    { path: "/finance", label: "Финансы" },
    { path: "/bookmarks", label: "Закладки" },
    { path: "/analytics", label: "Аналитика" },
];

export default function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-4">
            <h1 className="text-xl font-bold mb-6 text-red-950">LifeOS</h1>

            <nav className="flex flex-col gap-2">
                {menu.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="p-2 rounded hover:bg-gray-700"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}