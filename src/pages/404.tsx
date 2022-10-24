import { Typography } from '@mui/material'
import { Button, CloudExclamtionIcon } from 'components'
import Head from 'next/head'
import Link from 'next/link'

const FourOhFour = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Head>
        <title>Not Found</title>
      </Head>
      <div className="h-[66px] flex justify-center items-center border-b border-b-[#f5f7f9]">
        <Link href="/landing">
          <a>
            <img src="/assets/logos/logo.svg" alt="move logo" className="max-w-[122px]" />
          </a>
        </Link>
      </div>
      <div className="flex flex-col justify-center grow items-center gap-[26px] mb-[134px]">
        <CloudExclamtionIcon className="w-[133px] h-[105px]" fill="#879297" />
        <div className="flex flex-col gap-[5px] items-center">
          <Typography className="text-[80px] font-semibold leading-[1.2]">404</Typography>
          <Typography className="text-[22px] font-semibold leading-normal max-w-[280px] text-center">
            The page you were looking for does not exist
          </Typography>
        </div>
        <Link href="/">
          <a>
            <Button variant="fill" textClassName="text-white" className="w-[200px] shadow-buttonShadow2">
              Go to Home
            </Button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default FourOhFour
