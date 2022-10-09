import React, { ReactNode, useEffect, useRef } from 'react'
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
  focus?: boolean
  className?: string
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
    focus,
    className,
    ...otherProperties
  } = properties

  const classes = useStyles()

  const inputRef = useRef<HTMLInputElement>(null)

  const { value } = properties

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [focus])

  return (
    <StyledFormControl fullWidth variant="filled" disabled={disabled} color={status ?? 'primary'}>
      {/* Input Label */}

      {label && (
        <StyledFormHelperText>
          <Typography variant="subheadBold" className="text-primary-grey">
            {label}
          </Typography>
        </StyledFormHelperText>
      )}

      {/* Input Base */}

      <StyledInputBase
        className={className}
        {...otherProperties}
        type={hidden !== undefined ? (hidden ? 'password' : 'text') : type}
        background={background}
        inputRef={inputRef}
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
          <Typography variant="body2">{helperText}</Typography>

          {/* Counter */}

          {maxLength && withCounter && (
            <Typography variant="label1" classes={classes}>
              {typeof value === 'string' && `${value.length} / ${maxLength}`}
            </Typography>
          )}
        </StyledFormLabel>
      )}
    </StyledFormControl>
  )
}
