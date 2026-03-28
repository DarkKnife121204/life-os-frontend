import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import DashboardIcon from './icons/dashboard.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import TaskIcon from './icons/task.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import NotesIcon from './icons/note.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import AnalyticsIcon from './icons/analytics.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CalendarIcon from './icons/calendar.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SettingIcon from './icons/settings.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import HobbyIcon from './icons/hobby.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import MoodIcon from './icons/mood.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SleepIcon from './icons/sleep.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import HealthIcon from './icons/health.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import WalletIcon from './icons/wallet.svg?react';

const menu = [
    { path: "/dashboard", label: "Dashboard", Icon: DashboardIcon  },
    { path: "/calendar", label: "Calendar", Icon: CalendarIcon },
    { path: "/tasks", label: "Tasks", Icon: TaskIcon },
    { path: "/finance", label: "Finance", Icon: WalletIcon },
    { path: "/notes", label: "Notes", Icon: NotesIcon },
    { path: "/habits", label: "Habits", Icon: HobbyIcon },
    { path: "/health", label: "Health", Icon: HealthIcon },
    { path: "/dream", label: "Dream", Icon: SleepIcon },
    { path: "/mood", label: "Mood", Icon: MoodIcon },
    { path: "/analytics", label: "Analytics", Icon: AnalyticsIcon },
    { path: "/settings", label: "Settings", Icon: SettingIcon },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className="fixed top-0 left-0 h-screen w-54 z-50 group font-[Orbitron]">

            <div className="absolute right-0 top-0 h-full w-5 translate-x-full" />

            <div className="h-full p-5 bg-black/70 backdrop-blur-xl border-r border-cyan-500/20 text-cyan-100 relative
                    transform transition-transform duration-300 -translate-x-full group-hover:translate-x-0"
            >
                <div className="absolute inset-0 pointer-events-none [box-shadow:0_0_40px_rgba(0,255,255,0.05)]"/>

                <h1 className="text-3xl pl-4 mb-8 text-cyan-400 [text-shadow:0_0_8px_rgba(0,255,255,0.7)]">
                    <Link to="/dashboard">LifeOS</Link>
                </h1>

                <nav className="flex flex-col gap-2">
                    {menu.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.Icon;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-2 rounded-xl
                                ${
                                    isActive
                                        ? "bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 [box-shadow:0_0_10px_rgba(0,255,255,0.3)]"
                                        : "hover:bg-cyan-500/5 hover:text-cyan-300"
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}