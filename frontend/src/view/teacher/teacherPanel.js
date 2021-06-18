import React from "react";
import { checkUserType } from "../../api/APIUtils";
import {  getSubjectDetails, getTestDetails } from "../../api/TeacherAPI";
import "react-tabs/style/react-tabs.css";

var redirectpath = '/manageTestpanel';
const redirectloginpath = "/login";

export default class teacherPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tid: this.props.location.state.uid,
      subjectsDetails: [],
      token: this.props.location.state ? this.props.location.state.token : "",
    };
    this.loadFillData = this.loadFillData.bind(this);
    this.logoutAction = this.logoutAction.bind(this);
    this.tabSelectionAction = this.tabSelectionAction.bind(this);
    this.getAllSUbjectsOfTeacher = this.getAllSUbjectsOfTeacher.bind(this);
    this.openTestManager = this.openTestManager.bind(this);
  }

  componentDidMount() {
    var that = this;
    var tid = that.state.tid;
    var token = that.state.token;
    if (token) {
      window.onpopstate = function (event) {
        that.props.history.go(1);
      };
    }
    checkUserType("token " + token).then((res) => {
      if(res) {
        if (res.status === "FAILED") that.props.history.push("/");
        return;
      }
      else {
        that.props.history.push("/");
        return;
      }
    });
    that.getAllSUbjectsOfTeacher(tid, token);
  }

  render() {

    return (
        <div style={{width: "1024px"}}>
          <div className="row">
            <h1>Teacher Panel</h1>
            <button type="button" className="btn btn-danger" onClick={this.logoutAction}> Logout</button>
          </div>
          <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
            <table className="table table-hover table-striped">
              <thead className="thead-dark">
              <tr key={"user_key1"}>
                <th scope="col">Class</th>
                <th scope="col">Subjects</th>
                <th scope="col">Manage Test</th>
              </tr>
            </thead>
            <tbody>{this.loadFillData()}</tbody>
          </table>
        </div>
      </div>
    );
  }

  loadFillData() {
    var that = this;
    if (that.state.subjectsDetails.length) {
      return this.state.subjectsDetails.map((data, idx) => {
        return (
          <tr key={data.sid}>
            <th>{data.classname}</th>
            <th>{data.subjectname}</th>
            <td>{<button className="btn btn-info" onClick={() => this.openTestManager(data)}>Manage</button>}</td>
          </tr>
        );
      });
    }
  }

  openTestManager(data){
    console.log(data);
    var that = this;
    getTestDetails(data.sid, that.state.token).then(response => {
      that.props.history.push({pathname:redirectpath,
        state:{info : data,
          token:that.state.token,
          uid:that.state.tid,
          testList: response.data,
           selectedTest:response.data[0].tid,
      }})
    })


  }

  logoutAction() {
    var that = this;
    that.setState({ token: "" }, () => {
      that.props.history.push({ pathname: redirectloginpath });
    });
  }

  tabSelectionAction(idx) {
    this.setState({ selectedTab: idx });
  }

  getAllSUbjectsOfTeacher(tid, token) {
    getSubjectDetails(tid, "Token " + token).then((data) => {
      this.setState({ subjectsDetails: data.data});
    });
  }
}
