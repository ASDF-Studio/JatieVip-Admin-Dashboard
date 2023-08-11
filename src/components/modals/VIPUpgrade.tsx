import React, { useCallback } from 'react'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { Button } from '../Button'
import { Input } from 'components/input'
import { Calendar, Sort } from 'components/icons'
import { ConfirmationModal } from './confirmation'
import { BasicSelect } from 'components/dropdown'
import dayjs from 'dayjs'

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
      <Typography variant="heading3" className="text-center font-rec">
        {children}
      </Typography>
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
  onAccept?: (duration: string) => Promise<void>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  cancel?: string
  save?: string
  onClose?: () => void
  MemberSince?: string
}

export const VIPUpgrade: React.FC<Props> = ({
  onAccept,
  open = false,
  setOpen,
  save = 'Save',
  cancel = 'Cancel',
  MemberSince = '',
  onClose = undefined,
}): React.ReactElement => {
  const [loading, setLoading] = React.useState(false)
  const [showReactiveModal, setShowReactiveModal] = React.useState(false)
  const [isUpgrade, setIsUpgrade] = React.useState(true)
  const [duration, setDuration] = React.useState('7d')
  const handleClose = () => {
    setOpen(false)
    if (onClose !== undefined) {
      onClose()
    }
  }

  const handleSave = () => {
    setShowReactiveModal(true)
  }

  const handleAction = async () => {
    try {
      setLoading(true)
      await onAccept(duration)
      handleClose()
    } catch (err) {
      console.log('error')
    } finally {
      setLoading(false)
    }
  }
  

  const items = [
    { value1: '7d', value: '7 Days', label: '7 Days' },
    { value1: '14d', value: '14 Days', label: '14 Days' },
    { value1: '30d', value: '30 Days', label: '30 Days' },
    { value1: '3m', value: '3 Months', label: '3 Months' },
    { value1: '6m', value: '6 Months', label: '6 Months' },
    { value1: '1y', value: '1 Year', label: '1 Year' },
    { value1: 'forever', value: 'Forever', label: 'Forever' },
  ]

  const calculateDate = useCallback((val) => {
    let expireDate = ''
    switch (val) {
      case '7d':
        expireDate = dayjs().add(7, 'day').toString()
        break
      case '14d':
        expireDate = dayjs().add(14, 'day').toString()
        break
      case '30d':
        expireDate = dayjs().add(30, 'day').toString()
        break
      case '3m':
        expireDate = dayjs().add(3, 'month').toString()
        break
      case '6m':
        expireDate = dayjs().add(6, 'month').toString()
        break
      case '1y':
        expireDate = dayjs().add(1, 'year').toString()
        break
      case 'forever':
        expireDate = dayjs().add(1000, 'year').toString()
        break
      default:
        break
    }

    return expireDate
  }, [])

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Upgrade to VIP User
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography variant="subheadBold" className="text-text-grey font-sans">
            {'VIP Duration'}
          </Typography>
          <div className="py-2">
            <BasicSelect
              value={duration}
              name="gender"
              items={items}
              onChange={(e) => {
                setDuration(items.filter((x) => x.value === e.target.value)[0].value1)
              }}
            />
          </div>
          <div>
            <Typography variant="subheadBold" className="text-text-grey font-sans pr-1">
              {'Will expire on'}
            </Typography>
            <Typography variant="subheadBold" className="text-text-grey font-sans">
              {calculateDate(duration)}
            </Typography>
          </div>
        </DialogContent>
        <DialogActions className="gap-[9px] flex flex-row">
          <Button
            variant="primary"
            textClassName="text-text-white"
            loading={loading}
            disabled={loading}
            className="w-full shadow-none"
            // onClick={async () => {
            //   setLoading(true)
            //   await onAccept({ retry: false })
            //   setLoading(false)
            //   setOpen(false)
            // }}
            onClick={handleAction}
          >
            {save}
          </Button>
          <Button variant="secondry" textClassName="text-text-primary," className="w-full" onClick={handleClose}>
            {cancel}
          </Button>
        </DialogActions>

        
      </BootstrapDialog>
    </div>
  )
}
