import { Route, Switch } from 'react-router'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import Settings from './components/Settings'
import { useEffect } from 'react'
import { getAllTags } from './reducers/tagsReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const tags = useSelector(state => state.tags)
  const dispatch = useDispatch()
  console.log('app render')

  useEffect(() => {
    dispatch(getAllTags())
  }, [dispatch])

  return (
    <div className="page-div d-flex flex-column">
      <NavigationBar />
      <div className="container mt-3 d-flex flex-column align-items-center main">
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/">
            <Home tags={tags}/>
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App;
