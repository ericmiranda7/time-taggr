const persistTags = (tags) => {
  window.localStorage.setItem('tags', JSON.stringify(tags))
}

export default persistTags