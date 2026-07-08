import type { MoreEventsModalProps } from "../types/calendar.types.ts";
import EventCard from "./EventCard.tsx";
import CloseIcon from "../../../components/icons/close.svg?react";

function formatModalDate(date: string | null) {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
    });
}

export default function MoreEventsModal({date, events, onClose, onEventClick}: MoreEventsModalProps) {
    if (!date) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-2xl border border-cyan-500/30 bg-[#030D14] p-6 shadow-[0_0_40px_rgba(0,255,255,0.12)] md:p-8">
                <div className="mb-5 flex items-start justify-between">
                    <div>
                        <h2 className="text-xl">
                            Events on{" "}
                            <span className="text-cyan-300">
                                {formatModalDate(date)}
                            </span>
                        </h2>
                        <p className="mt-3 text-sm text-zinc-300">
                            {events.length} events
                        </p>
                    </div>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-cyan-400/15 bg-[#030D14]
                        text-zinc-300 transition hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                    >
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="space-y-3">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} onClick={() => {onClose();onEventClick(event);}} showType showStatus timeView="block"/>
                    ))}
                </div>
            </div>
        </div>
    );
}