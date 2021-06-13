import React from 'react'
import {checkUserType} from "../../api/APIUtils";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import UserTab from './Component/UserTab'
import 'react-tabs/style/react-tabs.css';

const redirectpath = '/login';

export default class adminPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      token: this.props.location.state ? this.props.location.state.token : ''
    };

    this.logoutAction = this.logoutAction.bind(this);
  }

  componentDidMount() {
    var that = this;

    var token = that.state.token;
    if (token) {
      window.onpopstate = function (event) {
        that.props.history.go(1);
      };
    }
    checkUserType('token ' + token).then(res => {
      if (res.status === "FAILED") that.props.history.push("/login");
    });
  }

  render() {
    var state = this.state;
    return (
        <div style={{width: '1024px'}}>
          <div className='row' onClick={this.logoutAction}><h1>Admin Panel</h1>
            <button type="button" className="btn btn-danger">Logout</button>
          </div>
          <Tabs>
            <TabList>
              <Tab>User</Tab>
              <Tab>Class</Tab>
              <Tab>Subject</Tab>
            </TabList>
            <TabPanel>
              <UserTab token={state.token}/>
            </TabPanel>
            <TabPanel>
              <h2>Class Management</h2>
            </TabPanel>
            <TabPanel>
              <h2>Subject Managment</h2>
            </TabPanel>
          </Tabs>


        </div>
    )
  }

  logoutAction() {
    var that = this;
    that.setState({token: ''},
        () => {
          that.props.history.push({pathname:redirectpath});
        })
  }
}
