import { Typography } from '@mui/material'
import { useAuth } from 'Contexts/Auth'

export const Hello = () => {
  const { user } = useAuth()

  return <Typography variant="heading1">Hey {`${user?.username}`}! Welcome to your profile.</Typography>
}
