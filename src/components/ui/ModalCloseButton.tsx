import CloseIcon from "../icons/close.svg?react";

type ModalCloseButtonProps = {
    onClick: () => void;
};

export default function ModalCloseButton({ onClick }: ModalCloseButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-cyan-400/15 bg-[#030D14]
                text-zinc-300 transition hover:border-cyan-400/50 hover:text-cyan-300 hover:shadow-[0_0_16px_rgba(0,255,255,0.14)]"
        >
            <CloseIcon className="h-6 w-6" />
        </button>
    );
}
