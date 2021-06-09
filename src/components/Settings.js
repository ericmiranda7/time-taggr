import { Card, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { makeSelected, addTag } from '../reducers/tagsReducer'
import { setTimer } from '../reducers/timerReducer'

const styles = {
  duration: {
    width: '4em',
    textAlign: 'right'
  },
  spanAlignCenter: {
    alignItems: 'center'
  }
}

const DurationForm = () => {
  const timer = useSelector(state => state.timer)
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
      <span className="d-inline-flex flex-grow-1" style={styles.spanAlignCenter} >Duration</span>
      <div className="">
        <input className="mr-1" type="number" onChange={hoursChangeHandler} style={styles.duration} name="hours" placeholder={timer.hours + 'H'} />
        <input type="number" onChange={minutesChangeHandler} style={styles.duration} name="minutes" placeholder={timer.minutes + 'M'} />
      </div>
    </div>
  )
}

const TagSelect = () => {
  const tags = useSelector(state => state.tags)
  const dispatch = useDispatch()

  const onTagSelected = event => {
    const tag = {name: event.target.value}
    
    dispatch(makeSelected(tag))
  }

  return (
    <div className="d-flex">
      <span className="flex-grow-1" >Select Tag</span>
      <select onChange={onTagSelected} style={{width: '8em'}}>
        <option>SELECT TAG</option>
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
        selected: false
      }
      event.target.value = ''
      dispatch(addTag(tag))
    }
  }

  return (
    <div className="d-flex">
      <span className="d-inline-flex flex-grow-1" style={styles.spanAlignCenter}>Add Tag</span>
      <input className="" style={{width: '8em'}} onKeyDown={handleKeyDown}></input>
    </div>
  )
}

const Settings = () => {
  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '18rem' }}>
        <Card.Header>Settings</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <DurationForm />
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