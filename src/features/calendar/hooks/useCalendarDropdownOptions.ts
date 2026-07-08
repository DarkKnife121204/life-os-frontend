import { useEffect, useState } from "react";
import {getEventPriorityOptions, getEventStatusOptions, getEventTypeOptions, getEventColorsOptions} from "../api/calendarApi.ts";
import type { CalendarDropdownOptions } from "../types/calendar.types.ts";

const defaultOptions: CalendarDropdownOptions = {
    types: [],
    priorities: [],
    statuses: [],
    colors: [],
};

export function useCalendarDropdownOptions(enabled = true) {
    const [options, setOptions] = useState<CalendarDropdownOptions>(defaultOptions);
    const [isLoadingOptions, setIsLoadingOptions] = useState(false);

    useEffect(() => {
        if (!enabled) return;

        async function loadOptions() {
            try {
                setIsLoadingOptions(true);

                const [types, priorities, statuses, colors] = await Promise.all([
                    getEventTypeOptions(),
                    getEventPriorityOptions(),
                    getEventStatusOptions(),
                    getEventColorsOptions(),
                ]);

                setOptions({
                    types,
                    priorities,
                    statuses,
                    colors
                });
            } catch (error) {
                console.error("Failed to load calendar dropdown options", error);
            } finally {
                setIsLoadingOptions(false);
            }
        }

        loadOptions();
    }, [enabled]);

    return {
        options,
        isLoadingOptions,
    };
}