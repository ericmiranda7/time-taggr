import { Card, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import TagSelect from './TagSelect'
import DurationForm from './DurationForm'
import AddTag from './AddTag'
import DeleteTag from './DeleteTag'
import Toggle from 'react-toggle'
import userService from '../../services/userService'

const Settings = () => {
  const tags = useSelector(state => state.tags)
  const selectedTag = tags.find(tag => tag.isSelected)

  const isTimerRunning = useSelector(state => state.timer.running || state.timer.pause)

  const handlePomodoroSettingChange = (e) => userService.saveSettings({ pomodoro: e.target.checked })

  return (
    <div className="d-flex justify-content-center">
      <Card style={{ width: '18rem' }}>
        <Card.Header>Settings</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className="text-center">{selectedTag.name}</div>
          </ListGroup.Item>
          <ListGroup.Item>
            <div className="d-flex">
              <span className="d-inline-flex flex-grow-1 centered-text-span"><a href="https://sketchplanations.com/the-pomodoro-technique">Pomodoro</a></span>
              <Toggle
                defaultChecked={true}
                onChange={handlePomodoroSettingChange}
              />
            </div>
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
          <ListGroup.Item>
            <DeleteTag isTimerRunning={isTimerRunning} />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  )
}

export default Settings