import { createBrowserRouter, Outlet } from "react-router-dom";
import ToastProvider from "./providers/ToastProvider";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";

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
            { path: "/", element: <Login /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);