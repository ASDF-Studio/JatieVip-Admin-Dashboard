import * as React from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { ExclamationIcon } from 'components/icons'
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
  onAccept?: ({ retry }: { retry: boolean }) => Promise<void>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  cancelText?: string
  error?: string
  isCreate?: boolean
}

export const ErrorModal: React.FC<Props> = ({
  onAccept,
  open = false,
  setOpen,
  cancelText = 'Cancel',
  error,
  isCreate = false,
}): React.ReactElement => {
  const [loading, setLoading] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Unsuccessful
        </BootstrapDialogTitle>
        <div className="absolute bg-[#f5f7f9] h-[1px] w-full left-0 top-[74px]" />
        <DialogContent className="flex items-start gap-[21px]">
          <ExclamationIcon fill="#e92346" className=" w-[50px] pt-2" />
          <Typography className="text-[18px] leading-normal">{`We couldn’t complete the ${
            isCreate ? 'creating' : 'upgrading'
          } process due to an error ${error}. Please retry.`}</Typography>
        </DialogContent>
        <DialogActions className="gap-[9px]">
          <Button
            loading={loading}
            disabled={loading}
            className="w-full"
            variant="fill"
            textClassName="text-white"
            onClick={async () => {
              setLoading(true)
              await onAccept({ retry: true })
              setLoading(false)
            }}
          >
            Retry
          </Button>
          <Button
            variant="secondry"
            textClassName="text-text-blue"
            className="w-full bg-fill-lightBlue2 shadow-none"
            onClick={handleClose}
          >
            {cancelText}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
