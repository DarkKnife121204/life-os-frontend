import CalendarIcon from "@/components/icons/calendar.svg?react"
import ProfileIcon from "@/components/icons/profile.svg?react"
import TaskIcon from "@/components/icons/tasks.svg?react"
import ClockIcon from "@/components/icons/clock.svg?react"
import DeadIcon from "@/components/icons/dead.svg?react"
import CompleteIcon from "@/components/icons/complete.svg?react"
import UpcomingIcon from "@/components/icons/upcoming.svg?react"
import ClosedIcon from "@/components/icons/closed.svg?react"
import type {CalendarView, SortField} from "../types/calendar.types";

export const BG_COLOR_CLASSES = {
    Cyan: "border-cyan-400 bg-cyan-400/15",
    Purple: "border-fuchsia-400 bg-fuchsia-400/15",
    Blue: "border-blue-400 bg-blue-400/15",
    Orange: "border-orange-400 bg-orange-400/15",
} as const;

export const TEXT_COLOR_CLASSES = {
    Cyan: "text-cyan-400",
    Purple: "text-fuchsia-400",
    Blue: "text-blue-400",
    Orange: "text-orange-400",
} as const;

export const DOT_PRIORITY_CLASSES = {
    High: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]",
    Medium: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.9)]",
    Low: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.9)]",
} as const;

export const TEXT_PRIORITY_CLASSES = {
    High: "text-red-500",
    Medium: "text-orange-500",
    Low: "text-cyan-500",
}

export const STATUS_CLASSES = {
    Upcoming: "bg-cyan-400/10 text-cyan-400",
    Completed: "bg-green-400/10 text-green-400",
    Cancelled: "bg-red-400/10 text-red-400",
} as const;

export const STATUS_ICON = {
    Upcoming: UpcomingIcon,
    Completed: CompleteIcon,
    Cancelled: ClosedIcon,
} as const;

export const CALENDAR_STAT_COLORS = {
    Events: "text-fuchsia-400",
    "Total Time": "text-cyan-400",
    Meetings: "text-cyan-300",
    Task: "text-orange-400",
} as const;

export const CALENDAR_STAT_ICONS = {
    Events: CalendarIcon,
    "Total Time": ClockIcon,
    Meetings: ProfileIcon,
    Task: DeadIcon,
} as const;

export const EVENT_TYPE_ICON = {
    Event: CalendarIcon,
    Meeting: ProfileIcon,
    Important: ClockIcon,
    Task: TaskIcon,
} as const;

export const CALENDAR_WEEK_DAYS = [
    "All-day",
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
] as const;

export const CALENDAR_VIEWS: CalendarView[] = [
    "Month",
    "Week",
    "Day",
    "All Events",
];

export const FULL_CALENDAR_VIEWS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
] as const;

export const TABLE_HEADERS: { label: string; field: SortField }[] = [
    { label: "Event", field: "title" },
    { label: "Type", field: "type" },
    { label: "Date", field: "date" },
    { label: "Start", field: "startTime" },
    { label: "End", field: "endTime" },
    { label: "Location", field: "location" },
    { label: "Priority", field: "priority" },
    { label: "Status", field: "status" },
];

export const SORT_FIELD_MAP: Record<string, string> = {
    title: "title",
    type: "type",
    date: "date",
    startTime: "start_at",
    endTime: "end_at",
    location: "location",
    priority: "priority",
    status: "status",
};
