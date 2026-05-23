import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

export default function Layout() {
    return (
        <div className="flex min-h-screen bg-[#02070d]">
            <Sidebar />

            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
}