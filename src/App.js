import React from 'react';
import CartList from './components/CartList.js'
import './App.css';
import { Favorites } from './components/favorites.js'
import { Browse } from './components/Browse.js'
import Signin from './components/Signin.js'
import SignUp from './components/SignUp.js'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router'
import ItemSpec from './components/ItemSpec.js'
import NavBar from './components/nav.js'

export default class App extends React.Component {
  state = {
    items: [],
    cart: [],
    total: 0
  }


  render() {
   
    return (
      <div>
        
        <div>
          <BrowserRouter >
            <NavBar />
            <Route exact path='/sign-in' component={Signin} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/browse' component={Browse} />
            <Route exact path='/myCart' component={CartList} />
            <Route exact path='/myFavorites' component={Favorites} />
            <Route exact path='/description' component={ItemSpec} />
          </BrowserRouter>
        </div>
      </div>
    )
  }




}
