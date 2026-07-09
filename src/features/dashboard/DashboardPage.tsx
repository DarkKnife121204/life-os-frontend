import Header from "../../components/layout/Header";

import StatsGrid from "./components/StatsGrid";
import ActivityOverview from "./components/ActivityOverview";
import TaskCompletion from "./components/TaskCompletion";
import TaskSummaryCards from "./components/TaskSummaryCards";
import TodayTasks from "./components/TodayTasks";
import UpcomingList from "./components/UpcomingList";
import QuickAdd from "./components/QuickAdd";

export default function DashboardPage() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden px-4 py-[9px] md:px-5 xl:px-6 text-white font-[Orbitron]">
            <Header title="Dashboard" />

            <StatsGrid />

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-3 mb-3">
                <ActivityOverview />
                <TaskCompletion />
            </section>

            <TaskSummaryCards />

            <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                <TodayTasks />
                <UpcomingList />
                <QuickAdd />
            </section>
        </main>
    );
}
