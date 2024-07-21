import { useForm } from 'react-hook-form'

import { Play } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import {
  HomeContainer,
  FormContainer,
  ContdownContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmoutInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmout: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmout: 5,
    },
  })

  const task = watch('task')
  const isSubmitDisabled = !task

  const handleCreateNewSycle = (data: NewCycleFormData) => {
    console.log(data)
    reset()
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

        <StartCountdownButton
          type="submit"
          disabled={isSubmitDisabled}
          onClick={() => console.log('clicou')}
        >
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
