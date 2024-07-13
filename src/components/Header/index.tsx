import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'
import logo from '../../assets/logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={logo} alt="" />
      <nav>
        <a href="">
          <Timer />
        </a>
        <a href="">
          <Scroll />
        </a>
      </nav>
    </HeaderContainer>
  )
}
