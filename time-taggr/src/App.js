import { Route, Switch } from 'react-router'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import Settings from './components/Settings'

const App = () => {

  return (
    <div className="page-div d-flex flex-column">
      <NavigationBar />
      <div className="container mt-4 d-flex flex-column align-items-center main">
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>

      </div>
    </div>
  )
}

export default App;
