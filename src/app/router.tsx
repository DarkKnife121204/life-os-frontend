import { createBrowserRouter } from "react-router-dom";
import Layout from './layout';

const Page = (text: string) => <div>{text}</div>;

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout><div>Dashboard</div></Layout>,
},
{
    path: "/tasks",
        element: <Layout>{Page("Задачи")}</Layout>,
},
{
    path: "/planning",
        element: <Layout>{Page("План дня")}</Layout>,
},
{
    path: "/habits",
        element: <Layout>{Page("Привычки")}</Layout>,
},
]);