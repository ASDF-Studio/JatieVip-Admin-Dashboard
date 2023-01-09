import { Typography } from '@mui/material'
import { Title, Heading1, Button } from 'components'
import { useNavigate } from 'hooks/UseRouter'

export const Signup: React.FC = (): React.ReactElement => {
  const { navigateTo } = useNavigate()

  return (
    <div
      className="flex flex-col relative bg-[url('/assets/landing/signup/signup.svg')] 
      bg-cover bg-no-repeat z-30 pt-[100px] pb-[50px] items-center"
    >
      <div className="flex flex-col">
        <div className="flex flex-col gap-[2px] items-center">
          <Title className="text-center text-white/60">Subscribe to our newsletter</Title>
          <div className="relative">
            <Heading1 className="text-center text-white">Sign up for Deals and Discounts</Heading1>
            <img
              src="/assets/landing/path.svg"
              className="w-[145px] h-[49px] absolute -bottom-1 -z-10 -right-1 object-cover 
              sm:w-[200px] sm:h-[49px] sm:-bottom-1 x:w-[200px] x:h-[49px]"
              alt=""
            />
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        className="bg-[#d663d5] text-white shadow-glassShadow 
        w-[300px] sm:w-[330px] h-[44px] mt-[20px]"
      >
        <Typography onClick={() => navigateTo('https://web.movefit.com')} variant="bodyBold">
          Subscribe to our Newsletter
        </Typography>
      </Button>

      <img
        src="/assets/landing/signup/signup-2@3x.webp"
        alt=""
        className="max-w-[532px] max-h-[200px] sm:max-w-[710px] sm:max-h-[400px] xl:max-w-[1035px] 
        xl:max-h-[583px] "
      />
    </div>
  )
}
