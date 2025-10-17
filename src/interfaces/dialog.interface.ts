export interface ConfirmDialogProps {
	isOpen: boolean;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
	variant?: 'danger' | 'warning' | 'info';
}

export type DialogVariant = 'danger' | 'warning' | 'info';
