import { Button } from 'react-bootstrap'
import { startTimer, setDuration, stopTimer, pauseTimer, resumeTimer } from '../../reducers/timerReducer'
import { makeSelected, addTagToBreak } from '../../reducers/tagsReducer'
import { useSelector } from 'react-redux'

const ControlButton = ({ variant, text, handleClick }) => {
  return (
    <Button variant={variant} className="mx-auto mb-1" onClick={handleClick} style={{ width: '175px', display: 'block' }}>{text}</Button>
  )
}

const TimerControls = ({ timer, dispatch, selectedTag }) => {
  const userSettings = useSelector(state => state.user.settings)
  console.log(userSettings.pomodoro)
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
    dispatch(setDuration({ duration: selectedTag.break }))
    startTimer(dispatch)
  }

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
            {selectedTag.value !== 'break' && userSettings.pomodoro
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

export default TimerControls