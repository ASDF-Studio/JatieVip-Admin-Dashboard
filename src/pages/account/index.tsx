import type { NextPage } from 'next'
import { Button, Input, MainLayout, CustomDatePicker, SingleSelect, BasicSelect } from 'components'
import { Avatar, Typography } from '@mui/material'
import { WorkHistoryOutlined } from '@mui/icons-material'
import { useState } from 'react'

const Home: NextPage = () => {
  const [selected, setSelected] = useState<string>('public')

  return (
    <MainLayout className="pt-[66px]" stickyFooter>
      <div className="max-w-[400px] mx-auto mt-[1.875rem] flex flex-col">
        <div className="text-center">
          <Typography variant="heading1">Your profile</Typography>
        </div>
        <div className="flex gap-[19px] items-center mt-[1.875rem]">
          <Avatar className="w-[88px] h-[88px]" />
          <div className="flex flex-col gap-1.5">
            <Typography variant="bodyBold">Profile Picture</Typography>
            <Button
              variant="fill"
              className="bg-text-blue/20 shadow-none w-[9.375rem]"
              textClassName="text-border-blue"
            >
              Upload Picture
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-5 mt-[4.063rem]">
          <Typography variant="subheadBold" className="text-primary-grey">
            Basics
          </Typography>
          <Input placeholder="First Name" className="rounded-[22px] py-[2px] px-3 bg-border-grey" />
          <Input placeholder="Last Name" className="rounded-[22px] py-[2px] px-3 bg-border-grey" />
          <div className="flex gap-5 justify-between">
            <div className="max-w-[11.875rem]">
              <CustomDatePicker />
            </div>
            <div className="max-w-[11.875rem]">
              <BasicSelect />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 mt-[3.75rem]">
          <Typography variant="subheadBold" className="text-primary-grey">
            Profile Type
          </Typography>
          <div className="flex gap-5 justify-between">
            <SingleSelect
              selected={selected === 'public'}
              icon={
                <div className="flex justify-center items-center w-[20px] h-[20px]  bg-border-blue rounded-full">
                  <div className="bg-white w-[10px] h-[10px] rounded-full">
                    <img src="/assets/svg/earth-americas.svg" className="w-[10px] h-[10px]" alt="world icon" />
                  </div>
                </div>
              }
              text="Public"
              name="public"
              onClick={setSelected}
            />
            <SingleSelect
              name="private"
              selected={selected === 'private'}
              icon={
                <div className="flex justify-center items-center w-[20px] h-[20px]  bg-border-blue rounded-full">
                  <img src="/assets/svg/lock.svg" className="w-2.5 h-2.5" alt="lock icon" />
                </div>
              }
              text="Private"
              onClick={setSelected}
            />
          </div>
          <Button variant="fill" textClassName="text-white">
            Save
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
