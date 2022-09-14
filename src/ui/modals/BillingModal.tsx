import { Input, ModalBase, AutoComplete } from 'components'
import { Typography } from '@mui/material'
import React from 'react'
import { countries } from '../../constants'



type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const BillingModal: React.FC<Props> = ({ open = false, setOpen }): React.ReactElement => {
  return (
    <ModalBase title="Billing Address" open={open} buttonText="Update Billing Address" setOpen={setOpen}>
      <div className="flex flex-col gap-6 mt-[1.75rem] mb-5">
        <Input placeholder="First Name" className="rounded-[22px] py-[2px] px-3 bg-border-grey" label="Name" />
        <Input
          placeholder="Billing Email"
          className="rounded-[22px] py-[2px] px-3 bg-border-grey"
          label="Billing Email"
        />
        <Input placeholder="Address" className="rounded-[22px] py-[2px] px-3 bg-border-grey" label="Address" />
        <Input placeholder="City" className="rounded-[22px] py-[2px] px-3 bg-border-grey" label="City" />
        <div className="flex gap-5">
          <Input
            placeholder="First Name"
            className="rounded-[22px] py-[2px] px-3 bg-border-grey"
            label="State or Province (Optional)"
          />
          <Input
            placeholder="First Name"
            className="rounded-[22px] py-[2px] px-3 bg-border-grey"
            label="ZIP or Postal Code"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="subheadBold" className="text-primary-grey">
            Country
          </Typography>
          <AutoComplete data={countries} />
        </div>
      </div>
    </ModalBase>
  )
}
