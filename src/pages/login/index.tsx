import type { NextPage } from 'next'
import { Button, MainLayout, Input } from 'components'
import React from 'react'
import { Typography } from '@mui/material'

const Home: NextPage = (): React.ReactElement => {
  return (
    <MainLayout withNavBar={false} footer={false}>
      <div className="flex justify-center items-center h-full">
        <div className="w-[400px] flex flex-col justify-center gap-[43px]">
          <Typography className="text-center" variant="heading1">
            Welcome!
          </Typography>
          <div className="flex flex-col gap-4">
            <Input placeholder="Enter Phone Number" />
            <Button className="bg-secondary-light-blue rounded-[22px]" variant="fill">
              <Typography className="text-white" variant="label1" fontFamily="Brown Bold">
                Login
              </Typography>
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[40%] h-[1px] bg-primary-transparent" />
            <Typography className="text-primary-grey">or</Typography>
            <div className="w-[40%] h-[1px] bg-primary-transparent" />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <Button className="p-0" variant="text">
                <Typography className="text-primary-black" variant="body">
                  Don’t have an account?
                </Typography>
              </Button>
            </div>
            <Button className="bg-fill-orange rounded-[22px]" variant="fill">
              <Typography className="text-white" variant="label1" fontFamily="Brown Bold">
                Sign Up
              </Typography>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
