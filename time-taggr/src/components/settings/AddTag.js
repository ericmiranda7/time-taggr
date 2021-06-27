import { useDispatch, useSelector } from 'react-redux'
import { addTag } from '../../reducers/tagsReducer'

const AddTag = ({ isTimerRunning }) => {
  const dispatch = useDispatch()

  const handleKeyDown = async event => {
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
      <span className="d-inline-flex flex-grow-1 centered-text-span" >Add Tag</span>
      <input className="" style={{ width: '8.2em' }} onKeyDown={handleKeyDown} disabled={isTimerRunning} ></input>
    </div>
  )
}

export default AddTag