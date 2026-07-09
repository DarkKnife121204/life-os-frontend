import type { CalendarEvent } from "../types/calendar.types.ts";
import { useCalendarDropdownOptions } from "../hooks/useCalendarDropdownOptions.ts";
import { useEventEditForm } from "../hooks/useEventEditForm.ts";
import { useEventFormValidation } from "../hooks/useEventFormValidation.ts";
import { useUpdateCalendarEvent } from "../hooks/useUpdateCalendarEvent.ts";
import CustomDropdown from "@/components/ui/CustomDropdown";
import CustomTimeDropdown from "@/components/ui/CustomTimeDropdown.tsx";
import CustomDateDropdown from "@/components/ui/CustomDateDropdown.tsx";
import Modal from "@/components/ui/Modal.tsx";
import ModalCloseButton from "@/components/ui/ModalCloseButton.tsx";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input.tsx";
import Textarea from "@/components/ui/Textarea.tsx";
import FormField from "@/components/ui/FormField.tsx";
import LocationIcon from "@/components/icons/location.svg?react";

type EventEditModalProps = {
    event: CalendarEvent | null;
    onClose: () => void;
    onEventUpdated: (event: CalendarEvent) => void;
};

export default function EventEditModal({ event, onClose, onEventUpdated }: EventEditModalProps) {
    const {
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
    } = useEventEditForm(event);
    const { options } = useCalendarDropdownOptions(Boolean(event));
    const { isSaving, updateEvent } = useUpdateCalendarEvent({ onEventUpdated, onClose });
    const { errors, validate } = useEventFormValidation({
        title,
        description,
        location,
        eventType,
        priority,
        status,
        date,
        startTime,
        endTime,
        color,
    });

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
        <Modal>
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Edit Event</h2>
                <ModalCloseButton onClick={onClose} />
            </div>
            <form className="space-y-4">
                <FormField label="Event Title" required>
                    <Input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Event title"
                        isInvalid={errors.title}
                    />
                </FormField>
                <FormField label="Description">
                    <Textarea
                        value={description}
                        rows={4}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Description"
                        isInvalid={errors.description}
                    />
                </FormField>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField label="Event Type" required>
                        <CustomDropdown
                            value={eventType}
                            options={options.types}
                            onChange={setEventType}
                            isInvalid={errors.eventType}
                        />
                    </FormField>
                    <FormField label="Priority" required>
                        <CustomDropdown
                            value={priority}
                            options={options.priorities}
                            onChange={setPriority}
                            isInvalid={errors.priority}
                        />
                    </FormField>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField label="Status" required>
                        <CustomDropdown
                            value={status}
                            options={options.statuses}
                            onChange={setStatus}
                            isInvalid={errors.status}
                        />
                    </FormField>
                    <FormField label="Color" required>
                        <CustomDropdown
                            value={color}
                            options={options.colors}
                            onChange={setColor}
                            isInvalid={errors.color}
                        />
                    </FormField>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <FormField label="Date" required>
                        <CustomDateDropdown value={date} onChange={setDate} isInvalid={errors.date} />
                    </FormField>
                    <FormField label="Start Time" required>
                        <CustomTimeDropdown value={startTime} onChange={setStartTime} isInvalid={errors.startTime} />
                    </FormField>
                    <FormField label="End Time" required>
                        <CustomTimeDropdown value={endTime} onChange={setEndTime} isInvalid={errors.endTime} />
                    </FormField>
                </div>
                <FormField label="Location">
                    <Input
                        value={location}
                        placeholder="Location"
                        onChange={(event) => setLocation(event.target.value)}
                        isInvalid={errors.location}
                        icon={<LocationIcon className="h-6 w-6 text-cyan-300" />}
                    />
                </FormField>
                <div className="flex flex-col gap-4 pt-1 md:flex-row md:justify-between">
                    <Button type="button" variant="secondary" onClick={onClose} className="px-8 py-3">
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className="px-10 py-3 font-semibold"
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
