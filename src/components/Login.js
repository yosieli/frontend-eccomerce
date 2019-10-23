import React from 'react'

export default class Login extends React.Component{
  state = {
    username: '',
    password: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/login',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        username:this.state.username,
        password:this.state.password
      })
    }).then(res=>res.json())
    .then(user=>
      localStorage.setItem('token',user.auth_token))
      //this.props.history.push('/')
  }

 render(){
 return (
   <div class="login-page">
   {/* <video autoplay loop id="video-background" muted plays-inline>
     <source src="https://www.videvo.net/videvo_files/converted/2016_10/preview/160812_061_Iphone9_4K.mp496821.webm" type="video/mp4"/>
   </video> */}
   <h1>Welcome to Marketplace!</h1>
       <div class="form">
         {/* <form class="register-form">
           <input type="text" placeholder="name"/>
           <input type="password" placeholder="password"/>
           <input type="text" placeholder="email address"/>
           <button>create</button>
           <p class="message">Already registered? <a href="#">Sign In</a></p>
         </form> */}
         <form onSubmit={this.handleSubmit} class="login-form">
           <input name = "username" onChange={this.handleChange} type="name" placeholder="username"/>
           <input name = "password" onChange={this.handleChange} type="password" placeholder="password"/>
           <button onClick={this.handleSubmit}>login</button>
           <p class="message">Not registered? <a href="#">Create an account</a></p>
         </form>
       </div>
     </div>
 );
};
}
