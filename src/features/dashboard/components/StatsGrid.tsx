import { stats } from "../data/dashboard.mock";
import StatCard from "./StatCard";

export default function StatsGrid() {
    return (
        <section className="grid grid-cols-2 xl:grid-cols-6 gap-3 mb-3">
            {stats.map((item) => (
                <StatCard key={item.label} icon={item.icon} value={item.value} label={item.label} color={item.color} />
            ))}
        </section>
    );
}
