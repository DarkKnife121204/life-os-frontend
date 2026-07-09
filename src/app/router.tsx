import { createBrowserRouter, Outlet } from "react-router-dom";

import ToastProvider from "./providers/ToastProvider";
import Layout from "./Layout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Task from "../pages/Task";
import Note from "../pages/Note";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import Habit from "../pages/Habit";
import Health from "../pages/Health";
import Finance from "../pages/Finance";
import CalendarPage from "../pages/calendar/CalendarPage.tsx";
import AuthGuard from "./AuthGuard.tsx";

function RootLayout() {
    return (
        <ToastProvider>
            <Outlet />
        </ToastProvider>
    );
}

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                element: <AuthGuard />,
                children: [
                    {
                        element: <Layout />,
                        children: [
                            { path: "/dashboard", element: <Dashboard /> },
                            { path: "/tasks", element: <Task /> },
                            { path: "/notes", element: <Note /> },
                            { path: "/analytics", element: <Analytics /> },
                            { path: "/settings", element: <Settings /> },
                            { path: "/habits", element: <Habit /> },
                            { path: "/health", element: <Health /> },
                            { path: "/finance", element: <Finance /> },
                            { path: "/calendar", element: <CalendarPage /> },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);