import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import DashboardIcon from "./icons/dashboard.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import TaskIcon from "./icons/task.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import NotesIcon from "./icons/note.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import AnalyticsIcon from "./icons/analytics.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CalendarIcon from "./icons/calendar.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SettingIcon from "./icons/settings.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import HobbyIcon from "./icons/hobby.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import HealthIcon from "./icons/health.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import WalletIcon from "./icons/wallet.svg?react";

const menu = [
    { path: "/dashboard", label: "Dashboard", Icon: DashboardIcon },
    { path: "/calendar", label: "Calendar", Icon: CalendarIcon },
    { path: "/tasks", label: "Tasks", Icon: TaskIcon },
    { path: "/finance", label: "Finance", Icon: WalletIcon },
    { path: "/notes", label: "Notes", Icon: NotesIcon },
    { path: "/habits", label: "Habits", Icon: HobbyIcon },
    { path: "/health", label: "Health", Icon: HealthIcon },
    { path: "/analytics", label: "Analytics", Icon: AnalyticsIcon },
    { path: "/settings", label: "Settings", Icon: SettingIcon },
];

export default function Sidebar() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <aside
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={`sticky top-0 shrink-0 h-screen ${isOpen ? "w-[220px]" : "w-[70px]"} 
                bg-[#020914]/95 backdrop-blur-xl border-r border-cyan-400/10 text-white font-[Orbitron] 
                transition-[width] duration-400 overflow-hidden`}
        >
            <div className="absolute inset-0 pointer-events-none shadow-[0_0_40px_rgba(0,255,255,0.08)]" />

            <div className="relative flex h-full flex-col px-3 py-4">
                <Link to="/dashboard"
                      className="mb-7 h-11 flex items-center rounded-xl text-cyan-400 w-min overflow-hidden">
                    <div className={`h-10 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center overflow-hidden shadow-[0_0_14px_rgba(0,255,255,0.18)] 
                            transition-[width] duration-400 ${isOpen ? "w-[100px]" : "w-10"}`}>
                        <span
                            className="pl-3 h-10 flex items-center justify-center text-xl font-bold leading-none [text-shadow:0_0_10px_rgba(0,255,255,0.8)]">
                            L
                        </span>
                        <span className={`text-xl font-bold [text-shadow:0_0_10px_rgba(0,255,255,0.8)] 
                            transition-all duration-400 ${isOpen ? "opacity-100 max-w-[80px] translate-x-0" : "opacity-0 max-w-0 -translate-x-2"}`}>
                                ifeOS
                        </span>
                    </div>
                </Link>
                <div className="mb-4 h-px w-full bg-cyan-400/10 shadow-[0_0_12px_rgba(0,255,255,0.12)]"/>
                <nav className="flex flex-col gap-3">
                    {menu.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.Icon;

                        return (
                            <Link key={item.path} to={item.path} className={`group/item flex items-center h-12 rounded-xl px-0 overflow-hidden transition-colors duration-400 
                                ${isActive
                                ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/40 shadow-[0_0_14px_rgba(0,255,255,0.25)]"
                                : "text-zinc-300 hover:text-cyan-300 hover:bg-cyan-400/5"
                            }`}>
                                <div className="min-w-11 w-11 h-12 flex items-center justify-center">
                                    <Icon className={`w-5 h-5 transition-colors duration-400 
                                        ${isActive ? "text-cyan-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]" : "text-zinc-300 group-hover/item:text-cyan-300"}`}/>
                                </div>

                                <span className={`whitespace-nowrap text-lg overflow-hidden transition-all duration-400
                                    ${isOpen ? "opacity-100 max-w-[150px] translate-x-0" : "opacity-0 max-w-0 -translate-x-2"}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="mt-auto mb-3 h-px w-full bg-cyan-400/10 shadow-[0_0_12px_rgba(0,255,255,0.12)]"/>
                <div className={`h-14 rounded-xl flex items-center
                    ${isOpen
                        ? "border border-cyan-400/10 bg-cyan-400/[0.03]"
                        : "border border-transparent bg-transparent"
                    }`}
                >
                    <div className="w-14 h-16 flex items-center justify-center">
                        <div className="h-11 w-11 rounded-full border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xl shadow-[0_0_14px_rgba(0,255,255,0.18)]">
                            D
                        </div>
                    </div>

                    <div className={`min-w-0 overflow-hidden transition-all duration-400 
                        ${isOpen ? "opacity-100 max-w-[130px] translate-x-0" : "opacity-0 max-w-0 -translate-x-2"}`}>
                        <p className="truncate text-sm text-white">DarkKnife</p>
                        <p className="truncate text-[10px] text-zinc-400">
                            serserpar801014@gmail.com
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
}