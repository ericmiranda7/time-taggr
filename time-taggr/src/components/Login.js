import { useField } from "../hooks/useField"
import userService from "../services/userService"
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "../reducers/userReducer"
import { Button } from 'react-bootstrap'
import { store } from "react-notifications-component"
import { useHistory } from 'react-router-dom'
import tagService from '../services/tagService'
import { initToDbTags } from "../reducers/tagsReducer"

const Login = () => {
  const history = useHistory()

  const tags = useSelector(state => state.tags)
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async () => {
    try {
      const user = await userService.login(username.value, password.value)
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
      tagService.setToken(user.token)
      username.setvalue('')
      password.setvalue('')

      history.push('/')

      // sync local / cloud tags
      const dbTags = await tagService.getAll()
      console.log('tl', dbTags.length)
      if (dbTags.length !== 0) {
        dispatch(initToDbTags())
      }
      else {
        tagService.saveTagsToCloud(tags)
      }

    } catch (e) {
      console.log(e)
      store.addNotification({
        title: "Invalid credentials",
        message: 'Please check ursername or password',
        type: "danger",
        insert: "top",
        container: "bottom-full",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    }
  }

  const handleSignup = async () => {
    try {
      await userService.register(username.value, password.value)
    } catch (e) {
      store.addNotification({
        title: "Duplicate username",
        message: 'Please Sign Up with a different username',
        type: "danger",
        insert: "top",
        container: "bottom-full",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });

    }
  }

  return (
    <div className="container">
      <div>
        <form>
          <div>
            <input name="username" placeholder="Username" {...username} setvalue="" className="w-100 d-block mx-auto" ></input>
          </div>
          <div className="mt-1">
            <input name="password" placeholder="Password" {...password} setvalue="" className="w-100 d-block mx-auto"></input>
          </div>
          <div className="d-flex-column">
            <Button variant="primary" size="sm" block className="mx-auto mt-1" onClick={handleLogin}>Login</Button>
            <Button variant="success" size="sm" block className="mx-auto mt-1" onClick={handleSignup}>Signup</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login