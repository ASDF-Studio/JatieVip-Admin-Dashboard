import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { withStyles } from '@mui/styles'
import { InputAdornment, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { CountryType } from '../../constants'

type Props = {
  data: CountryType[]
}

const NoPaddingAutocomplete = withStyles({
  inputRoot: {
    '&&[class*="MuiOutlinedInput-root"]': {
      borderColor: 'rgba(127, 127, 127, 0.1)',
      borderRadius: '22px',
      backgroundColor: 'rgba(245,247,249, 1)',
      paddingLeft: '22px',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(127, 127, 127, 0.1)',
      boxShadow: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(127, 127, 127, 0.1)',
      boxShadow: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(127, 127, 127, 0.1)',
    },
  },
  paper: {
    borderRadius: '12px',
  },
  input: {},
})(Autocomplete)

export const AutoComplete: React.FC<Props> = ({ data = [] }) => {
  const [item, setItem] = useState()
  const [input, setInput] = useState('')
  console.log(item)
  const filterOptions = createFilterOptions({
    stringify: (option: CountryType) => option.label + option.code,
  })

  return (
    <NoPaddingAutocomplete
      id="country-select"
      options={data}
      filterOptions={filterOptions}
      disableClearable
      popupIcon={<img src="/assets/svg/sort.svg" alt="calendar icon" className="w-[20px] h-[10px]" />}
      getOptionLabel={(option: CountryType) => option.code || ''}
      onSelect={(e, v) => setItem(v)}
      inputValue={input}
      value={item}
      includeInputInList
      onInputChange={(e, v) => {
        setInput(v)
      }}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <img
            loading="lazy"
            width="20"
            className="mr-3"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt="country flag"
          />
          <Typography variant="subhead">{option.code}</Typography>
        </Box>
      )}
      // ListboxProps={{
      //   className: 'roudnded-[22px]',
      // }}
      fullWidth
      renderInput={(params) => {

        

        return (
            <TextField
              {...params}
              fullWidth
              inputProps={{
                ...params.inputProps,
                style: {
                  fontSize: '14px',
                  fontWeight: '500',
                },
                className: 'py-[3px] pl-[30px]',
              }}
            />
          
        )
      }}
    />
  )
}
