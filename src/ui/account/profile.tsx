import { Button, Input, CustomDatePicker, SingleSelect, BasicSelect, ProfilePicture } from 'components'
import { Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { useAuth } from 'Contexts/Auth'
import { useFormik } from 'formik'
import axios, { AxiosError } from 'axios'
import { updateProfileSchema } from 'utils/schema'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { builtinDecode, getDimenstionSquare, imageToWebp, resize } from 'utils/image'
import { arrayBufferToBase64 } from 'utils/helper'

type FormValues = {
  firstName: string
  lastName: string
  phoneNumber: string
  birthDay: string
  gender: string
  imageURL: string | null
}

export const Profile = () => {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [remLoading, setRemLoading] = useState(false)
  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: {
      firstName: user?.fullName.split(" ")[1] || '',
      lastName: user?.fullName.split(" ")[0] || '',
      phoneNumber: user?.contact || '',
      birthDay: user?.dob || '',
      gender: user?.gender || 'male',
      imageURL: user?.profilePic || null,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async ({ firstName, lastName, birthDay, gender,  imageURL }) => {
      setLoading(true)
      try {
        const res = await axios.post('/api/user/update', {
          last_name: lastName,
          first_name: firstName,
          date_of_birth: birthDay,
          photo: imageURL,
          gender,
        })
        updateUser(res.data)
      } catch (e) {
        if (e instanceof AxiosError) {
          if (e.response.status === 401) {
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

  console.log(user)

  const handleImageChange = async () => {
    const files = inputRef.current?.files
    const resizedImage = {
      buffer: null,
      size: 0,
    }

    if (files.length > 0) {
      const imageData = await builtinDecode(files[0])
      const dimension = getDimenstionSquare(imageData.width, imageData.height)

      const response = await resize(imageData, {
        height: dimension.height,
        width: dimension.width,
        fitMethod: 'stretch',
        linearRGB: true,
        method: 'lanczos3',
        premultiply: true,
      })
      const image = await imageToWebp(response, true)
      resizedImage.buffer = image.image
      resizedImage.size = image.size
      const compressedImage = arrayBufferToBase64(resizedImage.buffer)
      setFieldValue('imageURL', `data:image/webp;base64, ${compressedImage}`)
    }
  }

  const { setFieldTouched, touched, errors, setFieldValue } = formik

  const { firstName, lastName, phoneNumber, birthDay, gender, imageURL } = formik.values

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

        <div className="flex flex-col gap-1.5 w-full">
          <Typography variant="bodyBold">Profile Picture</Typography>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={() => handleImageChange()}
          />
          <div className="flex gap-2.5 w-full">
            <Button
              onClick={() => {
                inputRef.current.click()
              }}
              variant="secondry"
              disableRipple
              className="max-w-[120px] w-full"
              textClassName="text-border-blue"
            >
              Replace
            </Button>
            {user.photo && (
              <Button
                onClick={async () => {
                  setRemLoading(true)
                  const res = await axios.post('/api/user/update', {
                    photo: null,
                  })
                  updateUser(res.data)
                  setRemLoading(false)
                }}
                variant="ghost"
                disableRipple
                loading={remLoading}
                className="max-w-[120px] w-full"
                textClassName="text-border-blue"
              >
                Remove
              </Button>
            )}
          </div>
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
