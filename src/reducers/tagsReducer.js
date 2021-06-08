const initialState = [
  {
    name: 'Study',
    color: 'blue',
    isSelected: false
  },
  {
    name: 'Read',
    color: 'green',
    isSelected: false
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