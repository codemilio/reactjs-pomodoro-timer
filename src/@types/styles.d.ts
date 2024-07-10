import 'styled-components'
import type { defaultTheme } from '../styles/themes/default' 

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export interface defaultTheme extends ThemeType { }
}