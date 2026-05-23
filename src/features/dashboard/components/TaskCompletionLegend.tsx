type TaskCompletionLegendProps = {
    color: string;
    label: string;
    value: number;
};

export default function TaskCompletionLegend({
                                                 color,
                                                 label,
                                                 value,
                                             }: TaskCompletionLegendProps) {
    return (
        <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <span className={`h-4 w-4 rounded-full ${color}`} />
                <span className="text-zinc-300">{label}</span>
            </div>

            <span className="text-zinc-200">{value}</span>
        </div>
    );
}