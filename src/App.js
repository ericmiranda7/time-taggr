import NavigationBar from './components/NavigationBar'
import Timer from './components/Timer'

const App = () => {

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        <Timer />
      </div>
    </div>
  )
}

export default App;
