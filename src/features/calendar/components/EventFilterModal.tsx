import { colorOptions, priorityOptions, statusOptions, typeOptions } from "@/components/constants/constants";
import type { CalendarEventFilters } from "../types/calendar.types";
import { useEventFilters } from "../hooks/useEventFilters";
import CustomDateDropdown from "@/components/ui/CustomDateDropdown.tsx";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import Modal from "@/components/ui/Modal.tsx";
import ModalCloseButton from "@/components/ui/ModalCloseButton.tsx";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input.tsx";
import FormField from "@/components/ui/FormField.tsx";
import SearchIcon from "@/components/icons/search.svg?react";

type EventFilterModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: CalendarEventFilters) => void;
    initialFilters: CalendarEventFilters;
};

export default function EventFilterModal({
    isOpen,
    onClose,
    onApply,
    initialFilters,
}: EventFilterModalProps) {
    const {
        search,
        setSearch,
        types,
        setTypes,
        priorities,
        setPriorities,
        statuses,
        setStatuses,
        colors,
        setColors,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        resetFilters,
        getFilters,
    } = useEventFilters(initialFilters);
    if (!isOpen) return null;

    function handleApply() {
        onApply(getFilters());
        onClose();
    }

    return (
        <Modal>
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg text-white">Filter Events</h2>
                <ModalCloseButton onClick={onClose} />
            </div>
            <form className="space-y-4">
                <FormField label="Search">
                    <div className="relative">
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search events..."
                            className="h-12 pr-12 text-sm"
                        />
                        <SearchIcon className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                    </div>
                </FormField>
                <div>
                    <h3 className="mb-2 text-sm text-zinc-100">Date</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <FormField label="From">
                            <CustomDateDropdown value={fromDate} onChange={setFromDate} />
                        </FormField>
                        <FormField label="To">
                            <CustomDateDropdown value={toDate} onChange={setToDate} />
                        </FormField>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <CheckboxGroup title="Type" options={typeOptions} values={types} onChange={setTypes} />
                    <CheckboxGroup
                        title="Priority"
                        options={priorityOptions}
                        values={priorities}
                        onChange={setPriorities}
                        variant="dot"
                    />
                    <CheckboxGroup title="Status" options={statusOptions} values={statuses} onChange={setStatuses} />
                </div>
                <CheckboxGroup
                    title="Color"
                    options={colorOptions}
                    values={colors}
                    onChange={setColors}
                    variant="dot"
                    layout="grid"
                />
                <div className="border-t border-cyan-400/15 pt-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <Button type="button" variant="secondary" onClick={resetFilters} className="px-8 py-3">
                            Reset Filters
                        </Button>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button type="button" variant="secondary" onClick={onClose} className="px-8 py-3">
                                Cancel
                            </Button>
                            <Button type="button" onClick={handleApply} className="px-10 py-3 font-semibold">
                                Apply Filters
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    );
}
