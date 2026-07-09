import { useState } from "react";

import NotificationIcon from "../icons/notification.svg?react";
import PrevIcon from "../icons/prev.svg?react";
import ProfileMenu from "./ProfileMenu";
import { useUserStore } from "@/store/userStore.ts";

type HeaderProps = {
    title: string;
};

export default function Header({ title }: HeaderProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const user = useUserStore((state) => state.user);
    const initial = user?.name.charAt(0).toUpperCase();

    return (
        <div className="relative mb-4 flex items-center justify-between gap-3 pl-14 md:pl-0">
            <h1 className="min-w-0 truncate text-2xl tracking-wide md:text-3xl">{title}</h1>

            <div className="flex shrink-0 items-center gap-3 md:gap-5">
                <button className="text-zinc-300 cursor-pointer hover:text-cyan-300 transition">
                    <NotificationIcon className="h-5 w-5 md:h-6 md:w-6" />
                </button>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen((prev) => !prev)}
                        className="flex items-center gap-2 md:gap-3 cursor-pointer"
                    >
                        <div className="flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full border border-cyan-400/60 text-cyan-300 text-lg md:text-xl shadow-[0_0_14px_rgba(0,255,255,0.18)]">
                            {initial}
                        </div>

                        <div className="hidden sm:flex items-center text-zinc-200 hover:text-cyan-300 transition">
                            {user?.name}

                            <PrevIcon
                                className={`h-6 w-6 transition-transform duration-300 ${
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
