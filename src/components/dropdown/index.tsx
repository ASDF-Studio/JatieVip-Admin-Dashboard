import * as React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Input } from 'components/input'

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

export const BasicSelect: React.FC<Props> = ({ value, onChange, items = [], name = null }) => {
  const [state, setState] = React.useState<string>(value || '')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value)
    onChange(event)
  }

  return (
    <Select
      sx={{
        fontSize: '14px',
        fontWeight: 500,
      }}
      name={name}
      IconComponent={sortIcon}
      className="w-[11.875rem] rounded-[22px] bg-border-grey border-[rgba(127,127,127, 0.1)] hover:cursor-pointer"
      value={state}
      onChange={handleChange}
      input={<Input className="py-[3px] px-3 bg-border-grey" />}
      MenuProps={{
        className: 'mt-1',
      }}
    >
      {items.map(({ value, label }) => {
        return (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export * from './auto-complete'
