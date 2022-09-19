import '@mui/material/styles'

declare module '@mui/material/styles/createPalette' {
  export interface Palette {
    primary?: SimplePaletteColorOptions
    secondary?: SimplePaletteColorOptions
    border?: SimplePaletteColorOptions
  }
  export interface PaletteOptions {
    primary?: SimplePaletteColorOptions
    secondary?: SimplePaletteColorOptions
    fill?: SimplePaletteColorOptions
    border?: SimplePaletteColorOptions
  }

  export interface TypeText {
    black: string
    white: string
    grey: string
    disabled: string
    nest: string
    hop: string
    blue: string
    purple: string
    blue: string
  }

  export interface TypeBackground {
    dark: string
  }
  export interface PaletteColor {
    light: string
    main?: string
    dark?: string
    transParent?: string
    blue?: string
  }

  export interface SimplePaletteColorOptions {
    light: string
    main?: string
    dark?: string
    transparent?: string
    orange?: string
    blue?: string
    pink?: string
    grey?: string
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    heading1?: TypographyStyleOptions
    heading2?: TypographyStyleOptions
    title1?: TypographyStyleOptions
    title2?: TypographyStyleOptions
    title3?: TypographyStyleOptions
    bodyBold?: TypographyStyleOptions
    body1?: TypographyStyleOptions
    body2?: TypographyStyleOptions
    body?: TypographyStyleOptions
    subhead?: TypographyStyleOptions
    subheadBold?: TypographyStyleOptions
    label1?: TypographyStyleOptions
  }

  interface TypographyVariantsOptions {
    heading1?: TypographyStyleOptions
    heading2?: TypographyStyleOptions
    title1?: TypographyStyleOptions
    title2?: TypographyStyleOptions
    title3?: TypographyStyleOptions
    bodyBold?: TypographyStyleOptions
    body1?: TypographyStyleOptions
    body2?: TypographyStyleOptions
    body?: TypographyStyleOptions
    subhead?: TypographyStyleOptions
    subheadBold?: TypographyStyleOptions
    label1?: TypographyStyleOptions
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    heading1?: true
    heading2?: true
    heading3?: true
    heading4?: true
    heading5?: true
    heading6?: true
    title1?: true
    title2?: true
    title3?: true
    title4?: true
    bodyBold?: true
    body1?: true
    body2?: true
    body3?: true
    body?: true
    desc?: true
    subhead?: true
    subheadBold?: true
    subheadBold1: true
    label1?: true
    label2?: true

    h3?: false
    h4?: false
    h5?: false
    h6?: false
  }
  export type OverridableStringUnion<T extends string | number, U = Record<string, unknown>> = GenerateStringUnion<
    Overwrite<Record<T, true>, U>
  >
}

export * from '../components'
export * from '../theme'
