const processTag = (tag) => {
  tag.name = tag.name.charAt(0).toUpperCase() + tag.name.slice(1)
  tag.value = tag.name.toLowerCase()
  tag.isSelected = true
  tag.duration = 25
  tag.completedTime = 0
  tag.break = 5
	
  return tag
}

module.exports = { processTag }