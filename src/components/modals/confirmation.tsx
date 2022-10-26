import * as React from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { Button } from '../Button'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: `2.438rem 0.5rem 1.625rem 0.5rem !important`,
    position: 'relative',
  },
  '& .MuiPaper-root': {
    maxWidth: '440px',
    padding: '1.438rem 1.25rem 1.625rem 1.25rem',
    borderRadius: '18px',
    margin: '0 15px',
    boxSizing: 'border-box',
    width: '100%',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle className="flex items-center justify-between px-2 py-0 m-0" {...other}>
      <Typography variant="heading3">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

type Props = {
  onAccept?: ({ retry }: { retry?: boolean }) => Promise<void>
  contentText: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  cancelText?: string
  acceptText?: string
  onClose?: () => void
}

export const ConfirmationModal: React.FC<Props> = ({
  onAccept,
  contentText = '',
  open = false,
  setOpen,
  cancelText = 'No, Keep my current plan',
  acceptText = 'Yes',
  onClose = undefined,
}): React.ReactElement => {
  const [loading, setLoading] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
    if (onClose !== undefined) {
      onClose()
    }
  }

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Confirmation
        </BootstrapDialogTitle>
        <div className="absolute bg-[#f5f7f9] h-[1px] w-full left-0 top-[74px]" />
        <DialogContent>
          <Typography variant="heading3">{contentText}</Typography>
        </DialogContent>
        <DialogActions className="gap-[9px]">
          <Button
            variant="secondry"
            textClassName="text-text-blue"
            loading={loading}
            disabled={loading}
            className="w-full bg-fill-lightBlue2 shadow-none"
            onClick={async () => {
              setLoading(true)
              await onAccept({ retry: false })
              setLoading(false)
              setOpen(false)
            }}
          >
            {acceptText}
          </Button>
          <Button variant="fill" textClassName="text-white" className="w-full" onClick={handleClose}>
            {cancelText}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
