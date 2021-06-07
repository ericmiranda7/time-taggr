const initialState = {
  start: null,
  diff: null,
  minutes: null,
  seconds: null,
  duration: null,
  expired: false
}

let interval

export const tick = () => {
  return { type: 'TICK' }
}

export const setTimer = duration => {
  return { type: 'SET_TIMER', payload: { duration: duration * 60 } }
}

export const setStart = () => {
  return { type: 'START_TIMER' }
}

export const startTimer = dispatch => {
  dispatch(setStart())
  dispatch(tick())

  setInterval(() => {
    dispatch(tick())
  }, 1000)
}

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TIMER':
      return { ...state, duration: action.payload.duration }
    case 'TICK':
      if (!state.expired) {
        const diff = state.duration - (((Date.now() - state.start) / 1000) | 0)

        console.log(state.start)

        let minutes = (diff / 60) | 0
        let seconds = (diff % 60) | 0

        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        let start = state.start
        let expired = state.expired
        if (diff <= 0) {
          expired = true
        }
        return { ...state, diff, minutes, seconds, start, expired }
      }
      clearInterval(interval)
      return state
    case 'START_TIMER':
      return { ...state, start: Date.now() }
    default:
      return state
  }
}

export default timerReducer