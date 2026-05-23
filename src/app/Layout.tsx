import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function Layout() {
    return (
        <div className="flex min-h-screen bg-[#02070d]">
            <Sidebar />

            <main className="min-w-0 flex-1">
                <Outlet />
            </main>
        </div>
    );
}