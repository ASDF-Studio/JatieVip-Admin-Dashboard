import { Button, Input, CustomDatePicker, SingleSelect, BasicSelect, ProfilePicture } from 'components'
import { Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useAuth } from 'Contexts/Auth'
import { useFormik } from 'formik'
import { getBase64 } from 'utils/helper'
import axios, { AxiosError } from 'axios'
import { updateProfileSchema } from 'utils/schema'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'

type FormValues = {
  firstName: string
  lastName: string
  phoneNumber: string
  birthDay: string
  gender: string
  isPublic: boolean
  imageURL: string
}

export const Profile = () => {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      phoneNumber: user?.phone_number || '',
      birthDay: user?.date_of_birth || '',
      gender: user?.gender || 'male',
      isPublic: user?.public,
      imageURL: user?.photo || '',
    },
    validationSchema: updateProfileSchema,
    onSubmit: async ({ firstName, lastName, birthDay, gender, isPublic, imageURL }) => {
      setLoading(true)
      try {
        const res = await axios.post('/api/user/update', {
          last_name: lastName,
          first_name: firstName,
          date_of_birth: birthDay,
          public: isPublic,
          photo: imageURL,
          gender,
        })

        updateUser(res.data)
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response.status === 401) {
            console.log(e)
            router.push('/login')
          } else if (e.response.status === 500) {
            router.push('/500')
          } else {
            console.log(e)
          }
        }
      } finally {
        setLoading(false)
      }
    },
  })

  const handleImageChange = async () => {
    const files = inputRef.current?.files

    if (files.length > 0) {
      const file = await getBase64(files[0])
      setFieldValue('imageURL', file)
    }
  }

  const { setFieldTouched, touched, errors, setFieldValue } = formik

  const { firstName, lastName, phoneNumber, birthDay, gender, isPublic, imageURL } = formik.values

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFieldTouched(name, true, true)
    formik.setFieldValue(name, value)
  }

  const items = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer', label: 'Prefer not to say' },
  ]

  return (
    <div className="max-w-[400px] mx-auto mt-[1.938rem] mb-[3.25rem] flex flex-col">
      <div className="text-center">
        <Typography variant="heading1">Your profile</Typography>
      </div>
      <div className="flex gap-[19px] items-center mt-[1.875rem]">
        <ProfilePicture url={imageURL} />

        <div className="flex flex-col gap-1.5">
          <Typography variant="bodyBold">Profile Picture</Typography>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={(e) => handleImageChange(e)}
          />
          <Button
            onClick={() => {
              inputRef.current.click()
            }}
            variant="secondry"
            disableRipple
            className="w-[9.375rem]"
            textClassName="text-border-blue"
          >
            Upload Picture
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-[2.625rem] mt-[2.5rem]">
        <div className="flex flex-col gap-2">
          <Input
            placeholder={phoneNumber}
            name="phoneNumber"
            readOnly
            label="Phone"
            className="rounded-[22px] py-[2px] px-3 bg-border-grey"
          />
          <Typography className="text-primary-grey" variant="body2">
            You use this phone number to login to your account
          </Typography>
        </div>
        <div className="flex flex-col gap-5">
          <Typography variant="subheadBold" className="text-primary-grey">
            Basics
          </Typography>
          <Input
            placeholder="First Name"
            name="firstName"
            helperText={touched.firstName && errors.firstName}
            status={touched.firstName && errors.firstName ? 'error' : 'primary'}
            value={firstName}
            onChange={handleInputChange}
            className="rounded-[22px] py-[2px] px-3 bg-border-grey"
          />
          <Input
            helperText={touched.lastName && errors.lastName}
            status={touched.lastName && errors.lastName ? 'error' : ''}
            value={lastName}
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
            className="rounded-[22px] py-[2px] px-3 bg-border-grey"
          />
          <div className="flex gap-5 justify-between">
            <div className="max-w-[11.875rem]">
              <CustomDatePicker
                date={birthDay}
                error={touched.birthDay && errors.birthDay}
                onChange={(value) => {
                  setFieldValue('birthDay', dayjs(value).format('YYYY-MM-DD'))
                  setFieldTouched('birthDay', true)
                }}
              />
            </div>
            <div className="max-w-[48%] w-full">
              <BasicSelect value={gender} name="gender" items={items} onChange={(e) => handleInputChange(e)} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-[60px]">
          <Typography variant="subheadBold" className="text-primary-grey">
            Profile Type
          </Typography>
          <div className="flex gap-5 justify-between">
            <SingleSelect
              selected={isPublic}
              icon={
                <div className="flex justify-center items-center w-[20px] h-[20px]  bg-border-blue rounded-full">
                  <div className="bg-white w-[10px] h-[10px] rounded-full">
                    <img src="/assets/svg/earth-americas.svg" className="w-[10px] h-[10px]" alt="world icon" />
                  </div>
                </div>
              }
              text="Public"
              onClick={() => setFieldValue('isPublic', true)}
            />
            <SingleSelect
              selected={!isPublic}
              icon={
                <div className="flex justify-center items-center w-[20px] h-[20px]  bg-border-blue rounded-full">
                  <img src="/assets/svg/lock.svg" className="w-2.5 h-2.5" alt="lock icon" />
                </div>
              }
              text="Private"
              onClick={() => setFieldValue('isPublic', false)}
            />
          </div>
          <Button
            loading={loading}
            disabled={loading}
            variant="fill"
            onClick={formik.submitForm}
            textClassName="text-white"
            disableRipple
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
