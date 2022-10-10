import { BasicSelect, Button, CustomDatePicker, Input, ProfilePicture, SingleSelect } from 'components'
import React, { useRef, useState } from 'react'
import { Typography } from '@mui/material'
import Link from 'next/link'
import { useFormik } from 'formik'
import { getBase64 } from 'utils/helper'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ApiErrorResponse } from 'services/api'
import { updateProfileSchema } from 'utils/schema'
import { useAuth } from 'Contexts/Auth'
import dayjs from 'dayjs'

type FormValues = {
  firstName: string
  lastName: string
  birthDay: string
  gender: string
  isPublic: boolean
  imageURL: string
}

const Step4: React.FC = (): React.ReactElement => {
  const { user } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const formik = useFormik<FormValues>({
    initialValues: {
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      birthDay: user?.date_of_birth || '',
      gender: user?.gender,
      isPublic: user?.public || false,
      imageURL: user?.photo || '',
    },
    validationSchema: updateProfileSchema,
    onSubmit: async ({ lastName, firstName, birthDay, isPublic, imageURL, gender }) => {
      setLoading(true)
      try {
        await axios.post('/api/user/update', {
          last_name: lastName,
          first_name: firstName,
          date_of_birth: birthDay,
          public: isPublic,
          photo: imageURL,
          gender,
        })
        router.push('/dashboard')
      } catch (e) {
        if (e instanceof ApiErrorResponse) {
          if (e.statusCode === 401) {
            // navigateTo('/login')
          }
        }
      } finally {
        setLoading(false)
      }
    },
  })

  const { setFieldTouched, setFieldValue, errors, touched } = formik

  const { firstName, lastName, birthDay, gender, isPublic, imageURL } = formik.values

  const handleImageChange = async () => {
    const files = inputRef.current?.files

    if (files.length > 0) {
      const file = await getBase64(files[0])
      setFieldValue('imageURL', file)
    }
  }

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
    <div className="flex max-w-[520px] h-screen overflow-y-auto mx-auto px-[26px] x:px-[28px] w-full flex-col gap-[107px] justify-between pb-[28px] relative">
      <div className="w-full x:w-[447px] mx-auto flex-col">
        <div className="flex mt-[28px] x:mt-[110px] flex-col gap-[12px] mb-[28px] x:mb-[50.5px]">
          <Typography variant="heading7" className="text-center x:text-left">
            Tell us more about yourself
          </Typography>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            formik.submitForm()
          }}
        >
          <div className="w-full mx-auto  flex flex-col">
            <div className="flex gap-[19px] items-center">
              <ProfilePicture url={imageURL} />
              <div className="flex flex-col gap-1.5">
                <Typography variant="bodyBold">Profile Picture</Typography>
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={() => handleImageChange()}
                />
                <Button
                  onClick={() => {
                    inputRef.current.click()
                  }}
                  type="button"
                  variant="ghost"
                  disableRipple
                  className="w-[9.375rem]"
                  textClassName="text-border-blue"
                >
                  Upload Picture
                </Button>
              </div>
            </div>

            <div className="flex flex-col mt-[30px]">
              <div className="flex flex-col gap-5">
                <Typography variant="subheadBold" className="text-primary-grey">
                  Basics
                </Typography>
                <Input
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  value={firstName}
                  helperText={touched.firstName && errors.firstName}
                  status={touched.firstName && errors.firstName ? 'error' : 'primary'}
                  onChange={handleInputChange}
                  className="rounded-[22px] py-[2px] px-3 bg-border-grey"
                />
                <Input
                  value={lastName}
                  name="lastName"
                  placeholder="Last Name"
                  type="text"
                  helperText={touched.lastName && errors.lastName}
                  status={touched.lastName && errors.lastName ? 'error' : 'primary'}
                  onChange={handleInputChange}
                  className="rounded-[22px] py-[2px] px-3 bg-border-grey"
                />
                <div className="flex gap-5  justify-between">
                  <div className="max-w-[48%] w-full">
                    <CustomDatePicker
                      error={touched.birthDay && errors.birthDay}
                      date={birthDay}
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
              <div className="flex flex-col gap-5 mt-[30px]">
                <Typography variant="subheadBold" className="text-primary-grey">
                  Profile Type
                </Typography>
                <div className="flex gap-5 justify-between">
                  <SingleSelect
                    className="max-w-[214px]"
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
                    className="max-w-[214px]"
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
                  type="submit"
                  loading={loading}
                  disabled={loading}
                  variant="fill"
                  onClick={formik.submitForm}
                  textClassName="text-white"
                  disableRipple
                >
                  Finish
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className=" flex-col items-center self-end justify-start hidden x:flex">
        <div className="flex items-center gap-3">
          <Link href="/landing/terms">
            <a>
              <Typography className="leading-[1.88] font-semibold text-black" variant="body2">
                Terms of service
              </Typography>
            </a>
          </Link>
          <Typography className="leading-[1.88] font-semibold text-black" variant="body2">
            •
          </Typography>
          <Link href="/landing/terms">
            <a>
              <Typography className="leading-[1.88] font-semibold text-black" variant="body2">
                Privacy Policy
              </Typography>
            </a>
          </Link>
        </div>
        <Typography className="leading-[2] text-black" variant="body2">
          © Move, Inc. All rights reserved.
        </Typography>
      </div>
    </div>
  )
}

export default Step4
