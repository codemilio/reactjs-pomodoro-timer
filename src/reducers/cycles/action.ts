import { Cycle, CyclesAction } from '../../reducers/cycles/types'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle): CyclesAction {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      cycle: newCycle,
    },
  }
}

export function markCurrentCycleAsFinishedAction(): CyclesAction {
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}

export function interrupCurrentCycleAction(): CyclesAction {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}
