import NavigationBar from './components/NavigationBar'
import Timer from './components/Timer'
import Settings from './components/Settings'

const App = () => {

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        <Timer />
        <div className="text-center">tags</div>
        <Settings />
      </div>
    </div>
  )
}

export default App;
