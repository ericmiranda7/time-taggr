import NavigationBar from './components/NavigationBar'
import Timer from './components/Timer'
import Settings from './components/Settings'
import { useSelector } from 'react-redux'

const App = () => {
  const tags = useSelector(state => state.tags)

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4 d-flex flex-column align-items-center">
        <h2>{tags.find((tag) => tag.isSelected)?.name}</h2>
        <Timer />
        <div className="text-center">tags</div>
        <Settings />
      </div>
    </div>
  )
}

export default App;
