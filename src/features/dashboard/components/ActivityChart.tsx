import { useEffect, useRef } from "react";

type ActivityChartProps = {
    data: {
        label: string;
        value: number;
    }[];
};

export default function ActivityChart({ data }: ActivityChartProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || data.length < 2) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        const paddingTop = 10;
        const paddingBottom = 10;
        const chartHeight = height - paddingTop - paddingBottom;
        const stepX = width / (data.length - 1);

        const points = data.map((item, index) => ({
            x: index * stepX,
            y: paddingTop + chartHeight - (item.value / 100) * chartHeight,
        }));

        ctx.strokeStyle = "rgba(148, 163, 184, 0.12)";
        ctx.lineWidth = 1;

        [0, 25, 50, 75, 100].forEach((percent) => {
            const y = paddingTop + chartHeight - (percent / 100) * chartHeight;

            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        });

        const drawCurve = () => {
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 0; i < points.length - 1; i++) {
                const current = points[i];
                const next = points[i + 1];
                const midX = (current.x + next.x) / 2;

                ctx.bezierCurveTo(midX, current.y, midX, next.y, next.x, next.y);
            }
        };

        const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
        fillGradient.addColorStop(0, "rgba(0, 255, 255, 0.35)");
        fillGradient.addColorStop(1, "rgba(0, 255, 255, 0)");

        drawCurve();
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = fillGradient;
        ctx.fill();

        drawCurve();
        ctx.strokeStyle = "#00dfff";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.shadowColor = "rgba(0, 255, 255, 0.45)";
        ctx.shadowBlur = 14;
        ctx.stroke();

        ctx.shadowBlur = 0;

        const maxValue = Math.max(...data.map((item) => item.value));
        const activeIndex = data.findIndex((item) => item.value === maxValue);
        const active = points[activeIndex];

        ctx.strokeStyle = "rgba(0, 223, 255, 0.25)";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(active.x, active.y);
        ctx.lineTo(active.x, height);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "#00dfff";
        ctx.shadowColor = "rgba(0, 255, 255, 0.6)";
        ctx.shadowBlur = 16;

        ctx.beginPath();
        ctx.roundRect(active.x - 9, active.y - 9, 18, 18, 3);
        ctx.fill();

        ctx.shadowBlur = 0;
    }, [data]);

    return (
        <div className="relative h-[210px]">
            <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-zinc-400 text-sm">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
            </div>

            <canvas
                ref={canvasRef}
                className="absolute left-16 right-0 top-0 h-[185px] w-[calc(100%-4rem)]"
            />

            <div className="absolute left-16 right-0 bottom-0 flex justify-between text-zinc-400 text-sm">
                {data.map((item) => (
                    <span key={item.label}>{item.label}</span>
                ))}
            </div>
        </div>
    );
}