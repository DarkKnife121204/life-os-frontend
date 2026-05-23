import React from "react";
import Card from "../../../components/ui/Card";

type StatCardProps = {
    icon: React.ElementType;
    value: string;
    label: string;
    color: string;
};

export default function StatCard({
                                     icon: Icon,
                                     value,
                                     label,
                                     color,
                                 }: StatCardProps) {
    return (
        <Card className="h-22 px-7 flex items-center gap-5">
            <div className={`text-4xl ${color} drop-shadow-[0_0_10px_rgba(0,255,255,0.7)]`}>
                <Icon className="w-10 h-10" />
            </div>

            <div>
                <div className="text-2xl font-[Orbitron] leading-none">
                    {value}
                </div>

                <div className="mt-2 text-sm text-zinc-400">
                    {label}
                </div>
            </div>
        </Card>
    );
}