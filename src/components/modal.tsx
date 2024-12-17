import { type ReactNode } from 'react';

type ModalProps = {
	isOpen: boolean;
	onCloseAction: () => void;
	children: ReactNode;
};

export const Modal = ({ isOpen, onCloseAction, children }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="rounded bg-white p-4 shadow-lg">
				<button onClick={onCloseAction} className="absolute right-2 top-2">
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};
