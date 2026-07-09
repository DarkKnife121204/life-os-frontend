import CheckIcon from "@/components/icons/check.svg?react";
import CalendarIcon from "@/components/icons/calendar.svg?react";
import NoteIcon from "@/components/icons/note.svg?react";
import LineIcon from "@/components/icons/line.svg?react";
import ClockIcon from "@/components/icons/clock.svg?react";
import DashboardIcon from "@/components/icons/dashboard.svg?react";
import TaskIcon from "@/components/icons/tasks.svg?react";

export const stats = [
    { icon: CheckIcon, value: "12", label: "Tasks Today", color: "text-cyan-300" },
    { icon: CalendarIcon, value: "3", label: "Events", color: "text-fuchsia-400" },
    { icon: NoteIcon, value: "7", label: "Notes", color: "text-cyan-300" },
    { icon: LineIcon, value: "85%", label: "Productivity", color: "text-cyan-300" },
    { icon: ClockIcon, value: "24h 36m", label: "Focus Time", color: "text-fuchsia-400" },
    { icon: DashboardIcon, value: "92%", label: "Score", color: "text-cyan-300" },
];

export const todayTasks = [
    { title: "Finish UI", time: "2h", done: true },
    { title: "Standup", time: "30m", done: true },
    { title: "Analytics", time: "1h", done: true },
    { title: "Design meeting", time: "1h 30m", done: false },
];

export const upcoming = [
    { icon: TaskIcon, title: "Product Review", date: "15 May, 14:00", tag: "Meeting", color: "text-fuchsia-400" },
    { icon: TaskIcon, title: "Design Meeting", date: "16 May, 11:00", tag: "Meeting", color: "text-cyan-400" },
    { icon: TaskIcon, title: "Deploy v2.1", date: "20 May, 09:00", tag: "Important", color: "text-cyan-300" },
];

export const activityData = [
    { label: "Mon", value: 0 },
    { label: "Tue", value: 0 },
    { label: "Wed", value: 0 },
    { label: "Thu", value: 0 },
    { label: "Fri", value: 0 },
    { label: "Sat", value: 100 },
    { label: "Sun", value: 0 },
];

export const taskStats = [
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