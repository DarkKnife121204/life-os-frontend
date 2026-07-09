import { useState } from "react";

export function useEventCreateForm() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    const [eventType, setEventType] = useState("");
    const [priority, setPriority] = useState("");
    const [status, setStatus] = useState("");

    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [color, setColor] = useState("");

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
        date,
        setDate,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        color,
        setColor,
    };
}
