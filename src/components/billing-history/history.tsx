import { Typography } from '@mui/material'
import { Button } from 'components/Button'
import { FC } from 'react'

type Props = {
  title?: string
  desc?: string
}

export const History: FC<Props> = ({}): React.ReactElement => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex flex-col">
        <Typography variant="bodyBold">Aug 14 2022</Typography>
        <Typography variant="bodyBold" className="text-primary-grey">
          Total including tax $18.00
        </Typography>
      </div>
      <Button disableRipple variant="text">
        View Invoice
      </Button>
    </div>
  )
}
