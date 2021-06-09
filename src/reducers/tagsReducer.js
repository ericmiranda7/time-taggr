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
    duration: 5
  }
]

export const addTag = (tag) => {
  return {
    type: 'ADD_TAG',
    payload: {tag}
  }
}

export const makeSelected = tag => {
  return {
    type: 'MAKE_IMP',
    payload: {tag}
  }
}

export const setTagDuration = duration => {
  return {
    type: 'SET_DURATION',
    action: {payload: duration * 60}
  }
}

const tagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TAG':
      return state.concat(action.payload.tag)

    case 'MAKE_IMP':
      return state.map(tag => tag.name === action.payload.tag.name ? {...tag, isSelected: true} : {...tag, isSelected: false})

    default:
      return state
  }

}

export default tagsReducer