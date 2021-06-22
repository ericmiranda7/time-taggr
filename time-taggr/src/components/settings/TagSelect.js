import { useSelector } from 'react-redux'
import { makeSelected } from '../../reducers/tagsReducer'
import Select from 'react-select'

const TagSelect = ({ options, dispatch, isTimerRunning }) => {
  const selectedTag = useSelector(state => state.tags.find(tag => tag.isSelected))
  const selectedValue = { value: selectedTag.value, label: selectedTag.name }
  const onTagSelected = itemSelected => {
    dispatch(makeSelected(itemSelected.value))
  }

  return (
    <div className="d-flex">
      <span className="d-inline-flex flex-grow-1 centered-text-span">Select Tag</span>
      <div style={{ width: '8.2em' }}>
        <Select options={options} onChange={onTagSelected} isDisabled={isTimerRunning} value={selectedValue} />
      </div>
    </div>
  )
}

export default TagSelect