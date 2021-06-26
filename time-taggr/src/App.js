import { Route, Switch } from 'react-router'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import Stats from './components/Stats'
import Settings from './components/settings/Settings'
import { useSelector } from 'react-redux'
import Login from './components/Login'
import ReactNotification from 'react-notifications-component'

const App = () => {
  const tags = useSelector(state => state.tags)

  return (
    <div>
      <ReactNotification isMobile={true} />
      <div className="page-div d-flex flex-column app-container">
        <NavigationBar />
        <div className="container mt-3 d-flex flex-column align-items-center main">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
            <Route path="/settings">
              <Settings />
            </Route>
            <Route path="/">
              <Home tags={tags} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default App;
