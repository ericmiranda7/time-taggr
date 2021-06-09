import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setTimer, startTimer, stopTimer, pauseTimer } from '../reducers/timerReducer'
import { Button } from 'react-bootstrap'

const Clock = ({ timer }) => {
  const styles = {
    clock: {
      height: '350px',
      width: '350px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderStyle: 'solid',
      borderWidth: '0.5em'
    },
    'time-text': {
      fontSize: '50px'
    }
  }

  return (
    <div className="mx-auto rounded-circle" style={styles.clock}>
      <p className="mb-0" style={styles['time-text']}>{timer.hours}:{timer.minutes}:{timer.seconds}</p>
    </div>
  )
}

const ControlButton = ({ variant, text, handleClick }) => {
  return (
    <Button variant={variant} className="mx-auto" onClick={handleClick} style={{ width: '175px', display: 'block' }}>{text}</Button>
  )
}

const TimerControls = ({ timer, dispatch }) => {
  const handleStartClick = () => {
    startTimer(dispatch)
  }

  const handleStopClick = () => {
    stopTimer(dispatch, timer.duration)
  }

  const handlePauseClick = () => {
    dispatch(pauseTimer())
  }

  if (!timer.running) {
    return (
      <div>
        <ControlButton variant="primary" text="Start" handleClick={handleStartClick} />
        {timer.pause
          ? <ControlButton variant="danger" text="Stop" handleClick={handleStopClick} />
          : ''}
      </div>
    )
  } else if (timer.running) {
    return (
      <div>
        <ControlButton variant="primary" text="Pause" handleClick={handlePauseClick} />
        <ControlButton variant="danger" text="Stop" handleClick={handleStopClick} />
      </div>
    )

  }
}

const Timer = () => {
  const timer = useSelector(state => state.timer)
  const selectedTag = useSelector(({tags}) => {
    return tags.find(tag => {
      return tag.isSelected
    })
  })
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('effect run, tag:', selectedTag)
    dispatch(setTimer(selectedTag?.duration || 0))
  }, [dispatch, selectedTag])

  return (
    <div>
      <Clock timer={timer} />
      <div className="align-items-center mt-3">
        <TimerControls timer={timer} dispatch={dispatch} />

        <p className="text-center">Completed time: {timer.completedTime / 1000} seconds</p>
      </div>
    </div>
  )
}

export default Timer