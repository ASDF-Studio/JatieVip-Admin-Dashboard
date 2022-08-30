import React, { ReactNode } from 'react'
import { Theme } from '@mui/material'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import { InputBaseProps } from '@mui/material/InputBase/InputBase'
import {
  StyledFormControl,
  StyledFormLabel,
  StyledFormHelperText,
  StyledInputAdornment,
  StyledInputBase,
} from './styles'

export type Background = 'white' | 'primary'

export type Status = 'error' | 'warning' | 'success'

export interface InputProperties extends InputBaseProps {
  name?: string
  label?: string | undefined
  helperText?: string | undefined
  hidden?: boolean | undefined
  status?: Status
  background?: Background
  startIcon?: ReactNode
  endIcon?: ReactNode
  maxLength?: number
  withCounter?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
    whiteSpace: 'nowrap',
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: theme.spacing(2),
  },
}))

export const Input: React.FC<InputProperties> = (properties) => {
  const {
    label, // Label
    helperText, // Helper text
    disabled,
    hidden, // Hidden
    type = 'text',
    status, // Status
    background = 'white', // Background
    startIcon, // Start icon
    endIcon, // End icon
    withCounter = false,
    maxLength, // Maximum number of characters
    inputProps, // Input Props
    ...otherProperties
  } = properties

  const classes = useStyles()

  return (
    <StyledFormControl fullWidth variant="filled" disabled={disabled} color={status ?? 'primary'}>
      {/* Input Label */}

      {label && (
        <StyledFormHelperText>
          <Typography variant="label1">{label}</Typography>
        </StyledFormHelperText>
      )}

      {/* Input Base */}

      <StyledInputBase
        {...otherProperties}
        type={hidden !== undefined ? (hidden ? 'password' : 'text') : type}
        background={background}
        startAdornment={
          startIcon ? (
            <StyledInputAdornment variant="outlined" position="start">
              {startIcon}
            </StyledInputAdornment>
          ) : (
            startIcon
          )
        }
        endAdornment={
          endIcon ? (
            <StyledInputAdornment variant="outlined" position="end">
              {endIcon}
            </StyledInputAdornment>
          ) : (
            endIcon
          )
        }
        inputProps={{ maxLength, ...inputProps }}
      />

      {/* Helper Text */}

      {(helperText || withCounter) && (
        <StyledFormLabel>
          <Typography variant="label1">{helperText}</Typography>

          {/* Counter */}

          {maxLength && withCounter && (
            <Typography variant="label1" classes={classes}>
              {typeof properties.value === 'string' && `${properties.value.length} / ${maxLength}`}
            </Typography>
          )}
        </StyledFormLabel>
      )}
    </StyledFormControl>
  )
}
