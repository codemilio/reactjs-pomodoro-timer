import { ButtonContainer, ButtonVariant } from './button.style'

type Props = {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: Props) {
  return <ButtonContainer variant={variant}> Enviar </ButtonContainer>
}
