import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import React, { forwardRef, useState } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type ImageProps = React.HTMLProps<ImageProps>

const calendarIcon = forwardRef<HTMLImageElement, ImageProps>((props, ref) => (
  <img {...props} ref={ref} src="/assets/svg/calendar.svg" alt="calendar icon" className="w-[20px] h-[10px]" />
))

export const CustomDatePicker = () => {
  const [value, setValue] = useState<Dayjs | null>(null)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        openTo="year"
        views={['year', 'month', 'day']}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        components={{
          OpenPickerIcon: calendarIcon,
        }}
        disableFuture
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <div className="rounded-[22px] bg-border-grey flex items-center px-6 w-full justify-between relative border border-[rgba(127,127,127, 0.1)]">
            <input
              ref={inputRef}
              {...inputProps}
              placeholder="Birthday"
              readOnly
              style={{ fontSize: '14px', fontWeight: 500 }}
              className="rounded-[22px] py-[11.5px] bg-transparent border-none focus:outline-none"
            />
            <div className="absolute right-6">{InputProps?.endAdornment}</div>
          </div>
        )}
      />
    </LocalizationProvider>
  )
}
