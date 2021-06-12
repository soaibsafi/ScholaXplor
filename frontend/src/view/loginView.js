import React from 'react'
import {login} from "../api/APIUtils";

const redirectpath = '/adminpanel';

class loginView extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:''
    };

    this.loginAction = this.loginAction.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  loginAction(){
    var that = this;

    console.log(that.state);

    var data = {
      'username' : that.state.username,
      'password' : that.state.password
    }
    login(data).then(response => {
      console.log(response);
      if(response.status === 'SUCCESS' ) {
        that.props.history.push({pathname:redirectpath, state: {token:response.token}});
        //debugger;
      }
      else alert("Login falied!")
    }).catch(err => {console.log(err)});

  }

  onChangeHandler(e){
    if(e.target.name === 'username'){
      this.setState({username: e.target.value})
    }
    else{
      this.setState({password: e.target.value})
    }
  }

  render(){
    return(
      <div style={{}}>
        <div>
          <h1>Login</h1>
          <p>Username:</p>
          <input type='text' name='username' onChange={this.onChangeHandler}/>
          <p>Password:</p>
          <input type='password' name='password' onChange={this.onChangeHandler}/>
          <br/>
          <button style={{padding:'5px', marginTop:'10px'}} onClick={this.loginAction}>Login</button>
        </div>
      </div>
    )
  }
}



export default loginView;
