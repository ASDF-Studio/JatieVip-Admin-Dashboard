import { Typography } from '@mui/material'

type Props = {
  icon: any
  title: string
  desc: string
}

export const Card: React.FC<Props> = ({ icon, title, desc }) => {
  return (
    <div className="flex flex-col w-full gap-[7px] max-w-[17.5rem]">
      <div className="flex flex-col gap-[16px]">
        {icon}
        <Typography variant="title4" className="leading-[1.75rem]">
          {title}
        </Typography>
      </div>

      <Typography variant="desc" className="leading-[22px] tracking-[0.25px] text-[rgba(25,27,28,1)] font-medium">
        {desc}
      </Typography>
    </div>
  )
}
