import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React, { forwardRef } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type ImageProps = React.HTMLProps<ImageProps>

const calendarIcon = forwardRef<HTMLImageElement, ImageProps>((props, ref) => (
  <img {...props} ref={ref} src="/assets/svg/calendar.svg" alt="calendar icon" className="w-[20px] h-[10px]" />
))

type Props = {
  date: string
  onChange: (value: string) => void
}

export const CustomDatePicker: React.FC<Props> = ({ date = '', onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        openTo="year"
        views={['year', 'month', 'day']}
        value={date}
        onChange={(newValue) => {
          onChange(newValue)
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
