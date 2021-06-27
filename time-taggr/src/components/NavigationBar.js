import { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { clearTags } from '../reducers/tagsReducer'
import tagService from '../services/tagService'

const NavigationBar = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [navExpanded, setNavExpanded] = useState(false)

  const toggleNav = () => setNavExpanded(!navExpanded)

  const handleLogout = () => {
    toggleNav()

    dispatch(logout())
    window.localStorage.removeItem('tags')
    dispatch(clearTags())
    window.localStorage.removeItem('user')
    tagService.setToken(null)
  }

  return (
    <Navbar id="navToggle" bg="dark" expand="lg" variant="dark" onToggle={toggleNav} expanded={navExpanded} style={{ outline: 'none !important' }}>
      <Link to="/" className="navbar-brand" onClick={navExpanded ? toggleNav : null}>Time-Taggr</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto nav" id="navbar">
          <Link to="/stats" className="nav-link" onClick={toggleNav}>Time Breakdown</Link>
          <Link to="/settings" className="nav-link" onClick={toggleNav}>Settings</Link>
          <a className="nav-link" href="https://github.com/ericmiranda7/time-taggr">GitHub</a>
          {user
            ? <Link to="/login" className="nav-link" onClick={handleLogout}>Logout</Link>
            : <Link to="/login" className="nav-link" onClick={toggleNav}>Login</Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar