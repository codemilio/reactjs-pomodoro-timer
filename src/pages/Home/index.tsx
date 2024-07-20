import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Play } from 'phosphor-react'
import {
  HomeContainer,
  FormContainer,
  ContdownContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmoutInput,
} from './styles'

export function Home() {
  const [task, setTask] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTask(value)
  }

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task"> Tarefa: </label>
          <TaskInput
            type="text"
            id="task"
            list="suggestions"
            placeholder="Digite sua tarefa..."
            onChange={handleChange}
            value={task}
          />

          <datalist id="suggestions">
            <option value="Projeto 01" />
          </datalist>

          <label htmlFor="minutesAmount"> Durante: </label>
          <MinutesAmoutInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            min={5}
            max={60}
            step={5}
          />
          <span>minutos.</span>
        </FormContainer>

        <ContdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </ContdownContainer>

        <StartCountdownButton type="submit" disabled={!task}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
