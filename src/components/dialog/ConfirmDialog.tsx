import React from 'react';
// MUI
import {
	Dialog, DialogTitle, DialogContent, DialogActions, Button,
	Box, Typography
} from '@mui/material';
// Interfaces
import type { ConfirmDialogProps } from '../../interfaces/dialog.interface';

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
	isOpen,
	title,
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	variant = 'info',
	onConfirm,
	onCancel,
}) => {
	const getVariantStyles = () => {
		switch (variant) {
			case 'danger':
				return {
					color: 'error' as const,
					iconColor: 'error.main'
				};
			case 'warning':
				return {
					color: 'warning' as const,
					iconColor: 'warning.main'
				};
			default:
				return {
					color: 'primary' as const,
					iconColor: 'primary.main'
				};
		}
	};

	const styles = getVariantStyles();

	return (
		<Dialog
			open={isOpen}
			onClose={onCancel}
			maxWidth="sm"
			fullWidth
		>
			<DialogTitle sx={{ pb: 1 }}>
				<Box display="flex" alignItems="center" gap={2}>
					<Typography variant="h6" component="span">
						{title}
					</Typography>
				</Box>
			</DialogTitle>
			
			<DialogContent sx={{ pt: 2 }}>
				<Typography color="text.secondary">
					{message}
				</Typography>
			</DialogContent>
			
			<DialogActions sx={{ p: 3, pt: 1, gap: 1 }}>
				<Button onClick={onCancel} color="inherit">{cancelText}</Button>
				<Button onClick={onConfirm} variant="contained" color={styles.color} autoFocus>{confirmText}</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
