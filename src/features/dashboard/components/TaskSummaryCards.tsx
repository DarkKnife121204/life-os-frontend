import SmallChart from "./SmallChart";

export default function TaskSummaryCards() {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-3">
            <SmallChart title="Tasks Completed" value="19" percent="+11%" color="cyan" />

            <SmallChart title="Tasks In Progress" value="6" percent="-2%" color="orange" negative />

            <SmallChart title="Tasks Pending" value="5" percent="-5%" color="pink" negative />
        </section>
    );
}
