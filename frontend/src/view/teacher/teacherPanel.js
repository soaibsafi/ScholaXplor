import React from "react";
import {checkUserType} from "../../api/APIUtils";
import {
  getSubjectDetails
} from "../../api/TeacherAPI";
import "react-tabs/style/react-tabs.css";

var redirectpath = '/manageTestpanel';

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
    this.loadManageTest = this.loadManageTest.bind(this);
  }

  componentDidMount() {
    var that = this;
    var tid = that.state.uid;
    var token = that.state.token;
    if (token) {
      window.onpopstate = function (event) {
        that.props.history.go(1);
      };
    }
    checkUserType("token " + token).then((res) => {
      if (res.status === "FAILED") that.props.history.push("/");
    });
    console.log(tid)
    that.getAllSUbjectsOfTeacher(tid, token);
  }

  render() {
    var that = this;
    var state = this.state;
    return (
        <div style={{width: "1024px"}}>
          <div className="row">
            <h1>Teacher Panel</h1>
            <button
                type="button"
                className="btn btn-danger"
                onClick={this.logoutAction}
            >
              Logout
            </button>
          </div>
          <div className="row">
            <button
                type="button"
                className="btn btn-success"
                onClick={this.loadManageTest}
            >
              Manage Test
            </button>
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

  loadManageTest() {
    this.props.history.push({pathname:redirectpath, state:{}})
  }

  loadFillData() {
    var that = this;
    if (that.state.subjectsDetails.length) {
      console.log(this.state.subjectsDetails)
      return this.state.subjectsDetails.map((data, idx) => {
        return (
            <tr key={data.sid}>
              <th>{data.classname}</th>
              <th>{data.subjectname}</th>
              <td>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.logoutAction}
                >
                  Manage
                </button>
              </td>
            </tr>
        );
      });
    } //else console.log("No data");
  }

  logoutAction() {
    var that = this;
    that.setState({token: ""}, () => {
      that.props.history.push({pathname: redirectpath});
    });
  }

  tabSelectionAction(idx) {
    this.setState({selectedTab: idx});
  }

  getAllSUbjectsOfTeacher(tid, token) {
    getSubjectDetails(tid, "Token " + token).then((data) => {
      this.setState({subjectList: data.data}, () => {
        console.log(this.state.subjectList)
      });
    });
  }

  logoutAction(){
    this.props.history.push({pathname:redirectpath});
  }
}
