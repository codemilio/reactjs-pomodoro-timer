import { useFormContext } from 'react-hook-form'
import { useCyclesContext } from '../../../contexts/CyclesContext'
import { FormContainer, MinutesAmoutInput, TaskInput } from './styles'

export function NewCycleForm() {
  const { activeCycle } = useCyclesContext()
  const { register } = useFormContext()

  const isActiveCycle = !!activeCycle

  return (
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
        min={5}
        max={60}
        step={5}
        {...register('minutesAmout', { valueAsNumber: true })}
        disabled={isActiveCycle}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
