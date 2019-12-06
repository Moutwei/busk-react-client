import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const style = {
  color: 'black',
  backgroundColor: 'grey'
}

const style2 = {
  color: 'black',
  backgroundColor: 'grey',
  marginLeft: '1vw'
}

const authenticatedOptions = (
  <Fragment>
    <Nav.Link style={style} href="#change-password">Change Password</Nav.Link>
    <Nav.Link style={style} href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link style={style2} href="#create-busk">Create Busk</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link style={style} href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link style={style} href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link style={style} href="#/home">Show All Busks</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="dark" variant="dark" expand="md">
    <Navbar.Brand href="#">
      <img className='home-logo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVAtE_1TUOQwyrtEevDrN32sg3ievIjVhvMUknsfXBlyKPMwBmXA&s' alt='logo'/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav variant='tabs' className="mr-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
      <Nav variant='tabs' className='ml-auto'>
        { alwaysOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
