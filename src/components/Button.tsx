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
  variant?: 'fill' | 'ghost' | 'text' | 'link' | 'success' | 'secondry' | 'landingButton'
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
    ghost: 'border-border-lightBlue border border-solid bg-white hover:hoverShadow hover:border-[#19a3d1]',
    fill: 'bg-secondary-light-blue rounded-[22px] hover:shadow-hoverShadow active:bg-primary-brand',
    text: 'bg-transparent active:bg-white w-fit py-0 px-0',
    secondry: 'rounded-[22px] hover:bg-fill-hover bg-text-blue/20 active:bg-text-blue/20',
    landingButton: 'rounded-[22px]',
  }

  return (
    <MuiButton disableRipple {...otherProperties} className={[className, styles.root, styles[variant]].join(' ')}>
      {loading ? (
        <CircularProgress className={`w-7 h-7 ${variant === 'ghost' ? 'text-primary-brand' : 'text-white'}`} />
      ) : (
        <Typography textTransform="capitalize" variant={textVariant} className={`border-border-blue ${textClassName}`}>
          {children}
        </Typography>
      )}
    </MuiButton>
  )
}
