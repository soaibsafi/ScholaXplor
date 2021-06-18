import React from "react";
import { checkUserType } from "../../api/APIUtils";
import Dropdown from "react-dropdown";
import {
  getClassname,
  getAllAssignedSubjects,
  getAllTests,
  getAllClasses,
} from "../../api/PupilAPI";

import PupilTestDetails from "./PupilTestDetails";

const redirectpath = "/login";

const options = [
  { value: "ALL", label: "All Users" },
  { value: "Admin", label: "Admin" },
  { value: "Pupil", label: "Pupil" },
  { value: "Teacher", label: "Teacher" },
];

export default class pupilPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: this.props.location.state.uid,
      className: "",
      classId: "",
      allClasses: [],
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
    this.getAllPupilClasses = this.getAllPupilClasses.bind(this);
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
    that.getAllPupilClasses(pid, token);
    
    
    //that.getLoggedInSUbjects(pid, cid, token);
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
        <div className="row" style={{ width: 340 }}>
          <Dropdown
            classname="style.dropDown"
            options={that.state.allClasses}
            onChange={that.getAllSUbjects}
            placeholder="Select a class"
            placeholderClassName="myPlaceholderClassName"
          />
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
      this.setState({ className: data.classname, classId:data.cid }, ()=>{console.log(this.state.classId)});
    });
  }


  getAllPupilClasses(pid, token) {
    var tempList = [];
    getAllClasses(pid, "Token " + token).then((data) => {
      console.log(data)
      data.forEach((info) => {
        var obj = { value: info.cid, label: info.classname };
        tempList.push(obj);
      });
      this.setState({ allClasses: tempList });
    });
  }

  getAllSUbjects(e) {
    var cid = e.value;
    var pid = this.state.uid;
    var token = this.state.token;
    getAllAssignedSubjects(pid, cid, token).then((data) => {
      this.setState({ subjectList: data.data });
    });
  }

  getAllTestResult(sid, pid, token) {
    getAllTests(sid, pid, "Token " + token).then((data) => {
      this.setState({ subjectTestDetailsList: data.data });
    });
  }
}
