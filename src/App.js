import NavigationBar from './components/NavigationBar'
import Clock from './components/Clock'
import { useDispatch, useSelector } from 'react-redux'
import { setTimer, startTimer } from './reducers/timerReducer'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'

const App = () => {
  const timer = useSelector(state => state)
  const dispatch = useDispatch()

  // initialise timer
  useEffect(() => {
  dispatch(setTimer(1))
  }, [dispatch])

  const handleStartTimerClick = () => {
    startTimer(dispatch)
  }

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        <Clock timer={timer} />
        <Button variant="primary" onClick={handleStartTimerClick}>Start</Button>
      </div>
    </div>
  )
}

export default App;
