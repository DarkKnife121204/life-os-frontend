import {
    TEXT_COLOR_CLASSES,
    TEXT_PRIORITY_CLASSES,
    CALENDAR_STAT_ICONS,
    STATUS_ICON,
    CALENDAR_STAT_COLORS,
} from "@/features/calendar/constants/calendar.constants.ts";
import type { CheckboxGroupOption } from "../types/types.ts";

export const MONTH_NAMES = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
] as const;

export const MINI_CALENDAR_VIEWS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const colorOptions: CheckboxGroupOption[] = [
    {
        label: "Cyan",
        value: "Cyan",
        color: TEXT_COLOR_CLASSES.Cyan,
    },
    {
        label: "Purple",
        value: "Purple",
        color: TEXT_COLOR_CLASSES.Purple,
    },
    {
        label: "Blue",
        value: "Blue",
        color: TEXT_COLOR_CLASSES.Blue,
    },
    {
        label: "Orange",
        value: "Orange",
        color: TEXT_COLOR_CLASSES.Orange,
    },
];

export const priorityOptions: CheckboxGroupOption[] = [
    {
        label: "High",
        value: "High",
        color: TEXT_PRIORITY_CLASSES.High,
    },
    {
        label: "Medium",
        value: "Medium",
        color: TEXT_PRIORITY_CLASSES.Medium,
    },
    {
        label: "Low",
        value: "Low",
        color: TEXT_PRIORITY_CLASSES.Low,
    },
];

export const statusOptions: CheckboxGroupOption[] = [
    {
        label: "Upcoming",
        value: "Upcoming",
        image: STATUS_ICON.Upcoming,
    },
    {
        label: "Completed",
        value: "Completed",
        image: STATUS_ICON.Completed,
    },
    {
        label: "Cancelled",
        value: "Cancelled",
        image: STATUS_ICON.Cancelled,
    },
];

export const typeOptions: CheckboxGroupOption[] = [
    {
        label: "Event",
        value: "Event",
        image: CALENDAR_STAT_ICONS.Events,
        color: CALENDAR_STAT_COLORS.Events,
    },
    {
        label: "Task",
        value: "Task",
        image: CALENDAR_STAT_ICONS.Task,
        color: CALENDAR_STAT_COLORS.Task,
    },
    {
        label: "Meeting",
        value: "Meeting",
        image: CALENDAR_STAT_ICONS.Meetings,
        color: CALENDAR_STAT_COLORS.Meetings,
    },
];
