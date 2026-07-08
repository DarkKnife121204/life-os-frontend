import { colorOptions, priorityOptions, statusOptions, typeOptions } from "../../../components/constants/constants";
import type { EventFilterModalProps} from "../types/calendar.types";
import {useEventFilters} from "../hooks/useEventFilters";
import CustomDateDropdown from "../../../components/ui/CustomDateDropdown.tsx";
import CheckboxGroup from "../../../components/ui/CheckboxGroup";
import CloseIcon from "../../../components/icons/close.svg?react";
import SearchIcon from "../../../components/icons/search.svg?react";

export default function EventFilterModal({isOpen, onClose, onApply}: EventFilterModalProps) {
    const {search, setSearch, types, setTypes, priorities, setPriorities, statuses, setStatuses, colors, setColors, fromDate, setFromDate, toDate, setToDate, resetFilters, getFilters} = useEventFilters();
    if (!isOpen) return null;

    function handleApply() {
        onApply(getFilters());
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
            <div className="relative w-full max-w-[760px] rounded-2xl border border-cyan-500/30 bg-[#030D14] p-6 shadow-[0_0_40px_rgba(0,255,255,0.12)] md:p-8">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg text-white">
                        Filter Events
                    </h2>
                    <button type="button" onClick={onClose} className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-cyan-400/15 bg-[#030D14]
                        text-zinc-300 transition hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]">
                        <CloseIcon className="h-6 w-6" />
                    </button>
                </div>
                <form className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm text-zinc-100">
                            Search
                        </label>
                        <div className="relative max-w-[760px]">
                            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search events..."
                                className="h-12 w-full rounded-xl border border-cyan-500/30 bg-transparent px-3 text-sm text-white outline-none
                                    transition placeholder:text-zinc-500 focus:border-cyan-400/60 focus:text-cyan-300
                                    focus:shadow-[0_0_16px_rgba(0,255,255,0.14)]
                                    hover:border-cyan-400/60 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2">
                                <SearchIcon className="h-5 w-5 text-zinc-500"></SearchIcon>
                            </span>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-2 text-sm text-zinc-100">
                            Date
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <span className="mb-1 block text-sm text-zinc-300">
                                    From
                                </span>
                                <CustomDateDropdown value={fromDate} onChange={setFromDate}/>
                            </div>
                            <div>
                                <span className="mb-1 block text-sm text-zinc-300">
                                    To
                                </span>
                                <CustomDateDropdown value={toDate} onChange={setToDate}/>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <CheckboxGroup title="Type" options={typeOptions} values={types} onChange={setTypes}/>

                        <CheckboxGroup title="Priority" options={priorityOptions} values={priorities} onChange={setPriorities} variant="dot"/>

                        <CheckboxGroup title="Status" options={statusOptions} values={statuses} onChange={setStatuses}/>
                    </div>

                    <CheckboxGroup title="Color" options={colorOptions} values={colors} onChange={setColors} variant="dot" layout="grid"/>
                    <div className="border-t border-cyan-400/15 pt-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <button type="button" onClick={resetFilters} className="cursor-pointer rounded-xl border border-cyan-500/30 px-8 py-3 text-white transition
                                hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                            >
                                Reset Filters
                            </button>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <button type="button" onClick={onClose} className="cursor-pointer rounded-xl border border-cyan-500/30 px-8 py-3 text-white transition
                                    hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
                                >
                                    Cancel
                                </button>
                                <button type="button" onClick={handleApply} className="cursor-pointer rounded-xl bg-cyan-400 px-10 py-3 text-black transition
                                    hover:bg-cyan-300 hover:shadow-[0_0_18px_rgba(0,255,255,0.35)]"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}