import { Card, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { makeSelected, addTag, setBreakDuration, setTagDuration } from '../reducers/tagsReducer'

const styles = {
  duration: {
    width: '4em',
    textAlign: 'right'
  },
  spanAlignCenter: {
    alignItems: 'center'
  }
}

const DurationForm = ({selectedTag}) => {
  const timer = useSelector(state => state.timer)
  const breakTime = useSelector(state => {
    const breakTag = state.tags.find(tag => tag.name === 'Break')
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
        <input className="mr-1" type="number" onChange={hoursChangeHandler} onBlur={clearInput} style={styles.duration} name="hours" placeholder={timer.hours + 'H'} />
        <input type="number" onChange={minutesChangeHandler} onBlur={clearInput} style={styles.duration} name="minutes" placeholder={timer.minutes + 'M'} />
      </div>
      <div className="d-flex flex-row mt-1">
        <span className="d-inline-flex flex-grow-1" style={styles.spanAlignCenter} >Break</span>
        <input className="mr-1" type="number" onBlur={clearInput} onChange={hoursChangeHandler} style={styles.duration} name="breakHours" placeholder={breakTime.hours + 'H'} />
        <input type="number" onChange={minutesChangeHandler} onBlur={clearInput} style={styles.duration} name="breakMinutes" placeholder={breakTime.minutes + 'M'} />
      </div>
    </div>
  )
}

const TagSelect = () => {
  const tags = useSelector(state => state.tags)
  const dispatch = useDispatch()

  const onTagSelected = event => {
    const tagName = event.target.value
    dispatch(makeSelected(tagName))
  }

  return (
    <div className="d-flex">
      <span className="flex-grow-1" >Select Tag</span>
      <select onChange={onTagSelected} style={{ width: '8.2em' }} defaultValue={tags.filter(tag => tag.isSelected).name}>
        {tags.map((tag, i) => <option key={i} value={tag.name}>{tag.name}</option>)}
      </select>
    </div>
  )
}

const AddTag = () => {
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
      <input className="" style={{ width: '8.2em' }} onKeyDown={handleKeyDown}></input>
    </div>
  )
}

const Settings = () => {
  const selectedTag = useSelector(state => state.tags.find(tag => tag.isSelected))

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '18rem' }}>
        <Card.Header>Settings</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <DurationForm selectedTag={selectedTag} />
          </ListGroup.Item>
          <ListGroup.Item>
            <TagSelect />
          </ListGroup.Item>
          <ListGroup.Item>
            <AddTag />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}

export default Settings