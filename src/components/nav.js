import React from 'react';
import {withRouter} from 'react-router'
import { Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

const NavBar = withRouter((props) => (
    ['/sign-in', '/sign-up'].includes(props.location.pathname) ?
      null 
        :
    <Navbar style={{ backgroundColor: 'rgb(166, 184, 54)' }} sticky='top' className="bg-custom" collapseOnSelect variant="light">
      <img
        src="logo.png"
        width="200px"
        height="80px"
        className="d-inline-block align-top"
        alt=""
      />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Nav className="mr-auto">
        <Nav.Link onClick={() => console.log("h")}><strong> Upload </strong></Nav.Link>
        <Nav.Link href='/browse'> <strong> Browse </strong> </Nav.Link>
        <Nav.Link href='/myFavorites'><strong> Favorites </strong></Nav.Link>
      </Nav>

      <Nav.Link href='/myCart'><img  style= {{height: '50px', transform: 'scaleX(-1)'}} src = "http://www.sclance.com/pngs/grocery-cart-png/grocery_cart_png_614332.png"/></Nav.Link>
      <Nav>
        <Nav.Link onClick={() => {
          localStorage.clear()
          props.history.push('/sign-in')
  
        }} ><strong> Sign-Out </strong></Nav.Link>
      </Nav>
    </Navbar>
  ))
  export default NavBar