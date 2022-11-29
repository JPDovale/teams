import { TouchableOpacity } from 'react-native'

import styled, { css } from "styled-components/native";

export type FilterStyleProps = {
  isActive?: boolean
}

export const FilterContainer = styled(TouchableOpacity)<FilterStyleProps>`
  ${({theme, isActive}) => isActive && css`
    border: 1px solid ${theme.COLORS.GREEN_700};
  `};

  align-items: center;
  justify-content: center;

  height: 38px;
  width: 70px;
  margin-right: 12px;

  border-radius: 4px;
`

export const Title = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    text-transform: uppercase;

    color: ${theme.COLORS.WHITE};
  `};
`