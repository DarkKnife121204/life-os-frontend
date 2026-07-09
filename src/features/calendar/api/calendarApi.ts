import api from "@/api/api";
import type {CalendarEvent, DropdownOption, PaginationMeta, SortDirection, SortField} from "../types/calendar.types.ts";
import {SORT_FIELD_MAP } from "../constants/calendar.constants.ts";

export type CalendarEventsResponse = {
    events: CalendarEvent[];
    meta: PaginationMeta | null;
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

function formatTimestampToTime(timestamp: number): string {
    return new Date(timestamp * 1000).toISOString().slice(11, 16);
}

function mapCalendarEvent(event: BackendCalendarEvent): CalendarEvent {
    return {
        id: event.id,
        title: event.title,
        description: event.description ?? "",
        type: event.type,
        priority: event.priority,
        status: event.status,
        color: event.color,
        location: event.location ?? "",
        date: event.date.slice(0, 10),
        startTime: formatTimestampToTime(event.start_at),
        endTime: formatTimestampToTime(event.end_at),
    };
}

export async function getCalendarEvents(params?: CalendarEventsParams): Promise<CalendarEventsResponse> {
    const backendParams = {
        ...params,
        sort: params?.sort ? SORT_FIELD_MAP[params.sort] : undefined,
    };

    const response = await api.get("/events", {
        params: backendParams,
    });

    return {
        events: response.data.data.map(mapCalendarEvent),
        meta: response.data.meta ?? null,
    };
}

export async function getCalendarEvent(id: number): Promise<CalendarEvent> {
    const response = await api.get(`/events/${id}`);

    return mapCalendarEvent(response.data.data);
}

export async function deleteCalendarEvent(id: number): Promise<CalendarEvent> {
    const response = await api.delete(`/events/${id}`);

    return mapCalendarEvent(response.data.data);
}

export async function restoreCalendarEvent(id: number): Promise<CalendarEvent> {
    const response = await api.patch(`/events/${id}/restore`);

    return mapCalendarEvent(response.data.data);
}

export async function completeCalendarEvent(id: number): Promise<CalendarEvent> {
    const response = await api.patch(`/events/${id}/status`, {
        status: "Completed",
    });

    return mapCalendarEvent(response.data.data);
}

export async function getEventTypeOptions(): Promise<DropdownOption[]> {
    const response = await api.get("/events/Type");

    return response.data.data ?? response.data;
}

export async function getEventPriorityOptions(): Promise<DropdownOption[]> {
    const response = await api.get("/events/Priority");

    return response.data.data ?? response.data;
}

export async function getEventStatusOptions(): Promise<DropdownOption[]> {
    const response = await api.get("/events/Status");

    return response.data.data ?? response.data;
}

export async function getEventColorsOptions(): Promise<DropdownOption[]> {
    const response = await api.get("/events/Color");

    return response.data.data ?? response.data;
}

export async function updateCalendarEvent(id: number, payload: UpdateCalendarEventPayload): Promise<CalendarEvent> {
    const { data } = await api.patch(`/events/${id}`, payload);

    return mapCalendarEvent(data.data);
}

export async function createCalendarEvent(payload: CreateCalendarEventPayload): Promise<CalendarEvent> {
    const { data } = await api.post("/events", payload);

    return mapCalendarEvent(data.data);
}