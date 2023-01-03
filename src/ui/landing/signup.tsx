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
          <Heading1 className="text-center text-white ">Sign up for Deals and Discounts</Heading1>
        </div>
      </div>
      <Button
        variant="ghost"
        className="bg-[#d663d5] text-white shadow-glassShadow 
        w-[368px] pt-[11px] pb-[10px] mt-[20px]"
      >
        <Typography onClick={() => navigateTo('/signup')} variant="bodyBold">
          Subscribe to our Newsletter
        </Typography>
      </Button>

      <img
        src="/assets/landing/signup/signup-2@3x.webp"
        alt=""
        className="max-w-[532px] max-h-[300px] sm:max-w-[710px] sm:max-h-[400px] xl:max-w-[1035px] xl:max-h-[583px] "
      />
    </div>
  )
}
