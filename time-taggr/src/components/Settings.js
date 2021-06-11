import { Card, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { makeSelected, addTag, setBreakDuration, setTagDuration } from '../reducers/tagsReducer'
import Select from 'react-select'

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
    const breakTag = state.tags.find(tag => tag.value === 'break')
    return {
      minutes: breakTag.duration % 60,
      hours: (breakTag.duration / 60 | 0)
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
      dispatch(setBreakDuration(duration))
    }
    else {
      const duration = Number(event.target.value) * 60 + Number(selectedTagTime.minutes)
      dispatch(setTagDuration(duration))
    }
  }

  const minutesChangeHandler = (event) => {
    if (event.target.name.includes('break')) {
      const duration = breakTime.hours * 60 + Number(event.target.value)
      dispatch(setBreakDuration(duration))
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

const AddTag = ({isTimerRunning}) => {
  const dispatch = useDispatch()

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      const tag = {
        name: event.target.value,
        color: 'gray',
      }
      event.target.value = ''
      dispatch(addTag(tag))
    }
  }

  return (
    <div className="d-flex">
      <span className="d-inline-flex flex-grow-1" style={styles.spanAlignCenter}>Add Tag</span>
      <input className="" style={{ width: '8.2em' }} onKeyDown={handleKeyDown} disabled={isTimerRunning} ></input>
    </div>
  )
}

const TagSelect = ({ options, dispatch, isTimerRunning }) => {
  const onTagSelected = itemSelected => {
    dispatch(makeSelected(itemSelected.value))
  }

  return (
    <div className="d-flex">
      <span className="d-inline-flex flex-grow-1" style={styles.spanAlignCenter} >Select Tag</span>
      <div style={{ width: '8.2em' }}>
        <Select options={options} onChange={onTagSelected} isDisabled={isTimerRunning}/>
      </div>
    </div>
  )
}

const Settings = () => {
  const tags = useSelector(state => state.tags)
  const selectedTag = tags.find(tag => tag.isSelected)

  const isTimerRunning = useSelector(state => state.timer.running || state.timer.pause)

  const dispatch = useDispatch()

  const options = tags.map(tag => { return { value: tag.value, label: tag.name } })

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '18rem' }}>
        <Card.Header>Settings</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <DurationForm selectedTag={selectedTag} isTimerRunning={isTimerRunning} />
          </ListGroup.Item>
          <ListGroup.Item>
            <TagSelect selectedTag={selectedTag} options={options} dispatch={dispatch} isTimerRunning={isTimerRunning} />
          </ListGroup.Item>
          <ListGroup.Item>
            <AddTag isTimerRunning={isTimerRunning} />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}

export default Settings