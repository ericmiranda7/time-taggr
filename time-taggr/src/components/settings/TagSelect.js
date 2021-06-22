import { useSelector, useDispatch } from 'react-redux'
import { makeSelected } from '../../reducers/tagsReducer'
import Select from 'react-select'

const TagSelect = ({ isTimerRunning, width }) => {
  const tags = useSelector(state => state.tags)
  const dispatch = useDispatch()
  
  const options = tags.map(tag => { return { value: tag.value, label: tag.name } }).filter(tag => tag.value !== 'break')

  const selectedTag = useSelector(state => state.tags.find(tag => tag.isSelected))
  const selectedValue = { value: selectedTag.value, label: selectedTag.name }
  const onTagSelected = itemSelected => {
    dispatch(makeSelected(itemSelected.value))
  }

  return (
      <div style={{ width }}>
        <Select options={options} onChange={onTagSelected} isDisabled={isTimerRunning} value={selectedValue} />
      </div>
  )
}

export default TagSelect