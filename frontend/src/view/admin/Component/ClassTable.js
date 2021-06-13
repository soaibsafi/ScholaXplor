import React from "react";
import Dropdown from "react-dropdown";
import {
  getAllClass,
  getSubjectsDetails,
  createNewClass,
} from "../../../api/AdminAPI";
import Tablepopup from "./Tablepopup";

import style from "./UserTab.css";
import "../../../App.css";
import "react-dropdown/style.css";

const options = ["Pupil", "Teacher"];

export default class ClassTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjectsDetails: [],
      allClasses: [],
      showPopup: false,
      selectedRole: "",
      popupHeaderText: "",
      popupBtnText: "",
      classinfo: {
        classname: "",
        cid: "",
      },
    };
    this.loadFillData = this.loadFillData.bind(this);
    this.getAllClasses = this.getAllClasses.bind(this);
    this.getAllSubjectsDetails = this.getAllSubjectsDetails.bind(this);
    this.openNewClassPopup = this.openNewClassPopup.bind(this)

    //Popup functions
    this.addClass = this.addClass.bind(this);
    
  }

  componentDidMount() {
    var token = this.props.token;
    this.getAllClasses("tokeon " + token);
  }

  render() {
    var that = this;
    console.log(that.state.allClasses);
    return (
      <div className="App">
        <h2 className={style.dropDown}>Class Managment</h2>
        <div className="row" style={{ width: 340 }}>
          <Dropdown
            classname="style.dropDown"
            options={that.state.allClasses}
            onChange={this.getAllSubjectsDetails}
            placeholder="Select a class"
            placeholderClassName="myPlaceholderClassName"
          />
          <button className="btn btn-success" onClick={this.openNewClassPopup}>
            Add
          </button>
        </div>
        <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
          <table className="table table-hover table-striped">
            <thead className="thead-dark">
              <tr key={"user_key1"}>
                <th scope="col">Subject</th>
                <th scope="col">Status</th>
                <th scope="col">Total Students</th>
                <th scope="col">Teacher</th>
              </tr>
            </thead>
            <tbody>{this.loadFillData()}</tbody>
          </table>
        </div>
        {that.state.showPopup ? (
          <Tablepopup
            classinfo={that.state.classinfo}
            selectedRole={that.state.selectedRole}
            closePopup={that.togglePopup.bind(this)}
            popupHeaderText={that.state.popupHeaderText}
            popupBtnText={that.state.popupBtnText}
            updateInfo={that.updateInfo}
            addClass={that.addClass}
          />
        ) : null}
      </div>
    );
  }

  loadFillData() {
    if (this.state.subjectsDetails.length) {
      return this.state.subjectsDetails.map((data, idx) => {
        return (
          <tr key={idx}>
            <th>{data.subjectname}</th>
            <th>{data.status}</th>
            <td>{data.totalstudent}</td>
            <td>{data.fullname}</td>
          </tr>
        );
      });
    } else console.log("No data");
  }

  getAllClasses(token) {
    var tempList = [];
    getAllClass(token).then((data) => {
      data.data.map((info) => {
        var obj = { value: info.cid, label: info.classname };
        tempList.push(obj);
      });
      this.setState({ allClasses: tempList });
    });
  }

  getAllSubjectsDetails(e) {
    var that = this;
    getSubjectsDetails("token " + that.props.token, e.value).then((data) => {
      that.setState({ subjectsDetails: data.data });
    });
  }

  addClass(data) {
    var that = this;
    createNewClass(data, "token " + that.props.token).then((data) => {
      if (data.status === "SUCCESS") {
        that.togglePopup();
        that.setState({ allClasses: [] }, () => {
          that.getAllClasses("Token " + that.props.token);
        });
      } else {
        alert("Error!!");
      }
    });
  }

  openNewClassPopup() {
    this.setState(
      {
        popupHeaderText: "Add A New Class",
        popupBtnText: "Add",
      },
      () => {
        this.togglePopup();
      }
    );
  }

  togglePopup() {
    this.setState({ showPopup: !this.state.showPopup });
  }
}
