import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { getMe } from "../api/auth.ts";
import { useUserStore } from "../store/userStore.ts";

export default function AuthGuard() {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const clearUser = useUserStore((state) => state.clearUser);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            try {
                const user = await getMe();

                setUser(user);
            } catch {
                clearUser();
            } finally {
                setIsLoading(false);
            }
        }

        loadUser();
    }, [setUser, clearUser]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#02070d] text-cyan-300">
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}