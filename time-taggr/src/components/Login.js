import useField from "../hooks/useField"

const Login = () => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = (event) => {
    event.preventDefault()

    
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