import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  // Disabled

  '& .Mui-disabled ': {
    color: `${theme.palette.grey[300]} !important`,
    borderColor: `${theme.palette.grey[300]} !important`,
    '& svg': {
      color: `${theme.palette.grey[300]} !important`,
    },
  },
}));
