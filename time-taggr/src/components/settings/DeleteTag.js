import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { deleteSelected } from "../../reducers/tagsReducer"

const DeleteTag = ({ isTimerRunning }) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteSelected())
  }
  return (
    <div className="d-flex">
      <Button variant="danger" onClick={handleDelete} className="btn-sm flex-grow-1">Delete Tag</Button>
    </div>
  )
}

export default DeleteTag