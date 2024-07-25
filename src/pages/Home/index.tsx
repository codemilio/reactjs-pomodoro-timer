import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Play, Stop } from 'phosphor-react'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import {
  HomeContainer,
  FormContainer,
  ContdownContainer,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
  MinutesAmoutInput,
} from './styles'
import { differenceInSeconds } from 'date-fns'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmout: zod.number().min(1).max(60),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
type Cycle = NewCycleFormData & {
  id: string
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
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
  const isActiveCycle = !!activeCycle
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
    setAmountSecondsPassed(0)
    reset()
  }

  const handleInterruptCycle = () => {
    setActiveCyleId(null)

    setCycles((currentCycles) => {
      return currentCycles.map((item) =>
        item.id === activeCycleId
          ? { ...item, interruptedDate: new Date() }
          : item,
      )
    })
  }

  useEffect(() => {
    let intervalId: number
    if (activeCycle) {
      intervalId = setInterval(() => {
        const difference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (difference >= totalSeconds) {
          setCycles((currentCyles) => {
            return currentCyles.map((item) =>
              item.id === activeCycleId
                ? { ...item, finishedDate: new Date() }
                : item,
            )
          })

          setAmountSecondsPassed(totalSeconds)
          clearInterval(intervalId)
          setActiveCyleId(null)
        } else {
          setAmountSecondsPassed(difference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewSycle)}>
        <FormContainer>
          <label htmlFor="task"> Tarefa: </label>
          <TaskInput
            id="task"
            list="suggestions"
            placeholder="Digite sua tarefa..."
            disabled={isActiveCycle}
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
            min={1}
            max={60}
            step={5}
            {...register('minutesAmout', { valueAsNumber: true })}
            disabled={isActiveCycle}
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

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <Stop size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
