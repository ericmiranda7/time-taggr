import { Card, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import TagSelect from './TagSelect'
import DurationForm from './DurationForm'
import AddTag from './AddTag'
import DeleteTag from './DeleteTag'
import Toggle from 'react-toggle'
import { saveSettings } from '../../reducers/userReducer'

const Settings = () => {
  const tags = useSelector(state => state.tags)
  const selectedTag = tags.find(tag => tag.isSelected)
  const userSettings = useSelector(state => state.user?.settings)
  console.log(userSettings)

  const dispatch = useDispatch()

  const isTimerRunning = useSelector(state => state.timer.running || state.timer.pause)

  const handlePomodoroSettingChange = (e) => dispatch(saveSettings(e.target.checked))

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
                checked={userSettings?.pomodoro || false}
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