import { useField } from "../hooks/useField"
import userService from "../services/userService"
import { useDispatch } from 'react-redux'
import { setUser } from "../reducers/userReducer"

const Login = () => {
  const dispatch = useDispatch()

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.login(username.value, password.value)
      window.localStorage.setItem('user', JSON.stringify(user))
      console.log(user)
      dispatch(setUser(user))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <form>
      <input name="username" placeholder="username plij" {...username} ></input>
      <input name="password" placeholder="pass" {...password} ></input>
      <button type="submit" onClick={handleLogin}>Login</button>
    </form>
  )
}

export default Login