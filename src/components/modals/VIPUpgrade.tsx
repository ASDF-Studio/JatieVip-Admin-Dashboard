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
import { Input } from 'components/input'
import { Calendar, Sort } from 'components/icons'
import { ConfirmationModal } from './confirmation'
import { BasicSelect } from 'components/dropdown'

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
      <Typography variant="heading3" className="text-center font-rec">{children}</Typography>
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
    setLoading(true)
    setLoading(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = event.target
    // setFieldTouched(name, true, true)
    // formik.setFieldValue(name, value)
    console.log("")
  }

  const items = [
    { value: '7 Days', label: '7 Days' },
    { value: '14 Days', label: '14 Days' },
    { value: '30 Days', label: '30 Days' },
    { value: '3 Months', label: '3 Months' },
    { value: '6 Months', label: '6 Months' },
    { value: '1 Year', label: '1 Year' },
    { value: 'Forever', label: 'Forever' },
  ]

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Upgrade to VIP User
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography variant="subheadBold" className='text-text-grey font-sans'>{"VIP Duration"}</Typography>
           <div className='py-2'>
              <BasicSelect value={"Select"} name="gender" items={items} onChange={(e) => handleInputChange(e)} />
            </div>
            <div>
              <Typography variant="subheadBold" className='text-text-grey font-sans pr-1'>{'Will expire on'}</Typography>
              <Typography variant="subheadBold" className='text-text-grey font-sans'>{MemberSince}</Typography>
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
            onClick={handleSave}
          >
            {save}
          </Button>
          <Button variant="secondry" textClassName="text-text-primary," className="w-full" onClick={handleClose}>
            {cancel}
          </Button>
        </DialogActions>

        <ConfirmationModal
          open={showReactiveModal}
          onAccept={handleAction}
          setOpen={setShowReactiveModal}
          contentText={`Are you sure you want to ${
            isUpgrade ? 'upgrade' : 'downgrade'
          } this user?`}
          acceptText={'Yes'}
          cancelText={`No, don’t ${
            isUpgrade ? 'upgrade' : 'downgrade'
          } user`}
        />
      </BootstrapDialog>
    </div>
  )
}
