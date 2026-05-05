const stats = [
    { icon: "☑", value: "12", label: "Tasks Today", color: "text-cyan-300" },
    { icon: "▣", value: "3", label: "Events", color: "text-fuchsia-400" },
    { icon: "▤", value: "7", label: "Notes", color: "text-cyan-300" },
    { icon: "↗", value: "85%", label: "Productivity", color: "text-cyan-300" },
    { icon: "◷", value: "24h 36m", label: "Focus Time", color: "text-fuchsia-400" },
    { icon: "▱", value: "92%", label: "Score", color: "text-cyan-300" },
];

const todayTasks = [
    { title: "Finish UI", time: "2h", done: true },
    { title: "Standup", time: "30m", done: true },
    { title: "Analytics", time: "1h", done: true },
    { title: "Design meeting", time: "1h 30m", done: false },
];

const upcoming = [
    { icon: "▣", title: "Product Review", date: "15 May, 14:00", tag: "Meeting", color: "text-fuchsia-400" },
    { icon: "▣", title: "Design Meeting", date: "16 May, 11:00", tag: "Meeting", color: "text-cyan-400" },
    { icon: "✦", title: "Deploy v2.1", date: "20 May, 09:00", tag: "Important", color: "text-cyan-300" },
];
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`rounded-xl border border-cyan-400/10 bg-black/20 shadow-[0_0_18px_rgba(0,255,255,0.04)] ${className}`}>
            {children}
        </div>
    );
}
export default function Dashboard() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden px-8 py-5 text-white font-[Orbitron]">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-3xl font-semibold tracking-wide">Dashboard</h1>

                <div className="flex items-center gap-5">
                    <button className="text-2xl text-zinc-300 hover:text-cyan-300 transition">
                        ♧
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-full border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xl shadow-[0_0_14px_rgba(0,255,255,0.18)]">
                            D
                        </div>
                        <button className="flex items-center text-zinc-200">
                            DarkKnife
                            <span className="text-zinc-400">⌄</span>
                        </button>
                    </div>
                </div>
            </div>

            <section className="grid grid-cols-6 gap-5 mb-2">
                {stats.map((item) => (
                    <Card key={item.label} className="h-22 px-7 flex items-center gap-5">
                        <div className={`text-4xl ${item.color} drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]`}>
                            {item.icon}
                        </div>

                        <div>
                            <div className="text-2xl font-bold leading-none">{item.value}</div>
                            <div className="mt-2 text-sm text-zinc-400">{item.label}</div>
                        </div>
                    </Card>
                ))}
            </section>

            <section className="grid grid-cols-[2fr_1.12fr] gap-5 mb-2">
                <Card className="h-[310px] p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold">Activity Overview</h2>

                        <button className="h-10 px-4 rounded-lg border border-slate-600/60 bg-slate-950/40 text-sm text-zinc-300">
                            This Week ⌄
                        </button>
                    </div>

                    <div className="relative h-[210px]">
                        <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-zinc-400 text-sm">
                            <span>100%</span>
                            <span>75%</span>
                            <span>50%</span>
                            <span>25%</span>
                            <span>0%</span>
                        </div>

                        <svg className="absolute left-16 right-0 top-0 h-[185px] w-[calc(100%-4rem)] overflow-visible" viewBox="0 0 900 190">
                            <defs>
                                <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#00ffff" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#00ffff" stopOpacity="0" />
                                </linearGradient>
                            </defs>

                            <path
                                d="M0,135 C85,105 115,120 170,125 C250,130 285,65 360,85 C425,105 465,70 535,105 C610,140 655,0 720,15 C790,35 805,100 900,75 L900,190 L0,190 Z"
                                fill="url(#lineFill)"
                            />

                            <path
                                d="M0,135 C85,105 115,120 170,125 C250,130 285,65 360,85 C425,105 465,70 535,105 C610,140 655,0 720,15 C790,35 805,100 900,75"
                                fill="none"
                                stroke="#00dfff"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />

                            <line x1="625" y1="15" x2="625" y2="190" stroke="#00dfff" strokeOpacity="0.25" strokeDasharray="5 5" />
                            <rect x="615" y="5" width="20" height="20" rx="3" fill="#00dfff" />
                        </svg>

                        <div className="absolute left-16 right-0 bottom-0 flex justify-between text-zinc-400 text-sm">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                        </div>
                    </div>
                </Card>

                <Card className="h-[310px] p-8">
                    <h2 className="text-xl font-semibold mb-2">Task Completion</h2>

                    <div className="flex items-center justify-between">
                        <div className="relative h-48 w-48 rounded-full bg-[conic-gradient(#00dfff_0_42%,#0b7cff_42%_82%,#7c3aed_82%_92%,#09243a_92%_100%)] flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.12)]">
                            <div className="h-32 w-32 rounded-full bg-[#020914] flex flex-col items-center justify-center">
                                <div className="text-4xl font-bold">76%</div>
                                <div className="mt-2 text-cyan-300">+13%</div>
                            </div>
                        </div>

                        <div className="space-y-6 min-w-56">
                            <Legend color="bg-cyan-400" label="Completed" value="19" />
                            <Legend color="bg-blue-500" label="In Progress" value="6" />
                            <Legend color="bg-violet-500" label="Pending" value="5" />
                        </div>
                    </div>
                </Card>
            </section>

            <section className="grid grid-cols-3 gap-5 mb-2">
                <SmallChart title="Tasks Completed" value="19" percent="+11%" color="cyan" />
                <SmallChart title="Tasks In Progress" value="6" percent="-2%" color="orange" negative />
                <SmallChart title="Tasks Pending" value="5" percent="-5%" color="pink" negative />
            </section>

            <section className="grid grid-cols-3 gap-5">
                <Card className="h-[300px] p-8">
                    <h2 className="text-xl font-semibold mb-5">Today Tasks</h2>

                    <div className="space-y-1">
                        {todayTasks.map((task) => (
                            <div key={task.title} className="h-11 flex items-center justify-between border-b border-cyan-400/5">
                                <div className="flex items-center gap-4">
                                    <span
                                        className={`
                                            h-6 w-6 rounded-full border flex items-center justify-center text-xs
                                            ${task.done
                                            ? "bg-cyan-400 border-cyan-400 text-slate-950"
                                            : "border-slate-500 text-transparent"
                                        }
                                        `}
                                    >
                                        ✓
                                    </span>

                                    <span className="text-zinc-200">{task.title}</span>
                                </div>

                                <span className="text-zinc-400">{task.time}</span>
                            </div>
                        ))}
                    </div>

                    <button className="mx-auto flex items-center gap-3 text-cyan-300 hover:text-cyan-200 transition">
                        View All Tasks <span className="text-2xl">→</span>
                    </button>
                </Card>

                <Card className="h-[300px] p-8">
                    <h2 className="text-xl font-semibold mb-5">Upcoming</h2>

                    <div className="space-y-3">
                        {upcoming.map((item) => (
                            <div key={item.title} className="h-16 flex items-center justify-between border-b border-cyan-400/5">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-2xl">
                                        <span className={item.color}>{item.icon}</span>
                                    </div>

                                    <div>
                                        <div className="text-zinc-100">{item.title}</div>
                                        <div className="text-sm text-zinc-400">{item.date}</div>
                                    </div>
                                </div>

                                <span className="px-4 py-1 rounded-xl bg-fuchsia-500/10 text-fuchsia-300 text-sm">
                                    {item.tag}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button className="mx-auto flex items-center gap-3 text-cyan-300 hover:text-cyan-200 transition">
                        View Calendar <span className="text-2xl">→</span>
                    </button>
                </Card>

                <Card className="h-[300px] p-8">
                    <h2 className="text-xl font-semibold mb-7">Quick Add</h2>

                    <div className="grid grid-cols-4 gap-5">
                        <QuickButton icon="☑" label="New Task" />
                        <QuickButton icon="▣" label="New Event" purple />
                        <QuickButton icon="▤" label="New Note" />
                        <QuickButton icon="☁" label="Upload" />
                    </div>

                    <button className="h-14 w-full rounded-xl bg-cyan-400 text-slate-950 font-semibold flex items-center justify-center gap-4 hover:bg-cyan-300 transition">
                        <span className="text-2xl">＋</span>
                        Quick Add
                    </button>
                </Card>
            </section>
        </main>
    );
}
function Legend({ color, label, value }: { color: string; label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-3">
                <span className={`h-4 w-4 rounded-full ${color}`} />
                <span className="text-zinc-300">{label}</span>
            </div>

            <span className="text-zinc-300">{value}</span>
        </div>
    );
}
function SmallChart({
                        title,
                        value,
                        percent,
                        color,
                        negative = false,
                    }: {
    title: string;
    value: string;
    percent: string;
    color: "cyan" | "orange" | "pink";
    negative?: boolean;
}) {
    const stroke =
        color === "cyan" ? "#00dfff" : color === "orange" ? "#f97316" : "#ec4899";

    return (
        <Card className="h-40 p-8">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>

            <div className="flex items-end justify-between">
                <div>
                    <div className="text-4xl font-bold">{value}</div>
                    <div className={`mt-2 text-lg ${negative ? "text-pink-500" : "text-cyan-300"}`}>
                        {percent}
                    </div>
                </div>

                <svg className="w-72 h-16" viewBox="0 0 260 60">
                    <path
                        d="M5,38 C25,25 30,48 50,31 C70,18 76,42 98,25 C120,10 122,40 142,26 C160,12 168,36 190,18 C210,5 220,40 255,22"
                        fill="none"
                        stroke={stroke}
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </Card>
    );
}
function QuickButton({
                         icon,
                         label,
                         purple = false,
                     }: {
    icon: string;
    label: string;
    purple?: boolean;
}) {
    return (
        <button className="h-32 rounded-xl border border-cyan-400/10 bg-slate-950/30 flex flex-col items-center justify-center gap-4 hover:border-cyan-400/40 transition">
            <span className={`text-5xl ${purple ? "text-fuchsia-400" : "text-cyan-300"}`}>
                {icon}
            </span>
            <span className="text-sm text-zinc-200 whitespace-nowrap">{label}</span>
        </button>
    );
}