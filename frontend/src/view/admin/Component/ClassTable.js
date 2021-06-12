import React from "react";
import Dropdown from "react-dropdown";
import { getAllClass } from "../../../api/AdminAPI";
import Userpopup from "./Userpopup";

import style from "./UserTab.css";
import "../../../App.css";
import "react-dropdown/style.css";

const options = ["Pupil", "Teacher"];

export default class ClassTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      allClasses: [],
    };
    this.loadFillData = this.loadFillData.bind(this);
    this.getAllClasses = this.getAllClasses.bind(this);
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
          <select onChange={this.getAllClasses}>
            <option value="Select a Class"> -- Select a Class -- </option>
            {that.state.allClasses.map((classes, idx) => (
              <option value={classes.cid} key={idx}>
                {classes.classname}
              </option>
            ))}
          </select>

          <button className="btn btn-success" onClick={this.addNewUser}>
            Add
          </button>
        </div>
      </div>
    );
  }

  getAllClasses(token) {
    getAllClass(token).then((data) => {
      this.setState({ allClasses: data.data });
    });
  }

  loadFillData() {
    if (this.state.allClasses.length) {
      return this.state.allClasses.map((data) => {
        const { allClasses } = this.state;
        return (
          <select onChange={this.searchSubmit}>
            <option value="-1">Select Class</option>
            {allClasses.map((classes) => (
              <option value={classes.cid} key={classes.cid}>
                {classes.classname}
              </option>
            ))}
          </select>
        );
      });
    } else console.log("No data");
  }

  //   getAllClasses(token) {
  //     var tempList = [];
  //     getAllClass(token).then((data) => {
  //       data.data.map((info) => {
  //         tempList.push(info.classname);
  //       });
  //       this.setState({ allClasses: tempList });
  //     });
  //   }
}
