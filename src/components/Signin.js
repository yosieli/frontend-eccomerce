import React from 'react'
import './Signin.css'
import SigninPage from './Signin(HTML)'
import SignUp from './SignUp';


export default class Signin extends React.Component{

    state = {
        loggedIn: false,
        signIn: true
    }
    

    render(){
        
        return(
            <div >
                {this.state.signIn ? <SigninPage/> : <SignUp/>}
                
            </div>
        )
    }
}