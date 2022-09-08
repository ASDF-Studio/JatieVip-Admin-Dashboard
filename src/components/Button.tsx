import {
  Button as MuiButton,
  ButtonProps as MuiButtonProperties,
  OverridableStringUnion,
  Theme,
  Typography,
  TypographyPropsVariantOverrides,
} from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import React from 'react'

export type ThemeProps = Theme

export type ButtonProperties = Omit<MuiButtonProperties, 'variant'> & {
  variant?: 'fill' | 'ghost' | 'text' | 'link' | 'success'
  children?: React.ReactNode | string
  textClassName?: string
  textVariant?: OverridableStringUnion<Variant | 'inherit', TypographyPropsVariantOverrides>
}

export const Button: React.FC<ButtonProperties> = (properties) => {
  const {
    className,
    children,
    variant = 'fill',
    textVariant = 'bodyBold',
    textClassName = '',
    ...otherProperties
  } = properties

  const styles = {
    root: 'rounded-[22px] py-2 box-border',
    ghost: 'border-border-blue border border-solid bg-white',
    fill: 'bg-secondary-light-blue rounded-[22px] shadow-secondaryShadow',
    text: 'bg-transparent active:bg-white',
  }

  return (
    <MuiButton {...otherProperties} className={[styles.root, styles[variant], className].join(' ')}>
      <Typography textTransform="capitalize" variant={textVariant} className={`border-border-blue ${textClassName}`}>
        {children}
      </Typography>
    </MuiButton>
  )
}
