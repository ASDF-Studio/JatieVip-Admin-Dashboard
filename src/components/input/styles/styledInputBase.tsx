import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

export const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (properties) => properties !== 'background',
})<{ background?: string }>(({ theme }) => ({
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: theme.spacing(1),
  padding: 0,
  backgroundColor: theme.palette.primary.light,

  '&.Mui-focused.MuiInputBase-colorPrimary': {
    borderColor: theme.palette.primary.transParent,
  },

  '&.MuiInputBase-colorPrimary': {
    borderColor: theme.palette.primary.transParent,
  },
  '&.MuiInputBase-colorSuccess': {
    borderColor: theme.palette.success.dark,
  },
  '&.MuiInputBase-colorWarning': {
    borderColor: theme.palette.warning.main,
  },
  '&.MuiInputBase-colorError': {
    borderColor: theme.palette.error.main,
  },

  '&.MuiInputBase-adornedStart': {
    paddingLeft: theme.spacing(4),
  },
  '&.MuiInputBase-adornedEnd': {
    paddingRight: theme.spacing(4),
  },

  '& .MuiInputBase-input': {
    height: '22px',
    fontSize: 14,
    fontWeight: 500,
    padding: `${theme.spacing(2)} 15px`,
    color: theme.palette.primary.dark,
    '&::placeholder': { color: theme.palette.primary.dark, textTransform: 'capitalize' },
    '&.MuiInputBase-inputAdornedStart': {
      paddingLeft: 0,
    },
    '&.MuiInputBase-inputAdornedEnd': {
      paddingRight: 0,
    },
  },
}))
