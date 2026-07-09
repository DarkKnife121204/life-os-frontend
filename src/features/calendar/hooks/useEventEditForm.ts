import { useEffect, useState } from "react";
import type { CalendarEvent } from "../types/calendar.types.ts";

export function useEventEditForm(event: CalendarEvent | null) {
    const [eventType, setEventType] = useState<string>(event?.type ?? "Event");
    const [priority, setPriority] = useState<string>(event?.priority ?? "Low");
    const [status, setStatus] = useState<string>(event?.status ?? "Upcoming");
    const [startTime, setStartTime] = useState<string>(event?.startTime ?? "00:00");
    const [endTime, setEndTime] = useState<string>(event?.endTime ?? "00:00");
    const [date, setDate] = useState<string>(event?.date ?? "");
    const [title, setTitle] = useState(event?.title ?? "");
    const [description, setDescription] = useState(event?.description ?? "");
    const [location, setLocation] = useState(event?.location ?? "");
    const [color, setColor] = useState(event?.color ?? "cyan");
    useEffect(() => {
        if (!event) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTitle(event.title);
        setDescription(event.description);
        setLocation(event.location);
        setEventType(event.type);
        setPriority(event.priority);
        setStatus(event.status);
        setStartTime(event.startTime);
        setEndTime(event.endTime);
        setDate(event.date);
        setColor(event.color);
    }, [event]);

    return {
        title,
        setTitle,
        description,
        setDescription,
        location,
        setLocation,
        eventType,
        setEventType,
        priority,
        setPriority,
        status,
        setStatus,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        date,
        setDate,
        color,
        setColor,
    };
}
