import NavigationBar from './components/NavigationBar'
import Clock from './components/Clock'

const App = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mt-5">
        <Clock />
      </div>
    </div>
  )
}

export default App;
