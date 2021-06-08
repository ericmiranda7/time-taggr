import { useSelector, useDispatch } from 'react-redux'
import { setTimer } from '../reducers/timerReducer'

const styles = {
  duration: {
    width: '3em'
  }
}

const DurationForm = () => {
  const timer = useSelector(state => state)
  const dispatch = useDispatch()

  const hoursChangeHandler = (event) => {
    const duration = Number(event.target.value) * 60 + Number(timer.minutes)
    dispatch(setTimer(duration))
  }

  const minutesChangeHandler = (event) => {
    const duration = Number(event.target.value) + (Number(timer.hours) * 60)

    if (event.target.value > 59) {
      event.target.value = ''
    }
    dispatch(setTimer(duration))
  }

  return (
    <div >
      Duration:
      <input type="number" onChange={hoursChangeHandler} style={styles.duration} name="hours" placeholder={timer.hours || ''} />
      <input type="number" onChange={minutesChangeHandler} style={styles.duration} name="minutes" placeholder={timer.minutes || ''}/>
    </div>
  )
}

export default DurationForm