import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import DashboardIcon from "../icons/dashboard.svg?react";
import TaskIcon from "../icons/task.svg?react";
import NotesIcon from "../icons/note.svg?react";
import AnalyticsIcon from "../icons/analytics.svg?react";
import CalendarIcon from "../icons/calendar.svg?react";
import SettingIcon from "../icons/settings.svg?react";
import HobbyIcon from "../icons/hobby.svg?react";
import HealthIcon from "../icons/health.svg?react";
import WalletIcon from "../icons/wallet.svg?react";
import MenuIcon from "../icons/menu.svg?react";

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

    const [isHoverOpen, setIsHoverOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const isOpen = isHoverOpen || isMobileOpen;

    const closeMobileSidebar = () => {
        setIsMobileOpen(false);
    };

    return (
        <>
            {!isMobileOpen && (
                <button onClick={() => setIsMobileOpen(true)} className="fixed left-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl
                    border border-cyan-400/30 bg-[#020914]/90 text-cyan-300 shadow-[0_0_16px_rgba(0,255,255,0.18)] backdrop-blur-xl md:hidden">
                <MenuIcon className="w-7 h-7"/>
                </button>
            )}
            {isMobileOpen && (
                <div onClick={() => setIsMobileOpen(false)} className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"/>
            )}

            <aside onMouseEnter={() => setIsHoverOpen(true)} onMouseLeave={() => setIsHoverOpen(false)} className={`
                    fixed left-0 top-0 z-60 h-dvh shrink-0 overflow-hidden bg-[#020914]/95 text-white backdrop-blur-xl
                    border-r border-cyan-400/10 font-[Orbitron] transition-all duration-400 ${isMobileOpen ? "translate-x-0 w-[240px]" : "-translate-x-full w-[240px]"} 
                    md:sticky md:translate-x-0 ${isHoverOpen ? "md:w-[220px]" : "md:w-[70px]"}`}>
                <div className="absolute inset-0 pointer-events-none shadow-[0_0_40px_rgba(0,255,255,0.08)]" />
                <div className="relative flex h-full flex-col overflow-y-auto px-3 py-3 md:py-4">
                    <Link to="/dashboard" onClick={closeMobileSidebar} className="mb-5 md:mb-7 h-11 shrink-0 flex items-center rounded-xl text-cyan-400 w-min overflow-hidden">
                        <div className={`h-10 rounded-xl border border-cyan-400/30 bg-cyan-400/5 flex items-center overflow-hidden shadow-[0_0_14px_rgba(0,255,255,0.18)]
                                transition-[width] duration-400 ${isOpen ? "w-[100px]" : "w-10"}`}>
                            <span className="pl-3 h-10 flex items-center justify-center text-xl font-bold leading-none [text-shadow:0_0_10px_rgba(0,255,255,0.8)]">
                                L
                            </span>
                            <span className={`text-xl font-bold [text-shadow:0_0_10px_rgba(0,255,255,0.8)] transition-all duration-400
                                    ${isOpen ? "opacity-100 max-w-[80px] translate-x-0" : "opacity-0 max-w-0 -translate-x-2"}`}>
                                ifeOS
                            </span>
                        </div>
                    </Link>

                    <div className="mb-4 h-px shrink-0 w-full bg-cyan-400/10 shadow-[0_0_12px_rgba(0,255,255,0.12)]"/>

                    <nav className="flex flex-col gap-2 md:gap-3">
                        {menu.map((item) => {
                            const isActive = location.pathname === item.path;
                            const Icon = item.Icon;

                            return (
                                <Link key={item.path} to={item.path} onClick={closeMobileSidebar}
                                      className={`group/item flex h-11 md:h-12 items-center rounded-xl px-0 overflow-hidden transition-colors duration-400
                                        ${isActive
                                          ? "bg-cyan-400/10 text-cyan-300 border border-cyan-400/40 shadow-[0_0_14px_rgba(0,255,255,0.25)]"
                                          : "text-zinc-300 hover:text-cyan-300 hover:bg-cyan-400/5"
                                      }`}>
                                    <div className="min-w-11 w-11 h-11 md:h-12 flex items-center justify-center">
                                        <Icon className={`w-5 h-5 transition-colors duration-400 
                                            ${isActive
                                            ? "text-cyan-300 drop-shadow-[0_0_6px_rgba(0,255,255,0.8)]"
                                            : "text-zinc-300 group-hover/item:text-cyan-300"
                                        }`}/>
                                    </div>

                                    <span className={`whitespace-nowrap text-lg overflow-hidden transition-all duration-400 
                                        ${isOpen ? "opacity-100 max-w-[150px] translate-x-0" : "opacity-0 max-w-0 -translate-x-2"}`}>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    <div
                        className="mt-auto mb-3 h-px shrink-0 w-full bg-cyan-400/10 shadow-[0_0_12px_rgba(0,255,255,0.12)]"/>

                    <div
                        className={`h-14 rounded-xl flex items-center ${isOpen ? "border border-cyan-400/10 bg-cyan-400/[0.03]" : "border border-transparent bg-transparent"}`}>
                        <div className="w-14 h-16 flex items-center justify-center">
                            <div
                                className="h-11 w-11 rounded-full border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xl shadow-[0_0_14px_rgba(0,255,255,0.18)]">
                                D
                            </div>
                        </div>

                        <div
                            className={`min-w-0 overflow-hidden transition-all duration-400 ${isOpen ? "opacity-100 max-w-[150px] translate-x-0" : "opacity-0 max-w-0 -translate-x-2"}`}>
                            <p className="truncate text-sm text-white">DarkKnife</p>
                            <p className="truncate text-[10px] text-zinc-400">
                                serserpar801014@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}