import { useField } from "../hooks/useField"
import userService from "../services/userService"
import { useDispatch } from 'react-redux'
import { setUser } from "../reducers/userReducer"
import { Button } from 'react-bootstrap'
import { store } from "react-notifications-component"

const Login = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async () => {
    try {
      const user = await userService.login(username.value, password.value)
      window.localStorage.setItem('user', JSON.stringify(user))
      console.log(user)
      dispatch(setUser(user))
      username.setValue('')
      password.setValue('')
    } catch (e) {
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



  return (
    <div className="container">
      <div>
        <form>
          <div>
            <input name="username" placeholder="Username" {...username} className="w-100 d-block mx-auto" ></input>
          </div>
          <div className="mt-1">
            <input name="password" placeholder="Password" {...password} className="w-100 d-block mx-auto"></input>
          </div>
          <div className="d-flex-column">
            <Button variant="primary" size="sm" block className="mx-auto mt-1" onClick={handleLogin}>Login</Button>
            <Button variant="success" size="sm" block className="mx-auto mt-1" onClick={() => null}>Signup</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login