import Card from "../../../components/ui/Card";
import { upcoming } from "../data/dashboard.mock";

import ArrowIcon from "../../../components/icons/arrow.svg?react";

export default function UpcomingList() {
    return (
        <Card className="h-[300px] p-8">
            <h2 className="text-xl font-[Orbitron] mb-5">
                Upcoming
            </h2>

            <div className="space-y-1">
                {upcoming.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="h-14 flex items-center justify-between border-b border-cyan-400/5"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-2xl">
                                    <Icon className={`w-6 h-6 ${item.color}`} />
                                </div>

                                <div>
                                    <div className="text-zinc-100">
                                        {item.title}
                                    </div>

                                    <div className="text-sm text-zinc-400">
                                        {item.date}
                                    </div>
                                </div>
                            </div>

                            <span className="px-4 py-1 rounded-xl bg-fuchsia-500/10 text-fuchsia-300 text-sm">
                                {item.tag}
                            </span>
                        </div>
                    );
                })}
            </div>

            <button className="mx-auto mt-3 flex items-center gap-3 text-cyan-300 hover:text-cyan-200 transition">
                View Calendar
                <ArrowIcon className="w-6 h-6 rotate-180" />
            </button>
        </Card>
    );
}