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
  const { register, handleSubmit, watch } = useForm()
  const task = watch('task')
  const isSubmitDisabled = !task

  const handleCreateNewSycle = (data: any) => {
    console.log(data)
  }

  return (
    <HomeContainer>
      <form action="">
        <FormContainer onSubmit={handleSubmit(handleCreateNewSycle)}>
          <label htmlFor="task"> Tarefa: </label>
          <TaskInput
            id="task"
            list="suggestions"
            placeholder="Digite sua tarefa..."
            {...register('task')}
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
            {...register('minutesAmout', { valueAsNumber: true })}
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

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
