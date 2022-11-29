import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { ButtonTypeStyleProps } from "@componentsMap/Button/styles";
import { ButtonIconContainer, Icon } from "./styles";

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonTypeStyleProps
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest}: Props){
  return(
    <ButtonIconContainer {...rest}>
      <Icon name={icon} type={type} />
    </ButtonIconContainer>
  )
}