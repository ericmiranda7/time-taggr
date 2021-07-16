import userService from "../services/userService"

const user = JSON.parse(window.localStorage.getItem('user'))

export const setUser = user => {
  return { type: 'SET_USER', payload: user }
}

export const logout = () => {
  return { type: 'SET_USER', payload: null }
}

export const saveSettings = (pomodoro) => {
  return async (dispatch, getState) => {
    dispatch({ type: 'SET_POMODORO_MODE', payload: pomodoro })
    console.log('BUBU', getState().user)
    if (getState().user.username === null) userService.saveSettings({ pomodoro })
  }
}

const userReducer = (state = user, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return action.payload
    }
    case 'SET_POMODORO_MODE': {
      return { ...state, settings: { pomodoro: action.payload } }
    }
    default:
      return state
  }
}

export default userReducer