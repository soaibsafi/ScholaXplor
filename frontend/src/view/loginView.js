import React from 'react'
import { login } from "../api/APIUtils";
import './loginView.css';

const redirectadminpath = '/adminpanel';
const redirectteacherpath = '/teacherpanel';
const redirectpupilpath = '/pupilpanel';

class loginView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.loginAction = this.loginAction.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  loginAction() {
    var that = this;
    var data = {
      'username': that.state.username,
      'password': that.state.password
    }
    login(data).then(response => {
      if (response.status === 'SUCCESS') {
        if (response.role === "Admin") that.props.history.push({ pathname: redirectadminpath, state: { token: response.token, uid:  response.uid} });
        else if (response.role === "Teacher") that.props.history.push({ pathname: redirectteacherpath, state: { token: response.token, uid: response.uid } });
        else that.props.history.push({ pathname: redirectpupilpath, state: { token: response.token, uid: response.uid } });

      }
      else alert("Login falied!")
    }).catch(err => { console.log(err) });

  }

  onChangeHandler(e) {
    if (e.target.name === 'username') {
      this.setState({ username: e.target.value })
    }
    else {
      this.setState({ password: e.target.value })
    }
  }

  render() {
    return (
      <div className="parent-div fill-window">
        <div className="title-area">
           <h1>Application Title</h1>
        </div>
        <div className="login-area container p-33 border">
          <div className="form-group">
            <h2>Login</h2>
            <br />
            <label for="username">Username</label>
            <input type='text' className="form-control" name='username' id="username" onChange={this.onChangeHandler} />
            <label for="password">Password</label>
            <input type='password' className="form-control" name='password' id="password"   onChange={this.onChangeHandler} />
            <br />
            <button class="btn btn-primary" onClick={this.loginAction}>Login</button>
          </div>
        </div>
      </div>
    )
  }
}



export default loginView;
