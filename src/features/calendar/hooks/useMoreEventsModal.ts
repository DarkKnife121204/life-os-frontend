import { useState } from "react";

export function useMoreEventsModal() {
    const [moreEventsDate, setMoreEventsDate] = useState<string | null>(null);

    function openMoreEventsModal(date: string) {
        setMoreEventsDate(date);
    }

    function closeMoreEventsModal() {
        setMoreEventsDate(null);
    }

    return {
        moreEventsDate,
        openMoreEventsModal,
        closeMoreEventsModal,
    };
}