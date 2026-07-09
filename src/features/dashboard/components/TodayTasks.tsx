import Card from "@/components/ui/Card";
import { todayTasks } from "../data/dashboard.mock";

import MarkIcon from "@/components/icons/mark.svg?react";
import ArrowIcon from "@/components/icons/arrow.svg?react";

export default function TodayTasks() {
    return (
        <Card className="min-h-[260px] p-4 md:p-5 xl:p-6">
            <h2 className="mb-5 text-xl leading-tight">
                Today Tasks
            </h2>

            <div className="space-y-1">
                {todayTasks.map((task) => (
                    <div key={task.title} className="flex min-h-10 items-center justify-between gap-3 border-b border-cyan-400/5 py-2">
                        <div className="flex min-w-0 items-center gap-2">
                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs
                                    ${task.done ? "bg-cyan-400 border-cyan-400 text-slate-950" : "border-slate-500 text-transparent"}`}>
                                <MarkIcon className="h-4 w-4" />
                            </span>

                            <span className="truncate text-sm md:text-base text-zinc-200">
                                {task.title}
                            </span>
                        </div>

                        <span className="shrink-0 text-xs md:text-base text-zinc-400">
                            {task.time}
                        </span>
                    </div>
                ))}
            </div>

            <button className="mx-auto mt-4 flex cursor-pointer items-center gap-3 text-sm md:text-base text-cyan-300 hover:text-cyan-200 transition">
                View All Tasks
                <ArrowIcon className="h-5 w-5 md:h-6 md:w-6 rotate-180" />
            </button>
        </Card>
    );
}