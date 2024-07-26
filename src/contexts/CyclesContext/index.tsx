import { ReactNode, createContext, useContext, useState } from 'react'
import { Cycle } from '../../@types/types'

type ContextProps = {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCycleAsFinished: () => void
  handleChangeActiveCycleId: (id: string | null) => void
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

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        handleChangeActiveCycleId,
        markCycleAsFinished,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
