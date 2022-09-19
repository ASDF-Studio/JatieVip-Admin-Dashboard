import { Typography } from '@mui/material'

export const Title = ({ className, children }) => {
  return (
    <Typography
      textTransform="uppercase"
      variant="title3"
      className={`leading-[3] sm:leading-[2.67] tracking-[2px] sm:tracking-[2.25px] ${className}`}
    >
      {children}
    </Typography>
  )
}

type HeaderProps = {
  className?: string
  children?: React.ReactNode
}

export const Heading: React.FC<HeaderProps> = ({ className = '', children }) => {
  return (
    <Typography className={className} variant="heading5">
      {children}
    </Typography>
  )
}

type Header1 = {
  className?: string
  children?: React.ReactNode
}

export const Heading1: React.FC<Header1> = ({ className = '', children }) => {
  return (
    <Typography className={`${className} leading-[1.33] sm:leading-[1.11]`} variant="heading6">
      {children}
    </Typography>
  )
}

export const AppleTypo: React.FC<Header1> = ({ className = '', children }) => {
  return (
    <Typography className={`${className} leading-[1.17] font-semibold`} fontSize="24px">
      {children}
    </Typography>
  )
}
