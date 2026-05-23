type TaskCompletionLegendProps = {
    color: string;
    label: string;
    value: number;
};

export default function TaskCompletionLegend({color, label, value}: TaskCompletionLegendProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3 md:gap-4">
                <span className={`h-3 w-3 md:h-4 md:w-4 shrink-0 rounded-full ${color}`} />

                <span className="truncate text-sm md:text-base text-zinc-300">
                    {label}
                </span>
            </div>

            <span className="shrink-0 text-sm md:text-base text-zinc-200">
                {value}
            </span>
        </div>
    );
}