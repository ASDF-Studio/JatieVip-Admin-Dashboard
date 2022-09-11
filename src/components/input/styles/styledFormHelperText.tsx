import { styled } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'

export const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
  textTransform: 'capitalize',
  margin: `0 0 ${theme.spacing(2)} 0`,
  color: theme.palette.primary.dark,
  '&.Mui-focused': {
    color: theme.palette.primary.dark,
  },
}))
