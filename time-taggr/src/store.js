import { createStore, combineReducers, applyMiddleware } from 'redux'
import timerReducer from './reducers/timerReducer'
import tagsReducer from './reducers/tagsReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const combinedReducer = combineReducers({
  timer: timerReducer, tags: tagsReducer, user: userReducer,
})

const store = createStore(combinedReducer, composeWithDevTools(applyMiddleware(thunk)))

export default store