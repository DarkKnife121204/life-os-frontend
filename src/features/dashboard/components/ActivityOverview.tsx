import { useState } from "react";

import Card from "../../../components/ui/Card";
import ActivityChart from "./ActivityChart";
import { activityData } from "../data/dashboard.mock";

import PrevIcon from "../../../components/icons/prev.svg?react";
import MarkIcon from "../../../components/icons/mark.svg?react";

const periods = [
    "This Week",
    "This Month",
    "This Quarter",
    "This Year",
    "All Time",
];

export default function ActivityOverview() {
    const [isPeriodOpen, setIsPeriodOpen] = useState(false);
    const [period, setPeriod] = useState("This Week");

    return (
        <Card className="h-[310px] p-8 col-span-2">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-[Orbitron]">Activity Overview</h2>

                <div className="relative">
                    <button
                        onClick={() => setIsPeriodOpen((prev) => !prev)}
                        className={`h-10 flex cursor-pointer px-4 items-center gap-2 rounded-lg border bg-slate-950/40 text-sm transition
                            ${
                            isPeriodOpen
                                ? "border-cyan-400/60 text-cyan-300 shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                                : "border-slate-600/60 text-zinc-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                        }`}
                    >
                        {period}

                        <PrevIcon
                            className={`w-6 h-6 transition-transform duration-300 ${
                                isPeriodOpen ? "rotate-90" : "-rotate-90"
                            }`}
                        />
                    </button>

                    {isPeriodOpen && (
                        <div className="absolute right-0 w-44 top-12 z-50 rounded-xl border border-cyan-400/30 bg-[#06121a]/95 p-2 space-y-1 shadow-[0_0_24px_rgba(0,255,255,0.16)] backdrop-blur-xl">
                            {periods.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setPeriod(item);
                                        setIsPeriodOpen(false);
                                    }}
                                    className={`w-full h-8 flex items-center justify-between rounded-lg p-4 text-sm transition cursor-pointer
                                        ${
                                        period === item
                                            ? "bg-cyan-400/10 text-cyan-300"
                                            : "text-zinc-300 hover:bg-cyan-400/5 hover:text-cyan-300"
                                    }`}
                                >
                                    <span>{item}</span>

                                    {period === item && (
                                        <MarkIcon className="w-5 h-5" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ActivityChart data={activityData} />
        </Card>
    );
}