import NavigationBar from './components/NavigationBar'
import Timer from './components/Timer'
import Settings from './components/Settings'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getAllTags } from './reducers/tagsReducer'

const App = () => {
  const tags = useSelector(state => state.tags)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTags())
  }, [dispatch])

  return (
    <div className="page-div d-flex flex-column">
      <NavigationBar />
      <div className="container mt-4 d-flex flex-column align-items-center main">
        <h2>{tags.find((tag) => tag.isSelected)?.name}</h2>
        <Timer />
        <Settings />
        <a href="#" className="mt-auto">Settings</a>
      </div>
    </div>
  )
}

export default App;
