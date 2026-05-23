import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import NotificationIcon from "../components/icons/notification.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import PrevIcon from "../components/icons/prev.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CheckIcon from "../components/icons/check.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import LineIcon from "../components/icons/line.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ClockIcon from "../components/icons/clock.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import DashboardIcon from "../components/icons/dashboard.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CalendarIcon from "../components/icons/calendar.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import NoteIcon from "../components/icons/note.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ArrowIcon from "../components/icons/arrow.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SettingIcon from "../components/icons/settings.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import LogoutIcon from "../components/icons/logout.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ProfileIcon from "../components/icons/profile.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import MarkIcon from "../components/icons/mark.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import TaskIcon from "../components/icons/tasks.svg?react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import CloudIcon from "../components/icons/cloud.svg?react";

const stats = [
    { icon: CheckIcon, value: "12", label: "Tasks Today", color: "text-cyan-300" },
    { icon: CalendarIcon, value: "3", label: "Events", color: "text-fuchsia-400" },
    { icon: NoteIcon, value: "7", label: "Notes", color: "text-cyan-300" },
    { icon: LineIcon, value: "85%", label: "Productivity", color: "text-cyan-300" },
    { icon: ClockIcon, value: "24h 36m", label: "Focus Time", color: "text-fuchsia-400" },
    { icon: DashboardIcon, value: "92%", label: "Score", color: "text-cyan-300" },
];

const todayTasks = [
    { title: "Finish UI", time: "2h", done: true },
    { title: "Standup", time: "30m", done: true },
    { title: "Analytics", time: "1h", done: true },
    { title: "Design meeting", time: "1h 30m", done: false },
];

const upcoming = [
    { icon: TaskIcon, title: "Product Review", date: "15 May, 14:00", tag: "Meeting", color: "text-fuchsia-400" },
    { icon: TaskIcon, title: "Design Meeting", date: "16 May, 11:00", tag: "Meeting", color: "text-cyan-400" },
    { icon: TaskIcon, title: "Deploy v2.1", date: "20 May, 09:00", tag: "Important", color: "text-cyan-300" },
];

const activityData = [
    { label: "Mon", value: 0 },
    { label: "Tue", value: 0 },
    { label: "Wed", value: 0 },
    { label: "Thu", value: 0 },
    { label: "Fri", value: 0 },
    { label: "Sat", value: 100 },
    { label: "Sun", value: 0 },
];

const taskStats = [
    {
        label: "Completed",
        value: 19,
        color: "#00dfff",
        dot: "bg-cyan-400",
    },
    {
        label: "In Progress",
        value: 6,
        color: "#0b7cff",
        dot: "bg-blue-500",
    },
    {
        label: "Pending",
        value: 5,
        color: "#7c3aed",
        dot: "bg-violet-500",
    },
];

const totalTasks = taskStats.reduce((sum, item) => sum + item.value, 0);

const completedTasks = taskStats.find((item) => item.label === "Completed")?.value ?? 0;

const completionPercent = Math.round((completedTasks / totalTasks) * 100);

const radius = 78;
const stroke = 20;
const circumference = 2 * Math.PI * radius;

let offsetPercent = 0;

const circleSegments = taskStats.filter((item) => item.label !== "Pending").map((item) => {
    const percent = item.value / totalTasks;
    const dash = percent * circumference;
    const gap = circumference - dash;
    const offset = -offsetPercent * circumference;

    offsetPercent += percent;

    return {
        ...item,
        dasharray: `${dash} ${gap}`,
        dashoffset: offset,
    };
});

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`rounded-xl border border-cyan-400/10 bg-black/20 shadow-[0_0_18px_rgba(0,255,255,0.04)] ${className}`}>
            {children}
        </div>
    );
}

function Legend({color,label,value,}: {color: string; label: string; value: number;}) {
    return (
        <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <span className={`h-4 w-4 rounded-full ${color}`} />
                <span className="text-zinc-300">{label}</span>
            </div>

            <span className="text-zinc-200">{value}</span>
        </div>
    );
}

