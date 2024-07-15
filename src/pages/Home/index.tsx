import { Play } from 'phosphor-react'
import {
  HomeContainer,
  FormContainer,
  ContdownContainer,
  Separator,
  StartCoutdownButton,
} from './styles'
export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task"> Tarefa: </label>
          <input type="text" id="task" />
          <label htmlFor="minutesAmount"> Durante: </label>
          <input type="number" id="minutesAmount" />
          <span>minutos.</span>
        </FormContainer>

        <ContdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </ContdownContainer>

        <StartCoutdownButton type="submit">
          <Play size={24} />
          Começar
        </StartCoutdownButton>
      </form>
    </HomeContainer>
  )
}
