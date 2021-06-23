import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { startTimer, consumeCompletedTime, setDuration } from '../../reducers/timerReducer'
import { addCompletedTime, makeSelected, addTagToBreak } from '../../reducers/tagsReducer'
import Clock from './Clock'
import TimerControls from './TimerControls'

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
    const expired = timer.expired
    if (timer.expired || timer.stopped) {
      dispatch(addCompletedTime(selectedTag.value, timer.completedTime))
      dispatch(consumeCompletedTime())

      if (expired && selectedTag.value !== 'break') {
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