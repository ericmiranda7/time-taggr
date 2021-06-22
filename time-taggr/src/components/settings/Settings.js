import { Card, ListGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import TagSelect from './TagSelect'
import DurationForm from './DurationForm'
import AddTag from './AddTag'

const Settings = () => {
  const tags = useSelector(state => state.tags)
  const selectedTag = tags.find(tag => tag.isSelected)

  useEffect(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags))
  }, [tags])

  const isTimerRunning = useSelector(state => state.timer.running || state.timer.pause)

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '18rem' }}>
        <Card.Header>Settings</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className="text-center">{selectedTag.name}</div>
          </ListGroup.Item>
          <ListGroup.Item>
            <DurationForm selectedTag={selectedTag} isTimerRunning={isTimerRunning} />
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex">
              <span className="d-inline-flex flex-grow-1 centered-text-span" >Select Tag</span>
              <TagSelect isTimerRunning={isTimerRunning} width="8.2em" />
            </div>
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