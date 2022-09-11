import * as React from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { Button } from '../Button'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    maxWidth: '440px',
    padding: '1.438rem 1.25rem 1.625rem 1.25rem',
    borderRadius: '18px',
    margin: 0,
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
  onAccept?: () => void
  children?: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  buttonText?: string
}

export const ModalBase: React.FC<Props> = ({
  onAccept = () => console.log('123'),
  children: content,
  open = false,
  setOpen,
  title = '',
  buttonText = '',
}): React.ReactElement => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </BootstrapDialogTitle>
        {content}
        <DialogActions className="gap-[9px]">
          <Button variant="fill" textClassName="text-white" className="w-full" onClick={onAccept}>
            {buttonText}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
