import { createBrowserRouter, Outlet, useLocation } from "react-router-dom";
import ToastProvider from "./providers/ToastProvider";
import Sidebar from "../components/Sidebar";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Task from "../pages/Task";
import Note from "../pages/Note";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import Habit from "../pages/Habit";
import Mood from "../pages/Mood";
import Dream from "../pages/Dream";
import Health from "../pages/Health";
import Finance from "../pages/Finance";
import Calendar from "../pages/Calendar.tsx";

function RootLayout() {
    const location = useLocation();
    const isAuthPage = location.pathname === "/";

    return (
        <ToastProvider>
            {isAuthPage ? (
                <Outlet />
            ) : (
                <div className="
                    flex min-h-screen
                    bg-gradient-to-bl from-backDark via-neutral-950 to-backDeep
                ">
                    <Sidebar />
                    <div className="flex-1">
                        <Outlet />
                    </div>
                </div>
            )}
        </ToastProvider>
    );
}

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: "/", element: <Login /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/tasks", element: <Task /> },
            { path: "/notes", element: <Note /> },
            { path: "/analytics", element: <Analytics /> },
            { path: "/settings", element: <Settings /> },
            { path: "/habits", element: <Habit /> },
            { path: "/mood", element: <Mood /> },
            { path: "/dream", element: <Dream /> },
            { path: "/health", element: <Health /> },
            { path: "/finance", element: <Finance /> },
            { path: "/calendar", element: <Calendar /> },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);