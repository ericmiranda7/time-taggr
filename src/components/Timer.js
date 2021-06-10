import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { startTimer, stopTimer, pauseTimer, consumeCompletedTime, setDuration, resumeTimer } from '../reducers/timerReducer'
import { addCompletedTime } from '../reducers/tagsReducer'
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
    <Button variant={variant} className="mx-auto mb-1" onClick={handleClick} style={{ width: '175px', display: 'block' }}>{text}</Button>
  )
}

const TimerControls = ({ timer, dispatch, selectedTag }) => {
  const handleStartClick = () => startTimer(dispatch)
  const handleStopClick = () => stopTimer(dispatch, selectedTag)
  const handlePauseClick = () => dispatch(pauseTimer())
  const handleResumeClick = () => resumeTimer(dispatch)

  if (!timer.running) {
    return (
      <div>
        {timer.pause
          ? <div>
            <ControlButton variant="primary" text="Resume" handleClick={handleResumeClick} />
            <ControlButton variant="danger" text="Stop" handleClick={handleStopClick} />
          </div>
          : <ControlButton variant="primary" text="Start" handleClick={handleStartClick} />}
      </div>
    )
  } else {
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
  const selectedTag = useSelector(({ tags }) => {
    return tags.find(tag => {
      return tag.isSelected
    })
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setDuration(selectedTag || 0))
  }, [dispatch, selectedTag])

  useEffect(() => {
    /*     if (timer.completedTime > 0 && timer.expired) {
          dispatch(addCompletedTime(selectedTag?.name, timer.completedTime))
          dispatch(consumeCompletedTime())
        } */

    // if expired OR stopped, getCompletedTime
    if (timer.expired || timer.stopped) {
      dispatch(addCompletedTime(selectedTag?.name, timer.completedTime))
      dispatch(consumeCompletedTime())
    }
  }, [dispatch, selectedTag, timer])

  return (
    <div>
      <Clock timer={timer} />
      <div className="align-items-center mt-3">
        <TimerControls timer={timer} dispatch={dispatch} selectedTag={selectedTag} />

        <p className="text-center">Completed time: {timer.completedTime / 1000} seconds</p>
        <p className="text-center">Completed time tag: {selectedTag?.completedTime} seconds</p>
      </div>
    </div>
  )
}

export default Timer