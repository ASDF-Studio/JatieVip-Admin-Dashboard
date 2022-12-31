import { Typography } from '@mui/material'
import { Title, Heading1, Card } from 'components'
import { CardReview } from 'components/card-review'

export const Reviews: React.FC = (): React.ReactElement => {
  return (
    <div id="habit-tracking" className="relative flex bg-white">
      <div className="xl:max-w-[302px]  w-full hidden xl:flex" />
      <div className="max-w-[420px] mt-[52px] sm:mt-[115px] x:mt-[84px] w-full mx-auto relative sm:max-w-[768px] x:max-w-[1024px] x:px-[61.3px] xl:px-0 xl:max-w-[900px]  2xl:max-w-[995px] ">
        <div className="flex flex-col px-[30px] sm:pl-[41.5px] sm:pr-[39px] x:pr-0 x:pl-0 w-full x:mx-auto">
          <div className="flex flex-col gap-[2px]">
            <Title className="text-center sm:text-left text-[#191b1c]/60">Customer Reviews</Title>
            <Heading1 className="text-center sm:text-left text-[#191b1c] sm:max-w-[515px]">
              <span className="text-[#86949F]">Don’t just take our words </span>
              Our users ❤️ love us
            </Heading1>
          </div>
          {/* <Typography
            variant="body3"
            className="text-center sm:text-left mt-[9px] sm:mt-[23px] x:mt-[19px] sm:max-w-[624px]"
          >
            Our Habit Tracker feature - designed to assist you in building and maintaining healthy habits to keep your
            goals the top priority.
          </Typography> */}
        </div>
        <div
          className="flex flex-wrap gap-x-[43.5px] sm:gap-x-[23px] x:gap-x-[23px] 2xl:gap-x-[23px] 
          mt-[45.5px] sm:mt-[40px] px-[30px] sm:px-0 sm:pl-[41.5px] sm:pr-[39px] x:pr-0 x:pl-0 
          gap-y-[30px] x:mt-[72px] 2xl:mt-[61px]"
        >
          <div className="order-1 sm:order-1">
            <img
              src="/assets/landing/reviews/customer-rev-@3x.webp"
              alt=""
              // className="max-w-[248px] -top-[135px] left-[125px] sm:max-w-[355px] sm:-top-[215px] sm:left-[285px] absolute ms:-top-[130px] ms:left-[135px] x:-top-[205px] x:left-[415px]  xl:left-[285px] 2xl:left-[345px] 5xl:left-[390px]"
              className="max-w-[380px] max-h-[274px] m-0"
            />
          </div>

          <CardReview
            className="order-2 sm:order-2"
            icons={[
              <img src="/assets/landing/reviews/star@3x.webp" alt="star icon" className="w-[25px] h-[25px]" />,
              <img src="/assets/landing/reviews/star@3x.webp" alt="star icon" className="w-[25px] h-[25px]" />,
              <img src="/assets/landing/reviews/star@3x.webp" alt="star icon" className="w-[25px] h-[25px]" />,
              <img src="/assets/landing/reviews/star@3x.webp" alt="star icon" className="w-[25px] h-[25px]" />,
              <img src="/assets/landing/reviews/star@3x.webp" alt="star icon" className="w-[25px] h-[25px]" />,
            ]}
            title="I saw INCREDIBLE results"
            desc="I started following Katie and Josh workout videos on YouTube after I 
              had my first 2 kids. Within 3 months I saw INCREDIBLE results. 
              I started looking better and most importantly FEELING better!!! 
              Working out isn't just for physical health, it's also for mental health. 
              Since then, I had a 3rd baby and knew just who to go to if I wanted to get 
              my body and mind back!
              Now that Josh and Katie have made the move app I can have a whole variety 
              of workouts to chose from to reach my fitness goals. The app is affordable, 
              easy to navigate, and IT WORKS!!! I will never go back to another workout program"
            authorName="Anna Hauger"
          />
        </div>
      </div>
    </div>
  )
}
