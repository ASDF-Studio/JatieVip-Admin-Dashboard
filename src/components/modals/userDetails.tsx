import React, { useState } from 'react'
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
import { genderData, country } from './modalData'
import { IUser } from 'services/types'
import { useFormik } from 'formik'
import dayjs from 'dayjs'
import { AdminService } from 'services'
import { async } from 'rxjs'

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
  user: IUser
}

export const UserDetails: React.FC<Props> = ({
  onAccept,
  open = false,
  setOpen,
  save = 'Save',
  cancel = 'Cancel',
  MemberSince = '',
  AccountStatus = '',
  user,
  onClose = undefined,
}): React.ReactElement => {
  const [loading, setLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [banLoading, setBanLoading] = useState(false)
  const [showVIPUpgradeModal, setShowVIPUpgradeModal] = React.useState(false)
  const [showRemoveUserModal, setShowRemoveUsreModal] = React.useState(false)
  const [showDownGradeModal, setShowDownGradeModal] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phone: user?.contact || '',
      email: user?.primaryEmail || '',
      lastName: user?.fullName?.split(' ')[0] || '',
      firstName: user?.fullName?.split(' ')[1] || '',
      dob: user?.dob || '',
      gender: user?.gender || '',
      country: user?.location || '',
      isVip: user?.isVIP || false,
      imageUrl: user?.profilePic || null,
      filePath: null,
      isBanned: user?.isBanned,
    },
    onSubmit: async ({ email, lastName, firstName, gender, country, imageUrl, dob, filePath }) => {
      setLoading(true)
      try {
        await AdminService.updateAccount({
          location: country,
          profilePic: imageUrl,
          fullname: `${lastName} ${firstName}`.trim(),
          primaryEmail: email,
          dob: dob,
          gender,
          id: user?.id,
          username: user?.username,
          filePath: filePath,
        })
        onClose()
        handleClose()
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    },
  })

  const handleRemove = () => {
    setShowRemoveUsreModal(true)
  }

  const handleDowngrade = () => {
    setShowVIPUpgradeModal(true)
  }

  const { setFieldTouched, touched, errors, setFieldValue } = formik

  const handleBanUser = async () => {
    try {
      setBanLoading(true)
      if (isBanned) {
        await AdminService.unBanUser({
          userId: user.id,
        })
        setFieldValue('isBanned', false)
      } else {
        await AdminService.banUser({
          userId: user.id,
        })
        setFieldValue('isBanned', true)
      }
      onClose()
    } catch (err) {
      console.log(err)
    } finally {
      setBanLoading(false)
    }
  }

  const handleAction = async (period: any) => {
    try {
      await AdminService.upgradeMembership({
        userId: user.id,
        receipt: period,
      })
      onClose()
      setFieldValue('isVip', true)
    } catch (err) {
    } finally {
    }
  }

  const handleDownGrade = async () => {
    try {
      await AdminService.upgradeMembership({
        userId: user.id,
        receipt: 'expire',
      })
      onClose()
      setFieldValue('isVip', false)
    } catch (err) {
    } finally {
    }
  }

  const {
    lastName,
    firstName,
    gender,
    imageUrl,
    phone,
    email,
    dob,
    country: countryValue,
    isBanned,
    isVip,
  } = formik.values

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFieldTouched(name, true, true)
    formik.setFieldValue(name, value)
  }

  const handleImageChange = async () => {
    const files = inputRef.current?.files

    if (files.length > 0) {
      setFieldValue('filePath', files[0])
      setFieldValue('imageUrl', URL.createObjectURL(files[0]))
    }
  }

  return (
    <div>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent>
          <div className="gap-6 flex flex-row items-center">
            <img
              className="w-[88px] h-[88px] rounded-full"
              src={
                imageUrl ||
                'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
              }
            />
            <div className="flex flex-col">
              <p className="text-[16px] font-DM_Sans font-bold leading-normal tracking-normal text-main-black">
                {'Profile Picture'}
              </p>
              <div className="flex flex-row gap-4">
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={() => handleImageChange()}
                />
                <Button
                  variant="secondry"
                  textClassName="text-text-primary,"
                  className="mt-2 px-6"
                  onClick={() => {
                    inputRef.current.click()
                  }}
                >
                  {'Replace'}
                </Button>
                <Button
                  variant="secondry2"
                  textClassName="text-text-primary,"
                  className="mt-2 px-6"
                  onClick={() => {
                    setFieldValue('imageUrl', '')
                    formik.submitForm()
                  }}
                >
                  {'Remove'}
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Typography variant="subheadBold" className="text-text-grey font-sans">
              {'Phone'}
            </Typography>
            <Input
              value={phone}
              // disabled
              className="rounded-lg py-[2px] px-1 my-2 bg-border-grey font-sans disabled:text-black"
            />
            <Typography variant="subheadBold" className="text-text-grey font-sans">
              {'User uses this phone number to login'}
            </Typography>
          </div>

          <div className="absolute bg-[#f5f7f9] h-[1px] w-full left-0 my-2" />

          <div className="py-2">
            <Typography variant="subheadBold" className="text-text-grey font-sans">
              {'Basics'}
            </Typography>
            <div className="flex flex-row gap-5">
              <Input
                value={lastName}
                onChange={handleInputChange}
                name="lastName"
                className="rounded-lg py-[2px] px-1 my-2 bg-border-grey font-sans"
              />
              <Input
                name="firstName"
                onChange={handleInputChange}
                value={firstName}
                className="rounded-lg py-[2px] px-1 my-2 bg-border-grey font-sans"
              />
            </div>
            <Input
              value={email}
              name="email"
              onChange={handleInputChange}
              className="rounded-lg py-[2px] px-1 my-2 bg-border-grey font-sans"
            />

            <div className="flex gap-5 justify-between pt-2">
              <div className="max-w-[11.875rem] flex flex-row">
                <CustomDatePicker
                  date={dob || 'birthday'}
                  // error={touched.birthDay && errors.birthDay}
                  onChange={(value) => {
                    setFieldValue('dob', dayjs(value).format('YYYY-MM-DD'))
                    setFieldTouched('dob', true)
                  }}
                />
              </div>
              <div className="max-w-[48%] w-full">
                <BasicSelect value={gender} name="gender" items={genderData} onChange={(e) => handleInputChange(e)} />
              </div>
            </div>
            <div className="pt-4 w-full">
              <BasicSelect value={countryValue} name="country" items={country} onChange={(e) => handleInputChange(e)} />
            </div>
          </div>

          <div className="absolute bg-[#f5f7f9] h-[1px] w-full left-0 my-2" />

          <div className="py-6">
            <div className="flex flex-row justify-between">
              <div>
                <Typography variant="subheadBold" className="text-text-grey font-sans pr-2">
                  {'Membership'}
                </Typography>
                <Typography variant="subheadBold" className="text-text-primary font-sans">
                  {`${isVip ? 'VIP' : 'FREE'} User`}
                </Typography>
              </div>
              {isVip && (
                <div>
                  <Typography variant="subheadBold" className="text-text-grey font-sans pr-2">
                    {'Custom/Expires on'}
                  </Typography>
                  <Typography variant="subheadBold" className="text-text-grey font-sans">
                    {dayjs(user?.subscriptions?.[0]?.expiryDate).format('YYYY/MM/DD')}
                  </Typography>
                </div>
              )}
            </div>
            {isVip ? (
              <Button
                variant="secondry"
                textClassName="text-text-primary,"
                className="w-full mt-2"
                onClick={() => setShowDownGradeModal(true)}
              >
                {'Downgrade to Free User'}
              </Button>
            ) : (
              <Button
                variant="secondry"
                textClassName="text-text-primary,"
                className="w-full mt-2"
                onClick={handleDowngrade}
              >
                {'Upgrade to VIP User'}
              </Button>
            )}
          </div>

          <div className="absolute bg-[#f5f7f9] h-[1px] w-full left-0" />

          <div className="py-4 flex flex-row justify-between items-center">
            <div className="gap-5">
              <Typography variant="subheadBold" className="text-text-grey font-sans pr-2">
                {'Account Status'}
              </Typography>

              {isBanned ? (
                <Typography variant="subheadBold" className="text-text-red font-sans">
                  Deactive
                </Typography>
              ) : (
                <Typography variant="subheadBold" className="text-text-green font-sans">
                  Active
                </Typography>
              )}
            </div>
            <div className="gap-2 flex flex-row whitespace-nowrap">
              <Button
                variant="action"
                textClassName="text-text-red text-[13px]"
                className="w-full bg-opacity-10 h-[30] px-4"
                loading={banLoading}
                onClick={handleBanUser}
              >
                {isBanned ? 'Unban User' : 'Ban User'}
              </Button>
              <Button
                variant="action"
                textClassName="text-text-red text-[13px]"
                className="w-full bg-opacity-10 h-[30] px-4"
                onClick={handleClose}
              >
                {'Delete User'}
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
            onClick={formik.submitForm}
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
        <ConfirmationModal
          open={showDownGradeModal}
          onAccept={handleDownGrade}
          setOpen={setShowDownGradeModal}
          contentText={`Are you sure you want to downgrade this user?`}
          acceptText={'Yes'}
          cancelText={`No, don’t downgrade user`}
        />
      </BootstrapDialog>
    </div>
  )
}
