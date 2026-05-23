import { useState } from "react";

import NotificationIcon from "../icons/notification.svg?react";
import PrevIcon from "../icons/prev.svg?react";
import ProfileMenu from "./ProfileMenu";

type HeaderProps = {
    title: string;
};

export default function Header({ title }: HeaderProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className="mb-4 flex items-center justify-between relative">
            <h1 className="text-3xl font-[Orbitron] tracking-wide">
                {title}
            </h1>

            <div className="flex items-center gap-5">
                <button className="text-2xl text-zinc-300 cursor-pointer hover:text-cyan-300 transition">
                    <NotificationIcon className="w-6 h-6" />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen((prev) => !prev)}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <div className="h-11 w-11 rounded-full border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xl shadow-[0_0_14px_rgba(0,255,255,0.18)]">
                            D
                        </div>

                        <div className="flex items-center text-zinc-200 hover:text-cyan-300 transition">
                            DarkKnife

                            <PrevIcon
                                className={`w-6 h-6 transition-transform duration-300 ${
                                    isProfileOpen ? "rotate-90" : "-rotate-90"
                                }`}
                            />
                        </div>
                    </button>

                    {isProfileOpen && <ProfileMenu />}
                </div>
            </div>
        </div>
    );
}