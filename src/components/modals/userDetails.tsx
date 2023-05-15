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
import { VIPUpgrade } from './VIPUpgrade'
import { ConfirmationModal } from './confirmation'
import { BasicSelect } from 'components/dropdown'
import { CustomDatePicker } from 'components/date-input'
import { gender, country } from './modalData'

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
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  cancel?: string
  save?: string
  onClose?: () => void
  Name?: string
  Phone?: string
  Username?: string
  UserType?: string
  Country?: string
  MemberSince?: string
  UserImage?: string
  Gender?: string
  Email?: string
  AccountStatus?: string
}

export const UserDetails: React.FC<Props> = ({
  onAccept,
  open = false,
  setOpen,
  save = 'Save',
  cancel = 'Cancel',
  Name = '',
  Phone = '',
  Username = '',
  UserType = '',
  Country = '',
  MemberSince = '',
  UserImage = '',
  Gender = '',
  Email = '',
  AccountStatus = '',
  onClose = undefined,
}): React.ReactElement => {
  const [loading, setLoading] = React.useState(false)
  const [showVIPUpgradeModal, setShowVIPUpgradeModal] = React.useState(false)
  const [showRemoveUserModal, setShowRemoveUsreModal] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
    if (onClose !== undefined) {
      onClose()
    }
  }
  
  const handleRemove = () => {
    setShowRemoveUsreModal(true)
  }

  const handleDowngrade = () => {
    setShowVIPUpgradeModal(true)
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

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent>
          <div className="gap-6 flex flex-row items-center">
            <img className="w-[88px] h-[88px] rounded-full" src={UserImage} />
            <div className='flex flex-col'>
              <p className="text-[16px] font-DM_Sans font-bold leading-normal tracking-normal text-main-black">
                {'Profile Picture'}
              </p>
              <div className='flex flex-row gap-4'>
                <Button variant="secondry" textClassName="text-text-primary," className="mt-2 px-6" onClick={handleClose}>
                  {"Replace"}
                </Button>
                <Button variant="secondry2" textClassName="text-text-primary," className="mt-2 px-6" onClick={handleRemove}>
                  {"Remove"}
                </Button>
              </div>
            </div>
          </div>
          <div className='mt-4'>
            <Typography variant="subheadBold" className='text-text-grey font-sans'>{"Phone"}</Typography>
            <Input value={Phone} className="rounded-lg py-[2px] px-1 my-2 bg-border-grey font-sans" />
            <Typography variant="subheadBold" className='text-text-grey font-sans'>{"User uses this phone number to login"}</Typography>
          </div>

          <div className="absolute bg-[#f5f7f9] h-[1px] w-full left-0 my-2" />

          <div className='py-2'>
            <Typography variant="subheadBold" className='text-text-grey font-sans'>{"Basics"}</Typography>
            <div className='flex flex-row gap-5'>
              <Input value={Name} className="rounded-lg py-[2px] px-1 my-2 bg-border-grey font-sans" />
              <Input value={Name} className="rounded-lg py-[2px] px-1 my-2 bg-border-grey font-sans" />
            </div>
            <Input value={Email} className="rounded-lg py-[2px] px-1 my-2 bg-border-grey font-sans" />

             <div className="flex gap-5 justify-between pt-2">
                <div className="max-w-[11.875rem] flex flex-row">
                  <CustomDatePicker
                    date={"birthDay"}
                    // error={touched.birthDay && errors.birthDay}
                    onChange={(value) => {
                      // setFieldValue('birthDay', dayjs(value).format('YYYY-MM-DD'))
                      // setFieldTouched('birthDay', true)
                      console.log("")
                    }}
                  />
                  <div className="relative -ml-4 flex items-center justify-center outline-none focus:outline-none">
                    <Calendar className="w-[8px] fill-[#9381ff]" />
                  </div> 
                </div>
                <div className="max-w-[48%] w-full">
                  <BasicSelect value={"gender"} name="gender" items={gender} onChange={(e) => handleInputChange(e)} />
                </div>
              </div>
               <div className="pt-4 w-full">
                  <BasicSelect value={"Country"} name="gender" items={country} onChange={(e) => handleInputChange(e)} />
                </div>

          </div>

          <div className="absolute bg-[#f5f7f9] h-[1px] w-full left-0 my-2" />

          <div className='py-6'>
            <div className='flex flex-row justify-between'>
              <div>
                <Typography variant="subheadBold" className='text-text-grey font-sans pr-2'>{"Membership"}</Typography>
                <Typography variant="subheadBold" className='text-text-primary font-sans'>{UserType + ' User'}</Typography>
              </div>
              {UserType == 'VIP' && 
                <div>
                  <Typography variant="subheadBold" className='text-text-grey font-sans pr-2'>{'Custom/Expires on'}</Typography>
                  <Typography variant="subheadBold" className='text-text-grey font-sans'>{MemberSince}</Typography>
                </div>
              }
            </div>
            {
              UserType == 'VIP' ? 
                <Button variant="secondry" textClassName="text-text-primary," className="w-full mt-2" onClick={handleDowngrade}>
                  {"Downgrade to Free User"}
                </Button>
                 : 
                <Button variant="secondry" textClassName="text-text-primary," className="w-full mt-2" onClick={handleDowngrade}>
                {"Upgrade to VIP User"}
              </Button>
            }
            
          </div>

          <div className="absolute bg-[#f5f7f9] h-[1px] w-full left-0" />

          <div className='py-4 flex flex-row justify-between items-center'>
            <div className='gap-5'>
              <Typography variant="subheadBold" className='text-text-grey font-sans pr-2'>{"Account Status"}</Typography>
              <Typography variant="subheadBold" className='text-text-green font-sans'>{AccountStatus}</Typography>
            </div>
              <div className='gap-2 flex flex-row whitespace-nowrap'>
                <Button variant="action" textClassName="text-text-red text-[13px]" className="w-full bg-opacity-10 h-[30] px-4" onClick={handleClose}>
                  {"Ban User"}
                </Button>
                <Button variant="action" textClassName="text-text-red text-[13px]" className="w-full bg-opacity-10 h-[30] px-4" onClick={handleClose}>
                  {"Delete User"}
                </Button>
              </div>
          </div>

          <div className="absolute bg-[#f5f7f9] h-[1px] w-full left-0" />


        </DialogContent>
        <DialogActions className="gap-[9px] flex flex-row">
          <Button
            variant="primary"
            textClassName="text-text-white"
            loading={loading}
            disabled={loading}
            className="w-full shadow-none"
            onClick={async () => {
              setLoading(true)
              // await onAccept({ retry: false })
              setLoading(false)
              setOpen(false)
            }}
          >
            {save}
          </Button>
          <Button variant="secondry" textClassName="text-text-primary," className="w-full" onClick={handleClose}>
            {cancel}
          </Button>
        </DialogActions>
        <ConfirmationModal
          open={showRemoveUserModal}
          onAccept={handleAction}
          setOpen={setShowRemoveUsreModal}
          contentText={`Are you sure you want to remove this user?`}
          acceptText={'Yes'}
          cancelText={`No, don’t remove user`}
        />
        <VIPUpgrade
          open={showVIPUpgradeModal}
          setOpen={setShowVIPUpgradeModal}
          cancel="Cancel"
          onAccept={handleAction}
          save="Save"
          MemberSince={MemberSince}
      />
      </BootstrapDialog>
    </div>
  )
}
