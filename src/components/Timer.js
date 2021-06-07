import {useSelector, useDispatch } from 'react-redux'
import {useEffect} from 'react'
import { setTimer, startTimer, stopTimer, pauseTimer } from '../reducers/timerReducer'
import Clock from './Clock'
import { Button } from 'react-bootstrap'

const Timer = () => {
  const timer = useSelector(state => state)
  const dispatch = useDispatch()

  // initialise timer
  useEffect(() => {
    dispatch(setTimer(1))
  }, [dispatch])

  const handleStartClick = () => {
    startTimer(dispatch)
  }

  const handleStopClick = () => {
    stopTimer(dispatch)
  }

  const handlePauseClick = () => {
    dispatch(pauseTimer())
  }
  return (
    <div>
      <Clock timer={timer} />
      <div className="align-items-center mt-3">
        {timer.running
          ? <div>
            <Button variant="primary" className="mx-auto" onClick={handlePauseClick} style={{ width: '175px', display: 'block' }}>Pause</Button>
            <Button variant="danger" className="mx-auto mt-1" style={{ width: '175px', display: 'block' }} onClick={handleStopClick}>Stop</Button>
          </div>
          : timer.pause ?
            <div>
              <Button variant="primary" className="mx-auto" onClick={handleStartClick} style={{ width: '175px', display: 'block' }}>Start</Button>
              <Button variant="danger" className="mx-auto mt-1" style={{ width: '175px', display: 'block' }} onClick={handleStopClick}>Stop</Button>
            </div>
            : <Button variant="primary" className="mx-auto" onClick={handleStartClick} style={{ width: '175px', display: 'block' }}>Start</Button>}


        <p>Completed time: {timer.completedTime / 1000} seconds</p>
      </div>
    </div>
  )
}

export default Timer