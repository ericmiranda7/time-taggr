import { useEffect, useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  const [navExpanded, setNavExpanded] = useState(false)

  const toggleNav = () => setNavExpanded(!navExpanded)

  return (
    <Navbar id="navToggle" bg="dark" expand="lg" variant="dark" onToggle={toggleNav} expanded={navExpanded} style={{ outline: 'none !important' }}>
      <Link to="/" className="navbar-brand" onClick={navExpanded ? toggleNav : null}>Time-Taggr</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto nav" id="navbar">
          <Link to="/stats" className="nav-link" onClick={toggleNav}>Time Breakdown</Link>
          <Link to="/settings" className="nav-link" onClick={toggleNav}>Settings</Link>
          <a className="nav-link" href="https://github.com/ericmiranda7/time-taggr">GitHub</a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar