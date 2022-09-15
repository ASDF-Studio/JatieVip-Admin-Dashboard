import { Typography } from '@mui/material'
import { Card } from 'components'
import React from 'react'

const Hero2: React.FC = (): React.ReactElement => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="max-w-screen-move-landing mx-auto w-full">
        <div className="flex flex-col gap-[1.463rem]">
          <div className="flex flex-col items-start gap-[0.225rem] justify-center">
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
                <span className="text-[#86949F]">Stay on track with</span> <br/>

                 Habit <span style={{fontSize: "2.5rem"}} className='leading-[3.375rem]'>✌️</span> Tracker
              
            </Typography>
          </div>
          <div className="flex justify-start">
            <Typography
              style={{ fontSize: '1.125rem' }}
              className="w-[44.375rem] leading-[1.625rem] tracking-[0px] font-semibold text-fill-landingBlack"
              textAlign="left"
            >
              Our Habit Tracker feature - designed to assist you in building and maintaining healthy habits to keep your goals the top priority.
            </Typography>
          </div>
        </div>
        <div className="flex gap-[2.875rem] mt-[3.813rem]">
          <Card
            icon={<img src="/assets/svg/bell-on.svg" alt='person running icon' className='w-[1.875rem] h-[1.875rem]'/>}
            title="Create Personalized Habits"
            desc="Keep yourself accountable by adding daily reminders to your tracker"
          />
          <Card
          icon={<img src="/assets/svg/badge-check.svg" alt='person running icon' className='w-[1.875rem] h-[1.875rem]'/>}
            title="Accomplishment Badges"
            desc="Gamify your life with winnable virtual badges to remind yourself of your accomplishments"
          />
          <Card
          
          icon={<img src="/assets/svg/gauge-high.svg" alt='person running icon' className='w-[1.875rem] h-[1.875rem]'/>}
            title="Habit Streak"
            desc="See how long you can keep the streak by hitting your goals and checking them off daily"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero2
