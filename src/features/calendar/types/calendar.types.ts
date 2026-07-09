export type CalendarEventColor = "Cyan" | "Purple" | "Orange" | "Blue";

export type CalendarEventPriority = "High" | "Medium" | "Low";

export type CalendarEventStatus = "Upcoming" | "Completed" | "Cancelled";

export type CalendarEventType = "Meeting" | "Important" | "Event" | "Task";

export type CalendarEvent = {
    id: number;
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    priority: CalendarEventPriority;
    status: CalendarEventStatus;
    color: CalendarEventColor;
    type: CalendarEventType;
    location: string;
};

export type CalendarView = "Month" | "Week" | "Day" | "All Events";

export type SortField =
    | "title"
    | "type"
    | "date"
    | "startTime"
    | "endTime"
    | "location"
    | "priority"
    | "status";

export type SortDirection = "asc" | "desc";

export type DateRange = {
    from_date: string;
    to_date: string;
};

export type CalendarDay = {
    day: number;
    date: string;
    isCurrentMonth: boolean;
    isSunday: boolean;
    isToday: boolean;
};

export type CalendarWeekDay = {
    date: string;
    label: string;
    day: number;
    weekend: boolean;
    active: boolean;
};

export type CalendarEventFilters = {
    search?: string;
    type?: string[];
    priority?: string[];
    status?: string[];
    color?: string[];
    from_date?: string;
    to_date?: string;
};

export type DropdownOption = {
    label: string;
    value: string;
};

export type CalendarDropdownOptions = {
    types: DropdownOption[];
    priorities: DropdownOption[];
    statuses: DropdownOption[];
    colors: DropdownOption[];
};

export type PaginationMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};



