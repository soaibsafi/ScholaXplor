import React from 'react'
import {checkUserType} from "../../api/APIUtils";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';

import UserTab from './Component/UserTab'
import SubjectTab from './Component/SubjectTab'
import PupilTab from './Component/PupilTab'

import 'react-tabs/style/react-tabs.css';
import ClassTable from './Component/ClassTable';

const redirectpath = '/login';

export default class adminPanel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      token: this.props.location.state ? this.props.location.state.token : '',
      selectedTab: 3 /// TODO: Change it to 0
    };

    this.logoutAction = this.logoutAction.bind(this);
    this.tabSelectionAction = this.tabSelectionAction.bind(this);
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
    var that = this;
    var state = this.state;
    return (
        <div style={{width: '1024px'}}>
          <div className='row'>
            <h1>Admin Panel</h1>
            <button type="button" className="btn btn-danger" onClick={this.logoutAction}>Logout</button>
          </div>
          <Tabs selectedIndex={state.selectedTab} onSelect={index => that.tabSelectionAction(index)}>
            <TabList>
              <Tab>User</Tab>
              <Tab>Class</Tab>
              <Tab>Subject</Tab>
              <Tab>Pupil</Tab>
            </TabList>
            <TabPanel>
              <UserTab token={state.token}/>
            </TabPanel>
            <TabPanel>
              <ClassTable token={state.token}/>
            </TabPanel>
            <TabPanel>
              <SubjectTab token={state.token}/>
            </TabPanel>
            <TabPanel>
              <PupilTab token={state.token} tabSelection={that.tabSelectionAction}/>
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

  tabSelectionAction(idx){
    this.setState({selectedTab:idx})
  }
}
