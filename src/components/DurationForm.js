import { useSelector, useDispatch } from 'react-redux'
import { setTimer } from '../reducers/timerReducer'

const styles = {
  duration: {
    width: '4em',
    textAlign: 'right'
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
    <div className="d-flex justify-content-end">
      <span className="d-inline-flex flex-grow-1" style={{alignItems: 'center'}} >Duration:</span>
      <div className="">
        <input className="mr-1" type="number" onChange={hoursChangeHandler} style={styles.duration} name="hours" placeholder={timer.hours + 'H'} />
        <input type="number" onChange={minutesChangeHandler} style={styles.duration} name="minutes" placeholder={timer.minutes + 'M'} />
      </div>
    </div>
  )
}

export default DurationForm