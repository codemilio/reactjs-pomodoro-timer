import { z } from 'zod'
import { Play, Stop } from 'phosphor-react'
import { Countdown } from './Countdown'
import { NewCycleForm } from './NewCycleForm'
import { FormProvider, useForm } from 'react-hook-form'
import { useCyclesContext } from '../../contexts/CyclesContext'
import { zodResolver } from '@hookform/resolvers/zod'
import type { NewCycleFormData } from '../../reducers/cycles/types'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z.number().min(5).max(60),
})

export function Home() {
  const { activeCycle, handleCreateNewCycle, handleInterruptCycle } =
    useCyclesContext()
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm
  const task = watch('task')
  const isSubmitDisabled = !task

  const onCreateNewCycle = (data: NewCycleFormData) => {
    handleCreateNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(onCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

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
