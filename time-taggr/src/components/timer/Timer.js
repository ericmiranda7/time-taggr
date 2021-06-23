import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { startTimer, consumeCompletedTime, setDuration } from '../../reducers/timerReducer'
import { addCompletedTime, makeSelected, addTagToBreak } from '../../reducers/tagsReducer'
import Clock from './Clock'
import TimerControls from './TimerControls'

const Timer = () => {
  const timer = useSelector(state => state.timer)
  const dispatch = useDispatch()

  const selectedTag = useSelector(({ tags }) => tags.find(tag => tag.isSelected))

  useEffect(() => {
    // If the timer isn't running AND isn't paused
    if (!(timer.running || timer.pause)) {
      if (selectedTag.value === 'break') dispatch(makeSelected(selectedTag.workTag))
      else dispatch(setDuration(selectedTag))
    }
  }, [dispatch, selectedTag, timer.pause, timer.running])

  useEffect(() => {
    const expired = timer.expired
    if (timer.expired || timer.stopped) {
      dispatch(addCompletedTime(selectedTag.value, timer.completedTime))
      dispatch(consumeCompletedTime())

      // if expired naturally
      if (expired && selectedTag.value !== 'break') {
        // Start breaking
        dispatch(addTagToBreak(selectedTag.value))
        dispatch(makeSelected('break'))
        dispatch(setDuration({ duration: selectedTag.break }))
        startTimer(dispatch)
      }
    }
  }, [dispatch, selectedTag, timer])

  return (
    <div>
      <Clock timer={timer} />
      <div className="align-items-center mt-3">
        <TimerControls timer={timer} dispatch={dispatch} selectedTag={selectedTag} />
      </div>
    </div>
  )
}

export default Timer