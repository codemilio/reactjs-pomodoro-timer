import { Play } from 'phosphor-react'
import { HomeContainer, FormContainer, ContdownContainer } from './styles'
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
          <span>:</span>
          <span>0</span>
          <span>0</span>
        </ContdownContainer>

        <button type="submit">
          <Play size={24} />
          Começar
        </button>
      </form>
    </HomeContainer>
  )
}
