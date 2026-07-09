import Card from "../../../components/ui/Card";
import {getCalendarStats} from "../utils/getCalendarStats";
import {CALENDAR_STAT_COLORS, CALENDAR_STAT_ICONS} from "../constants/calendar.constants";
import type {CalendarEvent} from "../types/calendar.types.ts";

export type CalendarStatsProps = {
    events: CalendarEvent[];
};

export default function CalendarStats({ events }: CalendarStatsProps ) {
    const calendarStats = getCalendarStats(events);
    return (
        <Card className="p-4">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm text-white">Calendar Stats</h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {calendarStats.map((stat) => {
                    const Icon = CALENDAR_STAT_ICONS[stat.label as keyof typeof CALENDAR_STAT_ICONS];
                    const color = CALENDAR_STAT_COLORS[stat.label as keyof typeof CALENDAR_STAT_COLORS];

                    return (
                        <div key={stat.label} className="min-h-[74px] rounded-lg border border-cyan-400/10 bg-[#06111a]/70 px-4 py-3 shadow-[inset_0_0_20px_rgba(0,255,255,0.03)]">
                            <div className="flex items-start gap-3">
                                {Icon && (
                                    <Icon className={`h-6 w-6 shrink-0 ${color}`} />
                                )}

                                <div>
                                    <div className="text-base leading-none text-zinc-100">
                                        {stat.value}
                                    </div>

                                    <div className="mt-2 text-xs leading-none text-zinc-300">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
}