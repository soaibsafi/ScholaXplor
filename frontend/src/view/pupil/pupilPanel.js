import React from "react";
import { checkUserType } from "../../api/APIUtils";
import {
  getClassname,
  getAllAssignedSubjects,
  getAllTests,
} from "../../api/PupilAPI";

import PupilTestDetails from "./PupilTestDetails";

const redirectpath = "/login";

export default class pupilPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.location.state.uid,
      className: "",
      token: this.props.location.state
        ? "token " + this.props.location.state.token
        : "",
      subjectList: [],
      subjectTestDetailsList: [],
      showPopup: false,
      popupHeaderText: "",
    };

    this.logoutAction = this.logoutAction.bind(this);
    this.loadFillData = this.loadFillData.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.getLoggedInClassname = this.getLoggedInClassname.bind(this);
    this.getAllSUbjects = this.getAllSUbjects.bind(this);
    this.getAllTestResult = this.getAllTestResult.bind(this);
  }

  componentDidMount() {
    var that = this;
    var pid = that.state.uid;
    var token = this.props.location.state
      ? this.props.location.state.token
      : "";
    if (token) {
      window.onpopstate = function (event) {
        that.props.history.go(1);
      };
    }
    checkUserType("token " + token).then((res) => {
      if (res.status === "FAILED") that.props.history.push("/");
    });

    that.getLoggedInClassname(pid, token);
    that.getAllSUbjects(pid, token);
  }

  render() {
    var that = this;
    return (
      <div style={{ width: "1024px" }}>
        <div className="row">
          <h1>Pupil Panel</h1>
          <h3>Assigned Class: {that.state.className}</h3>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.logoutAction}
          >
            Logout
          </button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
          <table className="table table-hover table-striped">
            <thead className="thead-dark">
              <tr key={"user_key1"}>
                <th scope="col">Subject</th>
                <th scope="col">Avg. Grade</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{this.loadFillData()}</tbody>
          </table>
        </div>
        {that.state.showPopup ? (
          <PupilTestDetails
            subjectTestDetailsList={that.state.subjectTestDetailsList}
            popupHeaderText={that.state.popupHeaderText}
            closePopup={that.closePopup}
          />
        ) : null}
        {/*// selectedRole={that.state.selectedRole}*/}
        {/*// */}
        {/*// popupBtnText={that.state.popupBtnText}*/}
        {/*// updateInfo={that.updateInfo}*/}
        {/*// addUser={that.addUser}*/}
        {/*// */}
      </div>
    );
  }

  logoutAction() {
    var that = this;
    that.setState({ token: "" }, () => {
      that.props.history.push({ pathname: redirectpath });
    });
  }

  loadFillData() {
    if (this.state.subjectList.length) {
      return this.state.subjectList.map((data) => {
        return (
          <tr key={data.sid}>
            <th>{data.subjectname}</th>
            <th>{data.avgGrade}</th>
            <td>
              {
                <button
                  className="btn btn-info"
                  onClick={() => this.openDetailsPopup(data)}
                >
                  View Details
                </button>
              }
            </td>
          </tr>
        );
      });
    }
  }

  openDetailsPopup(data) {
    var that = this;
    that.setState({ popupHeaderText: "Test Details for " + data.subjectname });
    getAllTests(data.sid, that.state.uid, that.state.token).then((data) => {
      that.setState(
        {
          subjectTestDetailsList: data.data,
        },
        () => {
          that.togglePopup();
        }
      );
    });
  }

  closePopup() {
    this.setState(
      {
        popupHeaderText: "",
        // subjectTestDetailsList:[]
      },
      () => {
        this.togglePopup();
      }
    );
  }

  togglePopup() {
    this.setState({ showPopup: !this.state.showPopup });
  }

  getLoggedInClassname(pid, token) {
    getClassname(pid, "Token " + token).then((data) => {
      this.setState({ className: data.classname });
    });
  }

  getAllSUbjects(pid, token) {
    getAllAssignedSubjects(pid, "Token " + token).then((data) => {
      this.setState({ subjectList: data.data });
    });
  }

  getAllTestResult(sid, pid, token) {
    getAllTests(sid, pid, "Token " + token).then((data) => {
      this.setState({ subjectTestDetailsList: data.data });
    });
  }
}
