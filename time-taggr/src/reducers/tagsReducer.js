import tagService from '../services/tagService'

const initState = [
  {
    name: 'Study',
    value: 'study',
    color: 'blue',
    isSelected: true,
    duration: 25,
    completedTime: 0,
    id: 1,
    break: 5,
  },
  {
    name: 'Break',
    value: 'break',
    color: 'white',
    isSelected: false,
    duration: 25,
    completedTime: 0,
    id: 3,
    break: 25,
  },
]

const initialState = tagService.getLocalData() || initState

export const initToDbTags = () => {
  return async dispatch => {
    let tags = await tagService.getAll()
    dispatch({ type: 'INIT_TAG', payload: { tags } })
  }
}

export const clearTags = () => {
  return {
    type: 'INIT_TAG', payload: { tags: initState }
  }
}

export const addTag = (tag) => {
  return async (dispatch, getState) => {
    const cleanTag = tagService.processTag(tag)
    dispatch({
      type: 'ADD_TAG',
      payload: { tag: cleanTag }
    })
    if (getState().user) tagService.saveTagsToCloud(getState().tags)
  }
}

export const makeSelected = tagValue => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'MAKE_SELECTED',
      payload: { tagValue }
    })
    if (getState().user) tagService.saveTagsToCloud(getState().tags)
  }
}

export const addTagToBreak = tagValue => {
  return {
    type: 'SAVE_WORK_TAG_TO_BREAK',
    payload: { tagValue }
  }
}

export const setBreakDuration = (duration, tagValue) => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'SET_TAG_BREAK_DURATION',
      payload: { duration, tagValue }
    })
    if (getState().user) tagService.saveTagsToCloud(getState().tags)
  }
}

export const setTagDuration = (duration, tagValue) => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'SET_TAG_DURATION',
      payload: { duration, tagValue }
    })
    if (getState().user) tagService.saveTagsToCloud(getState().tags)
  }
}

export const addCompletedTime = (tagValue, completedTime) => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'ADD_COMPLETION',
      payload: { tagValue, completedTime }
    })
    if (getState().user) tagService.saveTagsToCloud(getState().tags)
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