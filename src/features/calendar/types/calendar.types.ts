import type {Dispatch, SetStateAction} from "react";

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

export type SortField = | "title" | "type" | "date" | "startTime" | "endTime" | "location" | "priority" | "status";

export type SortDirection = "asc" | "desc";

export type DateRange = {
    from_date: string;
    to_date: string;
};

export type BackendCalendarEvent = {
    id: number;
    title: string;
    description: string | null;
    type: CalendarEvent["type"];
    priority: CalendarEvent["priority"];
    status: CalendarEvent["status"];
    color: CalendarEvent["color"];
    location: string | null;
    date: string;
    start_at: number;
    end_at: number;
};

export type CalendarEventsParams = {
    page?: number;
    per_page?: number;

    from_date?: string;
    to_date?: string;

    search?: string;
    type?: string[];
    priority?: string[];
    status?: string[];
    color?: string[];

    sort?: SortField;
    order?: SortDirection;
};

export type PaginationMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type CalendarEventsResponse = {
    events: CalendarEvent[];
    meta: PaginationMeta | null;
};

export type CalendarAllEventsProps = {
    events: CalendarEvent[];
    isLoading: boolean;
    meta: PaginationMeta | null;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;

    sortField: SortField | null;
    sortDirection: SortDirection | null;
    onSort: (field: SortField) => void;
    onEventClick?: (event: CalendarEvent) => void;
};

export type CalendarToolbarProps = {
    view: CalendarView;
    setView: (view: CalendarView) => void;
    selectedDate: Date;
    setSelectedDate: Dispatch<SetStateAction<Date>>;
    onCreate: () => void;
    onFilter: () => void;
};

export type CalendarGridProps = {
    selectedDate: Date;
    events: CalendarEvent[];
    isLoading?: boolean;
    onEventClick?: (event: CalendarEvent) => void;
    onMoreClick: (date: string) => void;
};

export type CalendarWeekProps = {
    selectedDate: Date;
    events: CalendarEvent[];
    isLoading?: boolean;
    onEventClick?: (event: CalendarEvent) => void;
};

export type EventCardProps = {
    event: CalendarEvent;
    compact?: boolean;
    showDescription?: boolean;
    showType?: boolean;
    showStatus?: boolean;
    timeView?: "hidden" | "inline" | "block";
    onClick?: (event: CalendarEvent) => void;
};

export type CalendarProps = {
    events: CalendarEvent[];
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

export type UseCalendarEventsProps = {
    view: CalendarView;
    selectedDate: Date;
    filters: CalendarEventFilters;
};

export type CalendarCellProps = {
    day: number;
    date: string;
    events: CalendarEvent[];
    isCurrentMonth: boolean;
    isSunday: boolean;
    isToday: boolean;
    onEventClick?: (event: CalendarEvent) => void;
    onMoreClick: (date: string) => void;
};

export type CalendarTableSortHeaderProps<T extends string> = {
    label: string;
    field: T;
    activeField: T | null;
    direction: SortDirection | null;
    onSort: (field: T) => void;
};

export type ModalRowProps = {
    icon: React.ReactNode;
    title: string;
    value: string;
};

export type EventShowModalProps = {
    eventId: number | null;
    onClose: () => void;
    onEdit: (event: CalendarEvent) => void;
    onEventUpdated: (event: CalendarEvent) => void;
};

export type EventEditModalProps = {
    event: CalendarEvent | null;
    onClose: () => void;
    onEventUpdated: (event: CalendarEvent) => void;
};

export type UseUpdateCalendarEventProps = {
    onEventUpdated: (event: CalendarEvent) => void;
    onClose: () => void;
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

export type UpdateCalendarEventPayload = {
    title: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    date: string;
    start_at: string;
    end_at: string;
    location: string;
    color: string;
};

export type EventCreateModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onEventCreated: (event: CalendarEvent) => void;
};

export type CreateCalendarEventPayload = {
    title: string;
    description: string;
    type: string;
    priority: string;
    status: string;
    date: string;
    start_at: string;
    end_at: string;
    location: string;
    color: string;
};

export type MoreEventsModalProps = {
    date: string | null;
    events: CalendarEvent[];
    onClose: () => void;
    onEventClick: (event: CalendarEvent) => void;
};

export type EventFilterModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: CalendarEventFilters) => void;
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