const user = JSON.parse(window.localStorage.getItem('user'))

export const setUser = user => {
  return { type: 'SET_USER', payload: user}
}

export const logout = () => {
  return { type: 'SET_USER', payload: null}
}

const userReducer = (state = user, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return action.payload
    }
    default:
      return state
  }
}

export default userReducer