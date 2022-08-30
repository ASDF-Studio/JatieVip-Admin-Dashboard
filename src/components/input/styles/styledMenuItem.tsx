import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(4),
  color: theme.palette.primary.dark,
  '&.Mui-selected': {
    borderWidth: 1,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '&.Mui-focusVisible': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'inherit',
  },
  '&:hover': {
    backgroundColor: 'inherit',
  },
  '& .MuiTouchRipple-root': {
    display: 'none',
  },
}));
