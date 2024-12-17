import { type ReactNode } from 'react';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="rounded bg-white p-4 shadow-lg">
				<button onClick={onClose} className="absolute right-2 top-2">
					&times;
				</button>
				{children}
			</div>
		</div>
	);
};
