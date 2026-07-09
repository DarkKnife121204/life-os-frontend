import Card from "@/components/ui/Card";
import { upcoming } from "../data/dashboard.mock";

import ArrowIcon from "@/components/icons/arrow.svg?react";

export default function UpcomingList() {
    return (
        <Card className="min-h-[260px] p-4 md:p-5 xl:p-6">
            <h2 className="mb-5 text-xl leading-tight">Upcoming</h2>

            <div className="space-y-1">
                {upcoming.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="flex min-h-14 items-center justify-between gap-3 border-b border-cyan-400/5 py-2"
                        >
                            <div className="flex min-w-0 items-center gap-3 md:gap-4">
                                <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                                    <Icon className={`h-5 w-5 md:h-6 md:w-6 ${item.color}`} />
                                </div>

                                <div className="min-w-0">
                                    <div className="truncate text-sm md:text-base text-zinc-100">{item.title}</div>

                                    <div className="truncate text-xs md:text-sm text-zinc-400">{item.date}</div>
                                </div>
                            </div>

                            <span className="shrink-0 rounded-xl bg-fuchsia-500/10 px-3 py-1 text-xs md:px-4 md:text-sm text-fuchsia-300">
                                {item.tag}
                            </span>
                        </div>
                    );
                })}
            </div>

            <button className="mx-auto mt-4 flex cursor-pointer items-center gap-3 text-sm md:text-base text-cyan-300 hover:text-cyan-200 transition">
                View Calendar
                <ArrowIcon className="h-5 w-5 md:h-6 md:w-6 rotate-180" />
            </button>
        </Card>
    );
}
