import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Input } from 'components/input'
import { makeStyles } from '@mui/styles'
import { Typography } from '@mui/material'

type ImageProps = React.HTMLProps<ImageProps>

const sortIcon = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => (
  <img {...props} ref={ref} src="/assets/svg/sort.svg" alt="calendar icon" className="w-[20px] h-[10px]" />
))

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  items: { value: string; label: string }[]
  name?: string
}

const useStyles = makeStyles({
  '&.MuiPaper-root': {
    borderRadius: '22px',
  },
  select: {
    '& ul': {
      backgroundColor: 'white',
    },
    '& li': {
      fontSize: '16px',
      fontWeight: '400',
      fontFamily: 'Avenir Next',
    },
  },
})

export const BasicSelect: React.FC<Props> = ({ value, onChange, items = [], name = null }) => {
  const [state, setState] = React.useState<string>(value || '')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value)
    onChange(event)
  }

  const classes = useStyles()
  
  return (
    <Select
      name={name}
      IconComponent={sortIcon}
      className={`w-full rounded-[22px] bg-border-grey  hover:cursor-pointer ${value !== '' && 'border-primary-brand'}`}
      style={{
        fontSize: '14px',
        fontWeight: '500',
      }}
      value={state}
      inputProps={{
        sx: {
          '&.MuiOutlinedInput-input': {
            border: '2px solid green',
          },
        },
      }}
      onChange={handleChange}
      input={<Input className="py-[3px] px-3 bg-border-grey" />}
      renderValue={(value) => {
        return (
          <Typography variant="subhead" textTransform="capitalize">
            {value}
          </Typography>
        )
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: '12px',
            width: '11.875rem',
            marginTop: '8px',
            marginLeft: '5px',
            padding: '1.063rem 0',
            '& .MuiMenuItem-root.Mui-selected': {
              backgroundColor: 'transparent',
            },
            '& .MuiMenuItem-root:hover': {
              backgroundColor: 'rgb(245, 247, 249)',
            },
            '& .MuiMenuItem-root.Mui-selected:hover': {
              backgroundColor: 'rgb(245, 247, 249)',
            },
          },
        },
        classes: {
          paper: classes.select,
        },
      }}
    >
      {items.map(({ value: val, label }) => {
        return (
          <MenuItem key={val} value={val}>
            <div className="flex items-center gap-2.5">
              {state === val ? (
                <img src="/assets/svg/check.svg" className="w-2.5 h-2.5" alt="" />
              ) : (
                <div className="w-2.5 h-2.5" />
              )}
              <Typography variant="body">{label}</Typography>
            </div>
          </MenuItem>
        )
      })}
    </Select>
  )
}

export * from './auto-complete'
