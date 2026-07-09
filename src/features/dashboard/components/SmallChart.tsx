import Card from "@/components/ui/Card";

type SmallChartProps = {
    title: string;
    value: string;
    percent: string;
    color: "cyan" | "orange" | "pink";
    negative?: boolean;
};

export default function SmallChart({title, value, percent, color, negative = false }: SmallChartProps) {
    const stroke =
        color === "cyan"
            ? "#00dfff"
            : color === "orange"
                ? "#f97316"
                : "#ec4899";

    return (
        <Card className="min-h-32 p-4 md:p-5 xl:p-6">
            <h2 className="mb-4 text-lg md:text-xl leading-tight">
                {title}
            </h2>

            <div className="flex items-end justify-between gap-4">
                <div className="shrink-0">
                    <div className="text-3xl md:text-4xl">
                        {value}
                    </div>

                    <div className={`mt-2 text-base md:text-lg ${negative ? "text-pink-500" : "text-cyan-300"}`}>
                        {percent}
                    </div>
                </div>

                <svg className="h-12 w-full max-w-[220px] md:max-w-[260px]" viewBox="0 0 260 60" preserveAspectRatio="none">
                    <path d="M5,38 C25,25 30,48 50,31 C70,18 76,42 98,25 C120,10 122,40 142,26 C160,12 168,36 190,18 C210,5 220,40 255,22"
                        fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round"/>
                </svg>
            </div>
        </Card>
    );
}