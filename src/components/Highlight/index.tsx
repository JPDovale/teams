import { HighlightContainer, Subtitle, Title } from "./styles";

type Props = {
  title: string;
  subtitle: string;
}

export function Highlight({title, subtitle}: Props){
  return (
    <HighlightContainer>
      <Title>
        {title}
      </Title>
      
      <Subtitle>
        {subtitle}
      </Subtitle>
    </HighlightContainer>
  )
}