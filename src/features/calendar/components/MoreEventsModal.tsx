import type { CalendarEvent } from "../types/calendar.types.ts";
import EventCard from "./EventCard.tsx";
import Modal from "@/components/ui/Modal.tsx";
import ModalCloseButton from "@/components/ui/ModalCloseButton.tsx";
import { useCalendarEventContext } from "../context/CalendarEventContext";

type MoreEventsModalProps = {
    date: string | null;
    events: CalendarEvent[];
    onClose: () => void;
};

function formatModalDate(date: string | null) {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
}

export default function MoreEventsModal({ date, events, onClose }: MoreEventsModalProps) {
    const { openEvent } = useCalendarEventContext();

    if (!date) return null;
    return (
        <Modal>
            <div className="mb-5 flex items-start justify-between">
                <div>
                    <h2 className="text-xl">
                        Events on <span className="text-cyan-300">{formatModalDate(date)}</span>
                    </h2>
                    <p className="mt-3 text-sm text-zinc-300">{events.length} events</p>
                </div>
                <ModalCloseButton onClick={onClose} />
            </div>
            <div className="space-y-3">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onClick={() => {
                            onClose();
                            openEvent(event);
                        }}
                        showType
                        showStatus
                        timeView="block"
                    />
                ))}
            </div>
        </Modal>
    );
}
