import { styled } from '@mui/material/styles';
import FormLabel from '@mui/material/FormLabel';

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  display: 'flex',
  margin: `${theme.spacing(2)} ${theme.spacing(4)}`,

  '&.MuiFormLabel-colorPrimary': {
    color: theme.palette.primary.dark,
  },
  '&.MuiFormLabel-colorSuccess': {
    color: theme.palette.success.dark,
  },
  '&.MuiFormLabel-colorWarning': {
    color: theme.palette.warning.main,
  },
  '&.MuiFormLabel-colorError': {
    color: theme.palette.error.main,
  },
}));
