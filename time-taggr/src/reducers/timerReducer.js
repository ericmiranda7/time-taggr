import { addCompletedTime, makeSelected } from "./tagsReducer"

const initialState = {
  startTime: null,
  running: false,
  duration: null,
  diff: null,
  hours: null,
  minutes: null,
  seconds: null,
  completedTime: 0,
  expired: null,
  stopped: null,
  pause: null,
}

// timer interval
let interval = null

// setters
export const setDuration = tag => {
  const duration = tag.duration * 60
  return {
    type: 'SET_DURATION',
    payload: { duration }
  }
}

export const startTimer = dispatch => {
  dispatch({ type: 'START_TIMER' })
  dispatch({ type: 'TICK' })

  interval = setInterval(() => {
    dispatch({ type: 'TICK' })
  }, 1000)
}

export const stopTimer = (dispatch, tag) => {
  clearInterval(interval)
  dispatch({ type: 'STOP_TIMER' })
  dispatch(setDuration(tag))
}

export const pauseTimer = () => {
  return { type: 'PAUSE_TIMER' }
}

export const resumeTimer = (dispatch) => {
  dispatch({ type: 'RESUME_TIMER' })
  dispatch({ type: 'TICK' })

  interval = setInterval(() => {
    dispatch({ type: 'TICK' })
  }, 1000)
}

export const consumeCompletedTime = () => {
  return { type: 'CONSUME_COMPLETED_TIME' }
}

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DURATION': {
      const duration = action.payload?.duration || state.duration
      let hours = (duration / 3600) | 0
      let minutes = ((duration / 60 | 0) % 60)
      let seconds = '00'

      minutes = minutes < 10 ? '0' + minutes : minutes
      hours = hours < 10 ? '0' + hours : hours
      return { ...state, duration, hours, minutes, seconds, running: false }
    }

    case 'START_TIMER': {
      const startTime = Date.now()

      return { ...state, startTime, running: true }
    }

    case 'TICK': {
      const diff = state.duration - (((Date.now() - state.startTime) / 1000) | 0)

      let hours = (diff / 3600) | 0
      let minutes = (((diff / 60)) | 0) % 60
      let seconds = (diff % 60) | 0

      hours = hours < 10 ? "0" + hours : hours
      minutes = minutes < 10 ? "0" + minutes : minutes
      seconds = seconds < 10 ? "0" + seconds : seconds

      let expired = false, completedTime
      if (diff <= 0) {
        expired = true
        clearInterval(interval)
        // if naturally expired,  completed time is duration of timer
        completedTime = state.duration
      }

      return { ...state, diff, hours, minutes, seconds, completedTime, expired }
    }

    case 'STOP_TIMER': {
      // compute completed time
      const completedTime = state.duration - state.diff
      return { ...state, completedTime, stopped: true, running: false, pause: null}
    }

    case 'PAUSE_TIMER': {
      clearInterval(interval)
      return { ...state, pause: Date.now(), running: false }
    }

    case 'RESUME_TIMER': {
      const startTime = (Date.now() - state.pause) + state.startTime

      return { ...state, startTime, running: true }
    }

    case 'CONSUME_COMPLETED_TIME': {
      return { ...state, expired: false, stopped: false, running: false }
    }

    default:
      return state
  }
}

export default timerReducer