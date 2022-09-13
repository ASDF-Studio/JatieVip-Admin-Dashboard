import {
  Button as MuiButton,
  ButtonProps as MuiButtonProperties,
  CircularProgress,
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
  loading?: boolean
}

export const Button: React.FC<ButtonProperties> = (properties) => {
  const {
    className,
    children,
    variant = 'fill',
    textVariant = 'bodyBold',
    textClassName = '',
    loading = false,
    ...otherProperties
  } = properties

  const styles = {
    root: 'rounded-[22px] py-2 box-border',
    ghost: 'border-border-blue border border-solid bg-white',
    fill: 'bg-secondary-light-blue rounded-[22px] shadow-secondaryShadow',
    text: 'bg-transparent active:bg-white',
  }

  return (
    <MuiButton {...otherProperties} className={[className, styles.root, styles[variant]].join(' ')}>
      {loading ? (
        <CircularProgress className="text-white w-7 h-7" />
      ) : (
        <Typography textTransform="capitalize" variant={textVariant} className={`border-border-blue ${textClassName}`}>
          {children}
        </Typography>
      )}
    </MuiButton>
  )
}
