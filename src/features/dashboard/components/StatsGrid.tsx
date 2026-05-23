import { stats } from "../data/dashboard.mock";
import StatCard from "./StatCard";

export default function StatsGrid() {
    return (
        <section className="grid grid-cols-6 gap-5 mb-2">
            {stats.map((item) => (
                <StatCard
                    key={item.label}
                    icon={item.icon}
                    value={item.value}
                    label={item.label}
                    color={item.color}
                />
            ))}
        </section>
    );
}