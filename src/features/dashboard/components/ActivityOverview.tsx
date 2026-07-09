import { useState } from "react";

import Card from "@/components/ui/Card";
import ActivityChart from "./ActivityChart";
import { activityData } from "../data/dashboard.mock";

import PrevIcon from "@/components/icons/prev.svg?react";

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
        <Card className="min-h-[280px] p-4 md:p-5 xl:p-6 xl:col-span-2">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-xl leading-tight">
                    Activity Overview
                </h2>

                <div className="relative w-full sm:w-auto">
                    <button onClick={() => setIsPeriodOpen((prev) => !prev)}
                        className={`h-10 w-full sm:w-auto flex cursor-pointer px-4 items-center justify-between sm:justify-center gap-2 rounded-lg border bg-slate-950/40 text-sm transition
                            ${isPeriodOpen
                                ? "border-cyan-400/60 text-cyan-300 shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                                : "border-slate-600/60 text-zinc-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                        }`}>
                        {period}

                        <PrevIcon className={`h-6 w-6 transition-transform duration-300 ${isPeriodOpen ? "rotate-90" : "-rotate-90"}`}/>
                    </button>

                    {isPeriodOpen && (
                        <div className="absolute right-0 top-12 z-50 w-full sm:w-40 rounded-xl border border-cyan-400/30 bg-[#06121a]/95
                                p-2 space-y-1 shadow-[0_0_24px_rgba(0,255,255,0.16)] backdrop-blur-xl">
                            {periods.map((item) => (
                                <button key={item} onClick={() => {
                                        setPeriod(item);
                                        setIsPeriodOpen(false);
                                    }}
                                    className={`w-full h-8 flex items-center justify-between rounded-lg px-4 text-sm transition cursor-pointer
                                        ${period === item
                                            ? "bg-cyan-400/10 text-cyan-300"
                                            : "text-zinc-300 hover:bg-cyan-400/5 hover:text-cyan-300"
                                    }`}>
                                    <span>{item}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ActivityChart data={activityData}/>
        </Card>
    );
}