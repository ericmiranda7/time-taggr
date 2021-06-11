import tagService from '../services/tagService'

const initialState = [
  {
    name: 'Study',
    value: 'study',
    color: 'blue',
    isSelected: true,
    duration: 25,
    completedTime: 0,
    id: 1,
  },
  {
    name: 'Workout',
    value: 'workout',
    color: 'green',
    isSelected: false,
    duration: 25,
    completedTime: 0,
    id: 2,
  },
  {
    name: 'Break',
    value: 'break',
    color: 'white',
    isSelected: false,
    duration: 70,
    completedTime: 0,
    id: 3,
  },
]

export const getAllTags = () => {
  return async dispatch => {
    const tags = await tagService.getAll()
    dispatch({ type: 'INIT_TAG', payload: { tags } })
  }
}

export const addTag = (tag) => {
  return async dispatch => {
    const savedTag = await tagService.createTag(tag)
    dispatch({
      type: 'ADD_TAG',
      payload: { tag: savedTag }
    })
  }
}

export const makeSelected = tagName => {
  return {
    type: 'MAKE_SELECTED',
    payload: { tagName }
  }
}

export const setBreakDuration = (duration) => {
  return setTagDuration(duration, 'Break')
}

export const setTagDuration = (duration, tagName) => {
  return {
    type: 'SET_TAG_DURATION',
    payload: { duration, tagName }
  }
}

export const addCompletedTime = (tagName, completedTime) => {
  return {
    type: 'ADD_COMPLETION',
    payload: { tagName, completedTime }
  }
}

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_TAG':
      return [...action.payload.tags]

    case 'ADD_TAG':
      console.log(action.payload.tag)
      return state.map(tag => { return { ...tag, isSelected: false } }).concat(action.payload.tag)

    case 'MAKE_SELECTED':
      return state.map(tag => tag.name === action.payload.tagName ? { ...tag, isSelected: true } : { ...tag, isSelected: false })

    case 'SET_TAG_DURATION':
      if (action.payload.tagName === 'Break') return state.map(tag => tag.name === 'Break' ? { ...tag, duration: action.payload.duration } : tag)
      else return state.map(tag => tag.isSelected ? { ...tag, duration: action.payload.duration } : tag)

    case 'ADD_COMPLETION':
      return state.map(tag => tag.name === action.payload.tagName ? { ...tag, completedTime: tag.completedTime + action.payload.completedTime } : tag)

    default:
      return state
  }

}

export default tagsReducer