const initialState = {
  start: null,
  pause: null,
  diff: null,
  minutes: null,
  seconds: null,
  completedTime: null,
  duration: null,
  expired: false,
  running: false
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

  interval = setInterval(() => {
    dispatch(tick())
  }, 1000)
}

export const saveTime = () => {
  return { type: 'SAVE_TIME' }
}

export const stopTimer = (dispatch) => {
  clearInterval(interval)
  dispatch(saveTime())
  dispatch(setTimer())
}

export const pauseTimer = () => {
  clearInterval(interval)
  return { type: 'PAUSE_TIMER' }
}

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TIMER':
      const duration = action.payload?.duration || state.duration
      let minutes = duration / 60 | 0
      let seconds = '00'

      minutes = minutes < 10 ? '0' + minutes : minutes
      return { ...state, duration: duration, minutes, seconds, running: false, pause: null }
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
      const start = state.pause
        ? (Date.now() - state.pause) + state.start
        : Date.now()
      return { ...state, start, running: true }
    case 'PAUSE_TIMER':
      return { ...state, pause: Date.now(), running: false }
    case 'SAVE_TIME':
      const completedTime = state.pause
      ? state.pause - state.start
      : Date.now() - state.start
      return { ...state, completedTime }
    default:
      return state
  }
}

export default timerReducer