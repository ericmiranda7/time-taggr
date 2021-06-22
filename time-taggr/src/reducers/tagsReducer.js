import tagService from '../services/tagService'

const initialState = tagService.getLocalData()

export const getAllTags = () => {
  return async dispatch => {
    const tags = await tagService.getAll()
    dispatch({ type: 'INIT_TAG', payload: { tags } })
  }
}

export const getLocalTags = () => {
  const tags = tagService.getLocalData()
  return {
    type: 'INIT_TAG',
    payload: { tags }
  }
}

export const addTag = (tag) => {
  /*   return async dispatch => {
      //const savedTag = await tagService.createTag(tag)
      dispatch({
        type: 'ADD_TAG',
        payload: { tag: tag }
      })
    } */
  const cleanTag = tagService.processTag(tag)
  return {
    type: 'ADD_TAG',
    payload: { tag: cleanTag }
  }
}

export const makeSelected = tagValue => {
  return {
    type: 'MAKE_SELECTED',
    payload: { tagValue }
  }
}

export const addTagToBreak = tagValue => {
  return {
    type: 'SAVE_WORK_TAG_TO_BREAK',
    payload: { tagValue }
  }
}

export const setBreakDuration = (duration, tagValue) => {
  return {
    type: 'SET_TAG_BREAK_DURATION',
    payload: { duration, tagValue }
  }
}

export const setTagDuration = (duration, tagValue) => {
  return {
    type: 'SET_TAG_DURATION',
    payload: { duration, tagValue }
  }
}

export const addCompletedTime = (tagValue, completedTime) => {
  return {
    type: 'ADD_COMPLETION',
    payload: { tagValue, completedTime }
  }
}

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_TAG':
      return [...action.payload.tags]

    case 'ADD_TAG':
      return state.map(tag => { return { ...tag, isSelected: false } }).concat(action.payload.tag)

    case 'MAKE_SELECTED':
      return state.map(tag => tag.value === action.payload.tagValue ? { ...tag, isSelected: true } : { ...tag, isSelected: false })

    case 'SET_TAG_DURATION':
      return state.map(tag => tag.isSelected ? { ...tag, duration: action.payload.duration } : tag)

    case 'SET_TAG_BREAK_DURATION':
      return state.map(tag => tag.isSelected ? { ...tag, break: action.payload.duration } : tag)

    case 'ADD_COMPLETION':
      return state.map(tag => tag.value === action.payload.tagValue ? { ...tag, completedTime: tag.completedTime + action.payload.completedTime } : tag)

    case 'SAVE_WORK_TAG_TO_BREAK':
      return state.map(tag => tag.value === 'break' ? { ...tag, workTag: action.payload.tagValue } : tag)

    default:
      return state
  }

}

export default tagsReducer