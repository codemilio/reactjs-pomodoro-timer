import { ButtonContainer, ButtonVariant } from './styles'

type Props = {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: Props) {
  return <ButtonContainer variant={variant}> Enviar </ButtonContainer>
}
