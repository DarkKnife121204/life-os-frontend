import { useState } from "react";
import { useToast } from "../../../app/providers/ToastProvider.tsx";

type EventFormFields = {
    title: string;
    description: string;
    location: string;
    eventType: string;
    priority: string;
    status: string;
    date: string;
    startTime: string;
    endTime: string;
    color: string;
};

export function useEventFormValidation(fields: EventFormFields) {
    const { showToast } = useToast();
    const [submitted, setSubmitted] = useState(false);

    const requiredFields = {
        title: !fields.title.trim(),
        description: !fields.description.trim(),
        location: !fields.location.trim(),
        eventType: !fields.eventType,
        priority: !fields.priority,
        status: !fields.status,
        date: !fields.date,
        startTime: !fields.startTime,
        endTime: !fields.endTime,
        color: !fields.color,
    };

    const errors = submitted
        ? requiredFields
        : Object.fromEntries(
            Object.keys(requiredFields).map((key) => [key, false])
        );

    function validate() {
        setSubmitted(true);

        if (Object.values(requiredFields).some(Boolean)) {
            showToast({
                title: "Validation error",
                message: "Fill in all required fields",
                status: 422,
            });

            return false;
        }

        return true;
    }

    return {
        errors,
        validate,
    };
}