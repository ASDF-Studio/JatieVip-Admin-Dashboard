import { Typography } from '@mui/material'
import { Card } from 'components'
import React from 'react'

const Hero: React.FC = (): React.ReactElement => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-screen-move-landing mx-auto">
        <div className="flex flex-col gap-[1.463rem]">
          <div className="flex flex-col items-center gap-[0.225rem] justify-center">
            <Typography
              style={{ fontSize: '1.125rem' }}
              textTransform="uppercase"
              className="text-black/60 font-medium tracking-[0.141rem] leading-10 "
            >
              Why you will love Move
            </Typography>
            <Typography
              style={{ fontSize: '2.531rem' }}
              className="text-fill-landingBlack font-bold tracking-[0px] leading-[45px]"
            >
              Move 👊 with <span className="text-[#86949F]">Friends</span>
            </Typography>
          </div>
          <div className="flex justify-center">
            <Typography
              style={{ fontSize: '1.125rem' }}
              className="w-[44.375rem] leading-[1.625rem] tracking-[0px] font-semibold text-fill-landingBlack"
              textAlign="center"
            >
              Move with friends - allows you to add and connect with friends, follow along with their workouts and
              progress, and share how you Move with others.
            </Typography>
          </div>
        </div>
        <div className="flex gap-[2.875rem] mt-[3.813rem]">
          <Card
            icon={<img src="/assets/svg/person-running.svg" alt='person running icon' className='w-[1.875rem] h-[1.875rem]'/>}
            title="Workout with Friends"
            desc="Send and receive messages to hype up your friends when they finish a workout "
          />
          <Card
          icon={<img src="/assets/svg/group-arrows-rotate.svg" alt='person running icon' className='w-[1.875rem] h-[1.875rem]'/>}
            title="Workout with Friends"
            desc="Send and receive messages to hype up your friends when they finish a workout "
          />
          <Card
          
          icon={<img src="/assets/svg/share-nodes.svg" alt='person running icon' className='w-[1.875rem] h-[1.875rem]'/>}
            title="Workout with Friends"
            desc="Send and receive messages to hype up your friends when they finish a workout "
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
