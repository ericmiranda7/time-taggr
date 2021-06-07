import { createStore } from 'redux'
import timerReducer from './reducers/timerReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(timerReducer, composeWithDevTools())

export default store