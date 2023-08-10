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
  variant?: 'fill' | 'ghost' | 'text' | 'link' | 'success' | 'primary' | 'secondry' | 'landingButton' | 'error' | 'action' | 'secondry2' | 'cancel'
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
    root: 'rounded-lg py-2 box-border',
    ghost: 'border-border-lightBlue border border-solid bg-white hover:hoverShadow hover:border-[#19a3d1]',
    fill: 'bg-secondary-light-blue rounded-lg hover:shadow-hoverShadow active:bg-primary-brand',
    text: 'bg-transparent active:bg-white w-fit py-0 px-0',
    primary: 'bg-primary-brand rounded-lg hover:shadow-hoverShadow active:bg-primary-brand',
    secondry: 'bg-fill-lightYellow rounded-lg hover:bg-fill-lightYellow active:bg-fill-lightYellow/20',
    action: 'bg-fill-red rounded-full',
    landingButton: 'rounded-lg',
    secondry2: 'bg-primary-white border border-solid border-primary-brand rounded-lg',
    error: 'bg-[#e92346] rounded-lg  active:bg-[#e92346]',
    cancel: 'bg-fill-lightRed rounded-lg',
  }

  return (
    <MuiButton disableRipple {...otherProperties} className={[className, styles.root, styles[variant]].join(' ')}>
      {loading ? (
        <CircularProgress className={`w-5 h-5 ${variant === 'ghost' ? 'text-primary-brand' : 'text-white'}`} />
      ) : (
        <Typography textTransform="capitalize" variant={textVariant} className={`border-border-blue ${textClassName}`}>
          {children}
        </Typography>
      )}
    </MuiButton>
  )
}
