import { useState } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  const [navExpanded, setNavExpanded] = useState(false)

  return (
    <Navbar bg="dark" expand="lg" variant="dark" onToggle={() => setNavExpanded(!navExpanded)} expanded={navExpanded}>
      <Link to="/" className="navbar-brand">Time-Taggr</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto nav" id="navbar">
          <Link to="/stats" className="nav-link" onClick={() => setNavExpanded(!navExpanded)}>Time Breakdown</Link>
          <Link to="/settings" className="nav-link" onClick={() => setNavExpanded(!navExpanded)} >Settings</Link>
          <a className="nav-link" href="https://github.com/ericmiranda7/time-taggr">GitHub</a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar