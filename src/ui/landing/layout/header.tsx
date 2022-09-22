import { IconButton } from '@mui/material'
import { Button, BarIcon } from 'components'
import Link from 'next/link'

export const LandingHeader = () => {
  return (
    <div className="fixed h-[60px] w-full border-b border-white/30 z-30 flex items-center justify-between pl-5 pr-[26px] xl:hidden  backdrop-blur-[22px]">
      <Link href="/">
        <a>
          <img src="/assets/logos/move-white.svg" alt="move logo" className="max-w-[122px]" />
        </a>
      </Link>

      <div className="flex gap-5">
        <Button variant="fill" textClassName="text-white" className="px-[30px]">
          Get Started
        </Button>
        <IconButton disableRipple className="p-0">
          <BarIcon className="w-[22px]" fill="white" />
        </IconButton>
      </div>
    </div>
  )
}
