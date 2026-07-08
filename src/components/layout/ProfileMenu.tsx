import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../../lib/token.ts";

import NotificationIcon from "../icons/notification.svg?react";
import SettingIcon from "../icons/settings.svg?react";
import LogoutIcon from "../icons/logout.svg?react";
import ProfileIcon from "../icons/profile.svg?react";

export default function ProfileMenu() {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate("/");
    };

    return (
        <div className="absolute right-0 top-14 z-50 w-[calc(100vw-2rem)] max-w-[320px] rounded-xl border border-purple-500/70 bg-[#020b12]/95 backdrop-blur-xl
            shadow-[0_0_30px_rgba(168,85,247,0.35)] p-4 md:p-5">
            <div className="flex items-center gap-4 mb-5">
                <div className="h-10 w-10 shrink-0 rounded-full border border-cyan-400 flex items-center justify-center text-cyan-300 text-xl
                    shadow-[0_0_20px_rgba(0,255,255,0.25)]">
                    D
                </div>

                <div className="min-w-0">
                    <p className="text-xl font-[Orbitron] text-white">
                        DarkKnife
                    </p>

                    <p className="text-sm text-zinc-400 truncate">
                        serserpar801014@gmail.com
                    </p>
                </div>
            </div>

            <div className="space-y-2 text-lg">
                <div className="my-4 h-px bg-cyan-400/20"/>

                <Link
                    to="/profile"
                    className="flex items-center gap-4 h-12 px-4 rounded-lg text-white hover:bg-cyan-400/[0.06] hover:text-cyan-300 transition"
                >
                    <ProfileIcon className="w-5 h-5 text-cyan-300"/>
                    <span>Profile</span>
                </Link>

                <Link
                    to="/settings"
                    className="flex items-center gap-4 h-12 px-4 rounded-lg text-white hover:bg-cyan-400/[0.06] hover:text-cyan-300 transition"
                >
                    <SettingIcon className="w-5 h-5 text-cyan-300"/>
                    <span>Settings</span>
                </Link>

                <Link
                    to="/notifications"
                    className="flex items-center gap-4 h-12 px-4 rounded-lg text-white hover:bg-cyan-400/[0.06] hover:text-cyan-300 transition"
                >
                    <NotificationIcon className="w-5 h-5 text-cyan-300"/>
                    <span>Notifications</span>
                </Link>
            </div>

            <div className="my-4 h-px bg-cyan-400/20"/>

            <button
                onClick={handleLogout}
                className="flex items-center gap-4 h-12 w-full px-4 rounded-lg text-pink-500 hover:bg-pink-500/10 transition cursor-pointer"
            >
                <LogoutIcon className="w-5 h-5"/>
                <span>Logout</span>
            </button>
        </div>
    );
}