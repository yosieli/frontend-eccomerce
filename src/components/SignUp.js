import React from 'react'
import './Signin.css'
export default  class SignUp extends  React.Component{

    state = {
        username: '',
        password: ''
      }
    
      handleChange = (e)=> {
        this.setState({
          [e.target.name]: e.target.value
        })
      }
    
      handleSubmit = (e) => {
        
        e.preventDefault()
        fetch('http://localhost:3000/signup',{
          method: 'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        }).then(user => {
          this.props.history.push('/sign-in')
        })
          
      }
    

    render(){
      console.log(this.state.username)
        return(
            <div className="login-page">
            <video autoPlay muted loop id="video-background" >
              {/* <source src="https://www.videvo.net/videvo_files/converted/2016_10/preview/160812_061_Iphone9_4K.mp496821.webm" type="video/mp4"/> */}
              <source src="stock.mp4" type="video/mp4"/>
            </video>
            <h1 > <strong> Welcome to </strong> </h1>
              <img className="logo-s" align="top" src="logo.png" height="160" width="400"/>
                <div className="form">
                <form onSubmit={this.handleSubmit} className="login-form">
                  <input name = "username" onChange={this.handleChange} type="name" placeholder="username"/>
                  <input name = "password" onChange={this.handleChange} type="password" placeholder="password"/>
                    
                  <button style={{"border-radius": "7px"}}onClick={(e) => this.handleSubmit(e)}>Sign Up</button>
                   
                    <p className="message">Already registered? <a href="/sign-in">Sign In</a></p>
                </form>
                </div>
                <h2> <strong> The #1 place to buy or sell your goods </strong> </h2>
              </div>)
    }

}