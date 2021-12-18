export interface CounterState{
  counter: number,
  channel: string
}

export const initialState: CounterState = {
  counter: 0,
  channel: 'Laravel'
}


