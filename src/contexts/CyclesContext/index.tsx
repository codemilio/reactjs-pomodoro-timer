import { ReactNode, createContext, useContext, useState } from 'react'
import type { Cycle, NewCycleFormData } from '../../@types/types'

type ContextProps = {
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
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCyleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const handleChangeActiveCycleId = (id: string | null) => {
    setActiveCyleId(id)
  }

  const markCycleAsFinished = () => {
    setCycles((currentCyles) => {
      return currentCyles.map((item) =>
        item.id === activeCycleId
          ? { ...item, finishedDate: new Date() }
          : item,
      )
    })
  }

  const handleChangeSecondsPassed = (seconds: number) => {
    setAmountSecondsPassed(seconds)
  }

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCyleId(id)
    setAmountSecondsPassed(0)
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

  return (
    <CyclesContext.Provider
      value={{
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
