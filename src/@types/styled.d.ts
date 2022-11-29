import 'styled-components'
import theme from '@themeMap/index'

declare module 'styled-components' {
  type ThemeType = typeof theme;

  export interface DefaultTheme extends ThemeType {}
}