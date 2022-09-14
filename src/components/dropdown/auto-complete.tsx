import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { withStyles } from '@mui/styles'
import { Typography } from '@mui/material'

type keys = "label" | string

type Props = {
  data: Record<keys, any>[]
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
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(127, 127, 127, 0.1)"
    },
  },
  paper: {
    borderRadius: "12px"
  },
  input: {},
})(Autocomplete)


export const AutoComplete: React.FC<Props> = ({ data = [] }) => {
  return (
    <NoPaddingAutocomplete
      id="country-select"
      options={data}
      popupIcon={<img src="/assets/svg/sort.svg" alt="calendar icon" className="w-[20px] h-[10px]" />}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          <Typography variant="subhead">
            {option.label} ({option.code})
          </Typography>
        </Box>
      )}
      ListboxProps={{
        className: "roudnded-[22px]"
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          inputProps={{
            ...params.inputProps,
            style: {
              fontSize: '14px',
              fontWeight: '500',
            },
            className: 'py-[3px] px-0',
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}
