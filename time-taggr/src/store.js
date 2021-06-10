import { createStore, combineReducers } from 'redux'
import timerReducer from './reducers/timerReducer'
import tagsReducer from './reducers/tagsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const combinedReducer = combineReducers({
  timer: timerReducer, tags: tagsReducer
})

const store = createStore(combinedReducer, composeWithDevTools())

export default store