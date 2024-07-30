export type NewCycleFormData = {
  task: string
  minutesAmount: number
}

export type Cycle = NewCycleFormData & {
  id: string
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export type CyclesState = {
  cycles: Cycle[]
  activeCycleId: string | null
}

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export type CyclesAction =
  | {
      type: ActionTypes.ADD_NEW_CYCLE
      payload: {
        cycle: Cycle
      }
    }
  | {
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE
    }
  | {
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED
    }
