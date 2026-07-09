import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

export default function Layout() {
    const location = useLocation();

    const title = location.pathname === "/calendar" ? "Calendar" : null;

    return (
        <div className="flex min-h-screen bg-[#02070d]">
            <Sidebar />

            <main className="min-w-0 flex-1 overflow-x-hidden px-4 py-[9px] md:px-5 xl:px-6 text-white font-[Orbitron]">
                {title && <Header title={title} />}

                <Outlet />
            </main>
        </div>
    );
}
