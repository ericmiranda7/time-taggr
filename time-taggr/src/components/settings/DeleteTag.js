import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteSelected, makeSelected } from "../../reducers/tagsReducer"

const DeleteTag = ({ isTimerRunning }) => {
  const dispatch = useDispatch()
  const tags = useSelector(state => state.tags)
  const selectedTag = tags.find(tag => tag.isSelected)

  const isDisabled = isTimerRunning || tags.length === 2

  const handleDelete = () => {
    dispatch(makeSelected(tags.find(tag => tag.value !== 'break' && tag.value !== selectedTag.value).value))
    dispatch(deleteSelected(tags.find(tag => tag.isSelected).value))
  }
  return (
    <div className="d-flex">
      <Button variant="danger" onClick={handleDelete} disabled={isDisabled} className="btn-sm flex-grow-1">Delete Tag</Button>
    </div>
  )
}

export default DeleteTag