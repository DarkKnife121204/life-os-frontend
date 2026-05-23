import Card from "../../../components/ui/Card";
import { todayTasks } from "../data/dashboard.mock";

import MarkIcon from "../../../components/icons/mark.svg?react";
import ArrowIcon from "../../../components/icons/arrow.svg?react";

export default function TodayTasks() {
    return (
        <Card className="h-[300px] p-8">
            <h2 className="text-xl font-[Orbitron] mb-5">
                Today Tasks
            </h2>

            <div className="space-y-1">
                {todayTasks.map((task) => (
                    <div
                        key={task.title}
                        className="h-10 flex items-center justify-between border-b border-cyan-400/5"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className={`h-6 w-6 rounded-full border flex items-center justify-center text-xs
                                    ${
                                    task.done
                                        ? "bg-cyan-400 border-cyan-400 text-slate-950"
                                        : "border-slate-500 text-transparent"
                                }`}
                            >
                                <MarkIcon className="w-4 h-4" />
                            </span>

                            <span className="text-zinc-200">
                                {task.title}
                            </span>
                        </div>

                        <span className="text-zinc-400">
                            {task.time}
                        </span>
                    </div>
                ))}
            </div>

            <button className="mx-auto mt-3 flex items-center gap-3 text-cyan-300 hover:text-cyan-200 transition">
                View All Tasks
                <ArrowIcon className="w-6 h-6 rotate-180" />
            </button>
        </Card>
    );
}