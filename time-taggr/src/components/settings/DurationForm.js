import { useSelector, useDispatch } from 'react-redux'
import { setBreakDuration, setTagDuration } from '../../reducers/tagsReducer'

const styles = {
  duration: {
    width: '4em',
    textAlign: 'right'
  },
  spanAlignCenter: {
    alignItems: 'center'
  }
}

const DurationForm = ({ selectedTag, isTimerRunning }) => {
  const breakTime = useSelector(state => {
    const duration = selectedTag.break
    return {
      minutes: duration % 60,
      hours: (duration / 60 | 0)
    }
  })
  const selectedTagTime = {
    minutes: selectedTag.duration % 60,
    hours: (selectedTag.duration / 60 | 0)
  }
  const dispatch = useDispatch()

  const hoursChangeHandler = (event) => {
    if (event.target.name.includes('break')) {
      const duration = Number(event.target.value) * 60 + breakTime.minutes
      dispatch(setBreakDuration(duration, selectedTag.value))
    }
    else {
      const duration = Number(event.target.value) * 60 + Number(selectedTagTime.minutes)
      dispatch(setTagDuration(duration))
    }
  }

  const minutesChangeHandler = (event) => {
    if (event.target.name.includes('break')) {
      const duration = breakTime.hours * 60 + Number(event.target.value)
      dispatch(setBreakDuration(duration, selectedTag.value))
    }
    else {
      const duration = Number(event.target.value) + (Number(selectedTagTime.hours) * 60)
      dispatch(setTagDuration(duration))
    }

    if (event.target.value > 59) event.target.value = ''
  }

  const clearInput = (event) => event.target.value = ''

  return (
    <div className="d-flex justify-content-end flex-column">
      <div className="d-flex flex-row">
        <span className="d-inline-flex flex-grow-1" style={styles.spanAlignCenter} >Work</span>
        <input className="mr-1" disabled={isTimerRunning} type="number" onChange={hoursChangeHandler} onBlur={clearInput} style={styles.duration} name="hours" placeholder={selectedTagTime.hours + 'H'} />
        <input type="number" disabled={isTimerRunning} onChange={minutesChangeHandler} onBlur={clearInput} style={styles.duration} name="minutes" placeholder={selectedTagTime.minutes + 'M'} />
      </div>
      <div className="d-flex flex-row mt-1">
        <span className="d-inline-flex flex-grow-1" style={styles.spanAlignCenter} >Break</span>
        <input className="mr-1" disabled={isTimerRunning} type="number" onBlur={clearInput} onChange={hoursChangeHandler} style={styles.duration} name="breakHours" placeholder={breakTime.hours + 'H'} />
        <input type="number" disabled={isTimerRunning} onChange={minutesChangeHandler} onBlur={clearInput} style={styles.duration} name="breakMinutes" placeholder={breakTime.minutes + 'M'} />
      </div>
    </div>
  )
}

export default DurationForm