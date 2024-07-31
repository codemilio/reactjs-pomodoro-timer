import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
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
import { differenceInSeconds } from 'date-fns'

type ContextProps = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCycleAsFinished: () => void
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateJSON = localStorage.getItem(
        '@pomodoro-timer:cycle-state-1.0.0',
      )

      if (storedStateJSON) {
        return JSON.parse(storedStateJSON)
      }

      return initialState
    },
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  const markCycleAsFinished = () => {
    dispatch(markCurrentCycleAsFinishedAction())
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
    dispatch(interrupCurrentCycleAction())
  }

  useEffect(() => {
    const stateJson = JSON.stringify(cyclesState)
    localStorage.setItem('@pomodoro-timer:cycle-state-1.0.0', stateJson)
  }, [cyclesState])

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        markCycleAsFinished,
        handleChangeSecondsPassed,
        handleCreateNewCycle,
        handleInterruptCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
