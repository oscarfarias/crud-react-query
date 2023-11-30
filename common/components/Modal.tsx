import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from '@mui/material'
interface ModalProps {
  isOpen: boolean
  children?: React.ReactNode
  cancelText?: string
  confirmText?: string
  title?: string
  onConfirm?: () => void
  onCancel?: () => void
  actions?: React.ReactNode
}

export default function Modal({
  isOpen,
  title = ``,
  children = null,
  cancelText = `CANCEL`,
  confirmText = `ACCEPT`,
  onConfirm = () => null,
  onCancel = () => null,
  actions,
}: ModalProps): JSX.Element | null {
  return isOpen ? (
    <Dialog open fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          fontSize: `18px !important`,
          fontWeight: `bold !important`,
          color: `#000000`,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ flexDirection: `column` }}>{children}</DialogContent>
      <DialogActions sx={{ justifyContent: `center` }}>
        {actions ? (
          actions
        ) : (
          <>
            <Button variant="flat" onClick={onCancel}>
              {cancelText}
            </Button>
            <Button color="error" disableRipple onClick={onConfirm}>
              {confirmText}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  ) : null
}
