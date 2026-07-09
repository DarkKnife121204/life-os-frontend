type ModalRowProps = {
    icon: React.ReactNode;
    title: string;
    value: string;
};

export function ModalRow({icon, title, value}: ModalRowProps) {
    return (
        <div className="grid grid-cols-[20px_1fr] gap-5 py-2">
            <div className="pt-1 text-cyan-300 [&>svg]:h-6 [&>svg]:w-6">
                {icon}
            </div>
            <div>
                <h3 className="text-sm font-semibold text-zinc-100">
                    {title}
                </h3>

                <p className="text-sm text-zinc-400">
                    {value}
                </p>
            </div>
        </div>
    );
}