import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Input } from 'components/input'

type ImageProps = React.HTMLProps<ImageProps>

const sortIcon = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => (
  <img {...props} ref={ref} src="/assets/svg/sort.svg" alt="calendar icon" className="w-[20px] h-[10px]" />
))

export const BasicSelect = () => {
  const [age, setAge] = React.useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value)
  }

  return (
    <Select
      sx={{
        fontSize: '14px',
        fontWeight: 500,
      }}
      IconComponent={sortIcon}
      className="w-[11.875rem] rounded-[22px] bg-border-grey border-[rgba(127,127,127, 0.1)] hover:cursor-pointer"
      value="10"
      onChange={handleChange}
      input={<Input className="py-[3px] px-3 bg-border-grey" />}
      MenuProps={{
        className: 'mt-1',
      }}
    >
      <MenuItem value={10}>Female</MenuItem>
      <MenuItem value={20}>Male</MenuItem>
    </Select>
  )
}

export * from './auto-complete'
