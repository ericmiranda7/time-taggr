const initialState = [
  {
    name: 'Study',
    color: 'blue',
    isSelected: false,
    duration: 25,
    completedTime: 0
  },
  {
    name: 'Read',
    color: 'green',
    isSelected: false,
    duration: 25,
    completedTime: 0,
  },
  {
    name: 'Break',
    color: 'white',
    isSelected: false,
    duration: 70,
    completedTime: 0,
  }
]

export const addTag = (tag) => {
  return {
    type: 'ADD_TAG',
    payload: { tag: { ...tag, completedTime: 0, duration: 25 } }
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
    case 'ADD_TAG':
      return state.concat(action.payload.tag)

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