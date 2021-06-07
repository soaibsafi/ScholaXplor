
import React from 'react'

const redirectpath = '/adminpanel';

class login extends React.Component{

  constructor(props) {
    super(props);
    this.state = { username: '' };

    this.loginAction = this.loginAction.bind(this);
  }

  loginAction(){
    var that = this;
    that.props.history.push(redirectpath)
  }

  render(){
    return(
      <div style={{}}>
        <div>
          <h1>Login{this.state.username}</h1>
          <p>Username:</p>
          <input type='text' />
          <p>Password:</p>
          <input type='text'/>
          <br/>
          <button style={{padding:'5px', marginTop:'10px'}} onClick={this.loginAction}>Login</button>
        </div>
      </div>
    )
  }
}



export default login;
