import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { startTimer, stopTimer, pauseTimer, consumeCompletedTime, setDuration, resumeTimer } from '../reducers/timerReducer'
import { addCompletedTime, makeSelected, addTagToBreak } from '../reducers/tagsReducer'
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
  const handleStopClick = () => {
    stopTimer(dispatch, selectedTag)
    if (selectedTag.value === 'break') {
      setTimeout(() => dispatch(makeSelected(selectedTag.workTag)), 500)
    } else {
      dispatch(setDuration(selectedTag.duration))
    }
  }
  const handlePauseClick = () => dispatch(pauseTimer())
  const handleResumeClick = () => resumeTimer(dispatch)
  const handleBreakClick = () => {
    dispatch(addTagToBreak(selectedTag.value))
    dispatch(makeSelected('break'))
    dispatch(setDuration({ duration: selectedTag.break}))
    startTimer(dispatch)
  }

  // timer NOT running
  if (!timer.running) {
    return (
      <div>
        {timer.pause
          ? <div>
            <ControlButton variant="primary" text="Resume" handleClick={handleResumeClick} />
            <ControlButton variant="danger" text="Stop" handleClick={handleStopClick} />
          </div>
          : <div>
            <ControlButton variant="primary" text="Start" handleClick={handleStartClick} />
            {selectedTag.value !== 'break'
              ? <ControlButton variant="success" text="Break" handleClick={handleBreakClick} />
              : null}

          </div>}
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
  const timer = useSelector(state => {
    return state.timer
  })

  const selectedTag = useSelector(({ tags }) => {
    return tags.find(tag => {
      return tag.isSelected
    })
  })
  const dispatch = useDispatch()

  useEffect(() => {
    if (!(timer.running || timer.pause)) {
      if (selectedTag.value === 'break') dispatch(makeSelected(selectedTag.workTag))
      else dispatch(setDuration(selectedTag || 0))
    }
  }, [dispatch, selectedTag, timer.pause, timer.running])

  useEffect(() => {
    if (timer.expired || timer.stopped) {
      dispatch(addCompletedTime(selectedTag.value, timer.completedTime))
      dispatch(consumeCompletedTime())
    }
  }, [dispatch, selectedTag, timer])

  return (
    <div>
      <Clock timer={timer} />
      <div className="align-items-center mt-3">
        <TimerControls timer={timer} dispatch={dispatch} selectedTag={selectedTag} />

{/*         {selectedTag.completedTime > 0
          ? <p className="text-center">You have completed {selectedTag?.completedTime} seconds of {selectedTag.name.toLowerCase()}</p>
          : <p className="text-center">You haven't put in any time on tag: {selectedTag.name}</p>} */}

      </div>
    </div>
  )
}

export default Timer