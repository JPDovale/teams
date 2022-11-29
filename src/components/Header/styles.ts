import styled from "styled-components/native";
import { CaretCircleLeft } from "phosphor-react-native";

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
`

export const Logo = styled.Image`
  width: 46px;
  height: 55px;
`

export const BackButton = styled.TouchableOpacity`
  flex: 1;
`

export const BackIcon = styled(CaretCircleLeft).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.WHITE
}))``