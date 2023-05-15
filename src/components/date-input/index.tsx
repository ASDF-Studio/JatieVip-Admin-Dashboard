import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React, { forwardRef } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type ImageProps = React.HTMLProps<ImageProps>

const calendarIcon = forwardRef<HTMLImageElement, ImageProps>((props, ref) => (
  <img {...props} ref={ref} src="/assets/svg/calendar.svg" alt="calendar icon" className="w-[20px] h-[10px]" />
))

const switchPickerIcon = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  return <img {...props} ref={ref} src="/assets/svg/sort.svg" alt="calendar icon" className="w-[20px] h-[10px]" />
})

type Props = {
  date: string
  onChange: (value: string) => void
  error?: boolean
}

export const CustomDatePicker: React.FC<Props> = ({ date = '', onChange, error = false }) => {
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
          SwitchViewIcon: switchPickerIcon,
          OpenPickerIcon: calendarIcon,
        }}
        PaperProps={{
          sx: {
            '&& .Mui-selected': {
              backgroundColor: '#19A3D1',
              color: 'white',
            },
            '&& .Mui-selected:focus': {
              backgroundColor: '#19A3D1',
            },
            '&& .Mui-selected:hover': {
              backgroundColor: '#19A3D1',
            },
          },
        }}
        disableFuture
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <div
            className={`rounded-lg bg-border-grey flex items-center px-5 w-full justify-between relative border ${
              error ? 'border-[#e92346]' : date !== '' ? 'border-border-lightGrey' : ' border-[rgba(127,127,127, 0.1)]'
            }`}
          >
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
