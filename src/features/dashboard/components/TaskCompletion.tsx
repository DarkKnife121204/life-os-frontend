import Card from "../../../components/ui/Card";
import { taskStats } from "../data/dashboard.mock";
import TaskCompletionLegend from "./TaskCompletionLegend";

const totalTasks = taskStats.reduce((sum, item) => sum + item.value, 0);

const completedTasks =
    taskStats.find((item) => item.label === "Completed")?.value ?? 0;

const completionPercent = Math.round((completedTasks / totalTasks) * 100);

const radius = 78;
const stroke = 20;
const circumference = 2 * Math.PI * radius;

let offsetPercent = 0;

const circleSegments = taskStats
    .filter((item) => item.label !== "Pending")
    .map((item) => {
        const percent = item.value / totalTasks;
        const dash = percent * circumference;
        const gap = circumference - dash;
        const offset = -offsetPercent * circumference;

        offsetPercent += percent;

        return {
            ...item,
            dasharray: `${dash} ${gap}`,
            dashoffset: offset,
        };
    });

export default function TaskCompletion() {
    return (
        <Card className="h-[310px] p-8">
            <h2 className="text-xl font-[Orbitron] mb-2">
                Task Completion
            </h2>

            <div className="flex items-center justify-between">
                <div className="relative h-48 w-48 flex items-center justify-center">
                    <svg
                        className="absolute inset-0 h-full w-full -rotate-90"
                        viewBox="0 0 192 192"
                    >
                        <circle
                            cx="96"
                            cy="96"
                            r={radius}
                            fill="none"
                            stroke="#062136"
                            strokeWidth={stroke}
                        />

                        {circleSegments.map((item) => (
                            <circle
                                key={item.label}
                                cx="96"
                                cy="96"
                                r={radius}
                                fill="none"
                                stroke={item.color}
                                strokeWidth={stroke}
                                strokeLinecap="round"
                                strokeDasharray={item.dasharray}
                                strokeDashoffset={item.dashoffset}
                                className="drop-shadow-[0_0_10px_rgba(0,255,255,0.22)]"
                            />
                        ))}
                    </svg>

                    <div className="relative z-10 h-32 w-32 rounded-full bg-[#020914] flex flex-col items-center justify-center">
                        <div className="text-4xl font-[Orbitron]">
                            {completionPercent}%
                        </div>

                        <div className="mt-2 text-cyan-300">
                            +13%
                        </div>
                    </div>
                </div>

                <div className="space-y-6 min-w-56">
                    {taskStats.map((item) => (
                        <TaskCompletionLegend
                            key={item.label}
                            color={item.dot}
                            label={item.label}
                            value={item.value}
                        />
                    ))}
                </div>
            </div>
        </Card>
    );
}