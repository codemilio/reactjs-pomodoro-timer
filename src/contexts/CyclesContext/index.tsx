import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react'
import type { Cycle, NewCycleFormData } from '../../reducers/cycles/types'
import { cyclesReducer } from '../../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interrupCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../../reducers/cycles/action'

type ContextProps = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCycleAsFinished: () => void
  handleChangeActiveCycleId: (id: string | null) => void
  handleChangeSecondsPassed: (seconds: number) => void
  handleCreateNewCycle: (data: NewCycleFormData) => void
  handleInterruptCycle: () => void
}

type ProviderProps = {
  children: ReactNode
}

const CyclesContext = createContext<ContextProps | undefined>(undefined)

export const useCyclesContext = () => {
  const context = useContext(CyclesContext)

  if (!context) throw new Error('useCyclesContext must be used')

  return context
}

export function CyclesProvider({ children }: ProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const { cycles, activeCycleId } = cyclesState
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const handleChangeActiveCycleId = (id: string | null) => {
    setActiveCyleId(id)
  }

  const markCycleAsFinished = () => {
    markCurrentCycleAsFinishedAction()
  }

  const handleChangeSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const id = String(new Date().getTime())
    dispatch(
      addNewCycleAction({
        id,
        task: data.task,
        minutesAmount: data.minutesAmount,
        startDate: new Date(),
      }),
    )
    setAmountSecondsPassed(0)
  }

  const handleInterruptCycle = () => {
    setActiveCyleId(null)

    dispatch(interrupCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCycleAsFinished,
        handleChangeActiveCycleId,
        handleChangeSecondsPassed,
        handleCreateNewCycle,
        handleInterruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
