import { Button as MuiButton, ButtonProps as MuiButtonProperties, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

export type ThemeProps = Theme

export type ButtonProperties = Omit<MuiButtonProperties, 'variant'> & {
  variant?: 'fill' | 'ghost' | 'text' | 'link' | 'success'
  children?: React.ReactNode
}

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: `${theme.spacing(2)} ${theme.spacing(7)}`,
    textTransform: 'none',
    color: theme.palette.text.white,
    '&.Mui-disabled': {
      color: theme.palette.text.disabled,
    },
    '&.Mui-disabled path': {
      stroke: theme.palette.text.disabled,
    },
  },
  fill: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
    '& *': {
      stroke: theme.palette.text.black,
    },
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.text.white,
    '&:hover': {
      backgroundColor: theme.palette.success.light,
    },
    textDecoration: 'none',
  },
  ghost: {
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 4,
    '&.Mui-disabled': {
      borderColor: theme.palette.text.disabled,
    },
  },
  text: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  link: {
    backgroundColor: 'transparent',
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}))
export const Button: React.FC<ButtonProperties> = (properties) => {
  const { className, children, variant = 'fill', ...otherProperties } = properties

  const styles = useStyles()

  return (
    <MuiButton {...otherProperties} className={[className, styles.root, styles[variant]].join(' ')}>
      {children}
    </MuiButton>
  )
}

