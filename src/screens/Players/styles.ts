import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const PlayersContainer = styled(SafeAreaView)`
  flex: 1;

  padding: 24px;

  background-color: ${({theme}) => theme.COLORS.GRAY_600};

`

export const Form = styled.View`
  flex-direction: row;
  justify-content: center;

  width: 100%;

  background-color: ${({theme}) => theme.COLORS.GRAY_700};
  border-radius: 12px;
`

export const HeaderList = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;
  margin: 32px 0 12px;
`

export const NumberOfPlayers = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;

    color: ${theme.COLORS.GRAY_200};
  `};
`