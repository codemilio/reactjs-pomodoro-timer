import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'warning' | 'success'

type ButtonContainerProps = {
  variant: ButtonVariant
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  warning: 'yellow',
  success: 'green'
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 400px;
  height: 400px;

  background-color: ${props => props.theme.primary};
  /* ${props => {
    return css`
      background-color: ${buttonVariants[props.variant]}
    `
  }} */
`