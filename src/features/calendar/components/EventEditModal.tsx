import type { EventEditModalProps } from "../types/calendar.types.ts";
import { useCalendarDropdownOptions } from "../hooks/useCalendarDropdownOptions.ts";
import { useEventEditForm } from "../hooks/useEventEditForm.ts";
import { useEventFormValidation } from "../hooks/useEventFormValidation.ts";
import { useUpdateCalendarEvent } from "../hooks/useUpdateCalendarEvent.ts";
import CustomDropdown from "../../../components/ui/CustomDropdown";
import CustomTimeDropdown from "../../../components/ui/CustomTimeDropdown.tsx";
import CustomDateDropdown from "../../../components/ui/CustomDateDropdown.tsx";
import CloseIcon from "../../../components/icons/close.svg?react";
import LocationIcon from "../../../components/icons/location.svg?react";

export default function EventEditModal({ event, onClose, onEventUpdated }: EventEditModalProps) {
    const {title, setTitle, description, setDescription, location, setLocation, eventType, setEventType, priority, setPriority, status, setStatus, startTime,
        setStartTime, endTime, setEndTime, date, setDate, color, setColor} = useEventEditForm(event);
    const { options } = useCalendarDropdownOptions(Boolean(event));
    const { isSaving, updateEvent } = useUpdateCalendarEvent({onEventUpdated, onClose,});
    const { errors, validate } = useEventFormValidation({title, description, location, eventType, priority, status, date, startTime, endTime, color});

    async function handleSubmit() {
        if (!event || !validate()) return;

        await updateEvent(event.id, {
            title,
            description,
            type: eventType,
            priority,
            status,
            date,
            start_at: startTime,
            end_at: endTime,
            location,
            color,
        });
    }

    if (!event) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="max-h-[100%] w-full max-w-[760px] relative rounded-2xl border border-cyan-500/30 bg-[#030D14] p-6 shadow-[0_0_40px_rgba(0,255,255,0.12)] md:p-8">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">
                        Edit Event
                    </h2>
                    <button onClick={onClose} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-cyan-400/15 bg-[#030D14]
                            text-zinc-300 transition hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]">
                        <CloseIcon className="h-6 w-6"/>
                    </button>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm text-zinc-100">
                            Event Title <span className="text-pink-400">*</span>
                        </label>
                        <input value={title} onChange={(event) => setTitle(event.target.value)}
                            className={`w-full rounded-xl border px-3 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:text-cyan-300
                                ${errors.title ? "border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.25)]"
                                    : "border-cyan-500/30 focus:border-cyan-400/60 focus:shadow-[0_0_16px_rgba(0,255,255,0.14)] hover:border-cyan-400/60 " +
                                    "hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                               }`}/>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm text-zinc-100">
                            Description
                        </label>
                        <textarea value={description} rows={4} onChange={(event) => setDescription(event.target.value)}
                            className={`w-full resize-none rounded-xl border px-3 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:text-cyan-300
                                ${errors.description ? "border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.25)]"
                                    : "border-cyan-500/30 focus:border-cyan-400/60 focus:shadow-[0_0_16px_rgba(0,255,255,0.14)] hover:border-cyan-400/60 hover:text-cyan-300 " +
                                    "hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                                }`}/>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-zinc-100">
                                Event Type <span className="text-pink-400">*</span>
                            </label>
                            <CustomDropdown value={eventType} options={options.types} onChange={setEventType}/>
                            <input type="hidden" name="type" value={eventType}/>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-zinc-100">
                                Priority <span className="text-pink-400">*</span>
                            </label>
                            <CustomDropdown value={priority} options={options.priorities} onChange={setPriority}/>
                            <input type="hidden" name="priority" value={priority}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-zinc-100">
                                Status
                            </label>
                            <CustomDropdown value={status} options={options.statuses} onChange={setStatus}/>
                            <input type="hidden" name="status" value={status}/>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-zinc-100">
                                Color
                            </label>
                            <CustomDropdown value={color} options={options.colors} onChange={setColor}/>
                            <input type="hidden" name="color" value={color}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-zinc-100">
                                Date <span className="text-pink-400">*</span>
                            </label>
                            <CustomDateDropdown value={date} onChange={setDate}/>
                            <input type="hidden" name="date" value={date}/>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-zinc-100">
                                Start Time <span className="text-pink-400">*</span>
                            </label>
                            <CustomTimeDropdown value={startTime} onChange={setStartTime}/>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-zinc-100">
                                End Time <span className="text-pink-400">*</span>
                            </label>
                            <CustomTimeDropdown value={endTime} onChange={setEndTime}/>
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-zinc-100">
                            Location
                        </label>
                        <div className={`flex items-center gap-4 rounded-xl border bg-[#030D14] px-3 py-3 transition
                            ${errors.location? "border-red-500 shadow-[0_0_16px_rgba(239,68,68,0.25)]"
                                : "border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)] focus-within:border-cyan-400/60 " +
                                "focus-within:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                        }`}>
                            <LocationIcon className="h-6 w-6 text-cyan-300"/>
                            <input value={location} placeholder="Location"
                                   onChange={(event) => setLocation(event.target.value)}
                                   className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500 focus:text-cyan-300 hover:text-cyan-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 pt-1 md:flex-row md:justify-between">
                        <button type="button" onClick={onClose} className="cursor-pointer rounded-xl border border-cyan-500/30 px-8 py-3 text-white
                            transition hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]">
                            Cancel
                        </button>
                        <button type="button" onClick={handleSubmit} disabled={isSaving}
                            className="cursor-pointer rounded-xl bg-cyan-400 px-10 py-3 font-semibold text-black transition hover:bg-cyan-300
                                hover:shadow-[0_0_18px_rgba(0,255,255,0.35)]">
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}