function SmallChart({title, value, percent, color, negative = false,}: {title: string; value: string; percent: string; color: "cyan" | "orange" | "pink"; negative?: boolean;}) {
    const stroke =
        color === "cyan" ? "#00dfff" : color === "orange" ? "#f97316" : "#ec4899";

    return (
        <Card className="h-40 p-8">
            <h2 className="text-xl font-[Orbitron] mb-4">{title}</h2>

            <div className="flex items-end justify-between">
                <div>
                    <div className="text-4xl font-[Orbitron]">{value}</div>
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

type QuickButtonProps = {
    icon: React.ElementType;
    label: string;
    purple?: boolean;
};

function QuickButton({ icon: Icon, label, purple = false }: QuickButtonProps) {
    return (
        <button className="h-32 rounded-xl border border-cyan-400/10 bg-slate-950/30 flex flex-col items-center justify-center gap-4 hover:border-cyan-400/40 transition">
            <Icon className={`w-10 h-10 ${purple ? "text-fuchsia-400" : "text-cyan-300"}`} />

            <span className="text-sm text-zinc-200 whitespace-nowrap">
                {label}
            </span>
        </button>
    );
}

function ActivityChart({ data }: { data: { label: string; value: number }[] }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || data.length < 2) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        const paddingTop = 10;
        const paddingBottom = 10;
        const chartHeight = height - paddingTop - paddingBottom;
        const stepX = width / (data.length - 1);

        const points = data.map((item, index) => ({
            x: index * stepX,
            y: paddingTop + chartHeight - (item.value / 100) * chartHeight,
        }));

        ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
        ctx.lineWidth = 1;

        [0, 25, 50, 75, 100].forEach((percent) => {
            const y = paddingTop + chartHeight - (percent / 100) * chartHeight;

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        });

        const drawCurve = () => {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 0; i < points.length - 1; i++) {
                const current = points[i];
                const next = points[i + 1];
                const midX = (current.x + next.x) / 2;

                ctx.bezierCurveTo(midX, current.y, midX, next.y, next.x, next.y);
            }
        };

        const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
        fillGradient.addColorStop(0, "rgba(0, 255, 255, 0.35)");
        fillGradient.addColorStop(1, "rgba(0, 255, 255, 0)");

        drawCurve();
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = fillGradient;
        ctx.fill();

        drawCurve();
        ctx.strokeStyle = "#00dfff";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.shadowColor = "rgba(0, 255, 255, 0.45)";
        ctx.shadowBlur = 14;
        ctx.stroke();

        ctx.shadowBlur = 0;

        const activeIndex = data.findIndex(
            (item) => item.value === Math.max(...data.map((item) => item.value))
        );

        const active = points[activeIndex];

        ctx.strokeStyle = "rgba(0, 223, 255, 0.25)";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(active.x, active.y);
        ctx.lineTo(active.x, height);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#00dfff";
        ctx.shadowColor = "rgba(0, 255, 255, 0.6)";
        ctx.shadowBlur = 16;

        ctx.beginPath();
        ctx.roundRect(active.x - 9, active.y - 9, 18, 18, 3);
        ctx.fill();

        ctx.shadowBlur = 0;
    }, [data]);

    return (
        <div className="relative h-[210px]">
            <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-zinc-400 text-sm">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
            </div>

            <canvas
                ref={canvasRef}
                className="absolute left-16 right-0 top-0 h-[185px] w-[calc(100%-4rem)]"
            />

            <div className="absolute left-16 right-0 bottom-0 flex justify-between text-zinc-400 text-sm">
                {data.map((item) => (
                    <span key={item.label}>{item.label}</span>
                ))}
            </div>
        </div>
    );
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [isPeriodOpen, setIsPeriodOpen] = useState(false);
    const [period, setPeriod] = useState("This Week");

    const periods = [
        "This Week",
        "This Month",
        "This Quarter",
        "This Year",
        "All Time",
    ];
    return (
        <main className="min-h-screen w-full overflow-x-hidden px-8 py-5 text-white font-[Orbitron]">
            <div className="mb-4 flex items-center justify-between relative">
                <h1 className="text-3xl font-[Orbitron] tracking-wide">Dashboard</h1>
                <div className="flex items-center gap-5">
                    <button className="text-2xl text-zinc-300 cursor-pointer hover:text-cyan-300 transition">
                        <NotificationIcon className="w-6 h-6"/>
                    </button>
                    <div className="relative">
                        <button onClick={() => setIsProfileOpen((prev) => !prev)} className="flex items-center gap-3 cursor-pointer">
                            <div className="h-11 w-11 rounded-full border border-cyan-400/60 flex items-center justify-center text-cyan-300 text-xl shadow-[0_0_14px_rgba(0,255,255,0.18)]">
                                D
                            </div>
                            <div className="flex items-center text-zinc-200 hover:text-cyan-300 transition">
                                DarkKnife
                                <PrevIcon className={`w-6 h-6 transition-transform duration-300 ${isProfileOpen ? "rotate-90" : "-rotate-90"}`}/>
                            </div>
                        </button>
                        {isProfileOpen && (<div className="absolute right-0 top-16 z-50 w-[320px] rounded-xl border border-purple-500/70
                            bg-[#020b12]/95 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.35)] p-5">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="h-10 w-16 rounded-full border border-cyan-400 flex items-center justify-center text-cyan-300 text-xl
                                        shadow-[0_0_20px_rgba(0,255,255,0.25)]">
                                        D
                                    </div>
                                    <div>
                                        <p className="text-xl font-[Orbitron] text-white">DarkKnife</p>
                                        <p className="text-sm text-zinc-400">serserpar801014@gmail.com</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-lg">
                                    <div className="my-4 h-px bg-cyan-400/20"/>
                                    <Link to="/profile" className="flex items-center gap-4 h-12 px-4 rounded-lg text-white hover:border-cyan-400/40
                                        hover:bg-cyan-400/[0.06] hover:text-cyan-300 transition">
                                        <ProfileIcon className="w-5 h-5 text-cyan-300"/>
                                        <span>Profile</span>
                                    </Link>
                                    <Link to="/settings" className="flex items-center gap-4 h-12 px-4 rounded-lg text-white hover:bg-cyan-400/[0.06] hover:text-cyan-300 transition">
                                        <SettingIcon className="w-5 h-5 text-cyan-300"/>
                                        <span>Settings</span>
                                    </Link>
                                    <Link to="/notifications" className="flex items-center gap-4 h-12 px-4 rounded-lg text-white hover:bg-cyan-400/[0.06] hover:text-cyan-300 transition">
                                        <NotificationIcon className="w-5 h-5 text-cyan-300"/>
                                        <span>Notifications</span>
                                    </Link>
                                </div>
                                <div className="my-4 h-px bg-cyan-400/20"/>
                                <button onClick={() => {
                                        navigate("/");
                                    }} className="flex items-center gap-4 h-12 w-full px-4 rounded-lg text-pink-500 hover:bg-pink-500/10 transition">
                                    <LogoutIcon className="w-5 h-5"/>
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <section className="grid grid-cols-6 gap-5 mb-2">
                {stats.map((item) => (
                    <Card key={item.label} className="h-22 px-7 flex items-center gap-5">
                        <div className={`text-4xl ${item.color} drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]`}>
                            <item.icon className="w-10 h-10"></item.icon>
                        </div>

                        <div>
                            <div className="text-2xl font-[Orbitron] leading-none">{item.value}</div>
                            <div className="mt-2 text-sm text-zinc-400">{item.label}</div>
                        </div>
                    </Card>
                ))}
            </section>
            <section className="grid grid-cols-3 gap-5 mb-2">
                <Card className="h-[310px] p-8 col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-[Orbitron]">Activity Overview</h2>
                        <div className="relative">
                            <button onClick={() => setIsPeriodOpen((prev) => !prev)}
                                    className={`h-10 flex cursor-pointer px-4 items-center gap-2 rounded-lg border bg-slate-950/40 text-sm transition
                                ${isPeriodOpen ? "border-cyan-400/60 text-cyan-300 shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                                        : "border-slate-600/60 text-zinc-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"}`}>
                                {period}
                                <PrevIcon
                                    className={`w-6 h-6 transition-transform duration-300 ${isPeriodOpen ? "rotate-90" : "-rotate-90"}`}/>
                            </button>
                            {isPeriodOpen && (
                                <div className="absolute right-0 w-44 top-12 z-50 rounded-xl border border-cyan-400/30 bg-[#06121a]/95
                                    p-2 space-y-1 shadow-[0_0_24px_rgba(0,255,255,0.16)] backdrop-blur-xl">
                                    {periods.map((item) => (
                                        <button key={item}
                                                onClick={() => {
                                                    setPeriod(item);
                                                    setIsPeriodOpen(false);
                                                }} className={`w-full h-8 flex items-center justify-between rounded-lg p-4 text-sm transition cursor-pointer
                                            ${period === item ? "bg-cyan-400/10 text-cyan-300" : "text-zinc-300 hover:bg-cyan-400/5 hover:text-cyan-300"}`}>
                                            <span>{item}</span>
                                            {period === item && (
                                                <MarkIcon className="w-5 h-5"></MarkIcon>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <ActivityChart data={activityData}/>
                </Card>

                <Card className="h-[310px] p-8">
                    <h2 className="text-xl font-[Orbitron] mb-2">Task Completion</h2>
                    <div className="flex items-center justify-between">
                        <div className="relative h-48 w-48 flex items-center justify-center">
                            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 192 192">
                                <circle cx="96" cy="96" r={radius} fill="none" stroke="#062136" strokeWidth={stroke}/>
                                {circleSegments.map((item) => (
                                    <circle key={item.label} cx="96" cy="96" r={radius} fill="none" stroke={item.color}
                                            strokeWidth={stroke}
                                            strokeLinecap="round" strokeDasharray={item.dasharray}
                                            strokeDashoffset={item.dashoffset}
                                            className="drop-shadow-[0_0_10px_rgba(0,255,255,0.22)]"/>
                                ))}
                            </svg>
                            <div
                                className="relative z-10 h-32 w-32 rounded-full bg-[#020914] flex flex-col items-center justify-center">
                                <div className="text-4xl font-[Orbitron]">
                                    {completionPercent}%
                                </div>
                                <div className="mt-2 text-cyan-300">
                                    +13%
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6 min-w-56">
                            {taskStats.map((item) => (
                                <Legend key={item.label} color={item.dot} label={item.label}
                                        value={item.value}></Legend>
                            ))}
                        </div>
                    </div>
                </Card>
            </section>
            <section className="grid grid-cols-3 gap-5 mb-2">
                <SmallChart title="Tasks Completed" value="19" percent="+11%" color="cyan"/>
                <SmallChart title="Tasks In Progress" value="6" percent="-2%" color="orange" negative/>
                <SmallChart title="Tasks Pending" value="5" percent="-5%" color="pink" negative/>
            </section>
            <section className="grid grid-cols-3 gap-5">
                <Card className="h-[300px] p-8">
                    <h2 className="text-xl font-[Orbitron] mb-5">Today Tasks</h2>

                    <div className="space-y-1">
                        {todayTasks.map((task) => (
                            <div key={task.title} className="h-10 flex items-center justify-between border-b border-cyan-400/5">
                                <div className="flex items-center gap-2">
                                    <span className={`h-6 w-6 rounded-full border flex items-center justify-center text-xs
                                        ${task.done ? "bg-cyan-400 border-cyan-400 text-slate-950" : "border-slate-500 text-transparent"}`}>
                                        <MarkIcon className="w-4 h-4"/>
                                    </span>

                                    <span className="text-zinc-200">{task.title}</span>
                                </div>

                                <span className="text-zinc-400">{task.time}</span>
                            </div>
                        ))}
                    </div>

                    <button className="mx-auto mt-3 flex items-center gap-3 text-cyan-300 hover:text-cyan-200 transition">
                        View All Tasks <ArrowIcon className="w-6 h-6 transform rotate-180"></ArrowIcon>
                    </button>
                </Card>

                <Card className="h-[300px] p-8">
                    <h2 className="text-xl font-[Orbitron] mb-5">Upcoming</h2>

                    <div className="space-y-1">
                        {upcoming.map((item) => (
                            <div key={item.title} className="h-14 flex items-center justify-between border-b border-cyan-400/5">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-cyan-400/10 flex items-center justify-center text-2xl">
                                        <item.icon className={`w-6 h-6 ${item.color}`}></item.icon>
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

                    <button className="mx-auto mt-3 flex items-center gap-3 text-cyan-300 hover:text-cyan-200 transition">
                        View Calendar <ArrowIcon className="w-6 h-6 transform rotate-180"></ArrowIcon>
                    </button>
                </Card>

                <Card className="h-[300px] p-8">
                    <h2 className="text-xl font-[Orbitron] mb-4">Quick Add</h2>

                    <div className="grid grid-cols-4 gap-5">
                        <QuickButton icon={CheckIcon} label="New Task"/>
                        <QuickButton icon={TaskIcon} label="New Event" purple/>
                        <QuickButton icon={NoteIcon} label="New Note"/>
                        <QuickButton icon={CloudIcon} label="Upload"/>
                    </div>

                    <button className="h-14 mt-2 w-full rounded-xl bg-cyan-400 text-slate-950 font-[Orbitron] flex items-center justify-center gap-4 hover:bg-cyan-300 transition">
                        Quick Add
                    </button>
                </Card>
            </section>
        </main>
    );
}