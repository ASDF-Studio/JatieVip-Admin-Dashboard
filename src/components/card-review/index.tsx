import { Typography } from '@mui/material'

type Props = {
  icons: any
  title?: string
  desc?: string
  className: string
  authorName?: string
}

export const CardReview: React.FC<Props> = ({ icons, title, desc, className = '', authorName }) => {
  return (
    <div
      className={`flex flex-col w-full gap-[7px] items-start max-w-[360px] sm:max-w-[200px] xl:max-w-[280px] x:max-w-[280px] ${className}`}
    >
      <div className="flex flex-col gap-[16px] items-start">
        <div className="flex flex-row gap-[5px]">
          {icons.map((icon: any) => {
            return icon
          })}
        </div>
        <Typography variant="title4" className="leading-[1.4]">
          {title}
        </Typography>
      </div>

      <Typography
        variant="desc"
        className="leading-[1.47] tracking-[0.25px] text-[#191b1c]/70  font-medium 
        text-start sm:w-[350px] x:w-[600px]"
      >
        {desc}
      </Typography>
      <Typography
        variant="bodyBold"
        className="leading-[1.47] italic font-semibold tracking-[0.25px] text-[#191b1c]/100 
        text-start"
      >
        {authorName}
      </Typography>
    </div>
  )
}
