import { useEffect, useState } from 'react'
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
import { differenceInSeconds } from 'date-fns'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmout: zod.number().min(5).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
type Cycle = NewCycleFormData & {
  id: string
  startDate: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCyleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmout: 5,
    },
  })

  const task = watch('task')
  const isSubmitDisabled = !task
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmout * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const handleCreateNewSycle = (data: NewCycleFormData) => {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmout: data.minutesAmout,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCyleId(id)
    reset()
  }

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewSycle)}>
        <FormContainer>
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
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </ContdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
