const initialState = [
  {
    name: 'Study',
    color: 'blue',
    isSelected: false,
    duration: 25
  },
  {
    name: 'Read',
    color: 'green',
    isSelected: false,
    duration: 25
  },
  {
    name: 'Break',
    color: 'white',
    isSelected: false,
    duration: 70
  }
]

export const addTag = (tag) => {
  return {
    type: 'ADD_TAG',
    payload: {tag}
  }
}

export const makeSelected = tagName => {
  return {
    type: 'MAKE_SELECTED',
    payload: {tagName}
  }
}

export const setBreakDuration = (duration) => {
  return setTagDuration('Break', duration)
}

export const setTagDuration = (tag, duration) => {
  return {
    type: 'SET_DURATION',
    payload: {tag, duration: duration}
  }
}

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TAG':
      return state.concat(action.payload.tag)

    case 'MAKE_SELECTED':
      return state.map(tag => tag.name === action.payload.tagName ? {...tag, isSelected: true} : {...tag, isSelected: false})

    case 'SET_DURATION':
      if (action.payload.tag) return state.map(tag => tag.name === action.payload.tag ? {...tag, duration: action.payload.duration} : tag)
      else return state.map(tag => tag.isSelected ? {...tag, duration: action.payload.duration} : tag)

    default:
      return state
  }

}

export default tagsReducer