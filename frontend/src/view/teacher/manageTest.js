import React from "react";
import Dropdown from "react-dropdown";
import {getAllClass} from "../../api/AdminAPI";

import '../../App.css';
import ManageTestPopup from './ManageTestPopup'

var testList = [{
  tid: 'TST1623975160553',
  testname: 'Test1',
  testdate: '01/11/2021',
  sid: 'SUB1623962177966'
}]

export default class manageTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectname: 'English',
      list: [],
      studentList: [{name: 'abc', marks: 1.2, username: 'abc1'}],
      showPopup:false,
      selectedTest:''
    }

    this.getAllTests = this.getAllTests.bind(this);
    this.loadFillData = this.loadFillData.bind(this);
    this.openUpdatePopup = this.openUpdatePopup.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.onTestChange = this.onTestChange.bind(this);
  }

  componentDidMount() {
    this.getAllTests();
  }

  render() {
    var that = this;
    return (
        <div className="App">
          <h2>Test Management for {that.state.subjectname}</h2>
          <div className="row" style={{width: 520}}>
            <Dropdown
                classname="style.dropDown"
                options={that.state.list}
                onChange={this.onTestChange}
                placeholder="Select a test"
                placeholderClassName="myPlaceholderClassName"
            />

            <button className="btn btn-success" onClick={this.openNewClassPopup}>
              Add
            </button>
            <button className="btn btn-info" onClick={() => this.openUpdatePopup(that.state.classinfo)}>
              Update
            </button>

            <button className="btn  btn-danger" onClick={() => this.deleteInfo(that.state.classinfo.cid)}>
              Delete
            </button>
          </div>
          <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
            <table className="table table-hover table-striped">
              <thead className="thead-dark">
              <tr key={"user_key1"}>
                <th scope="col">Student Name</th>
                <th scope="col">Grade</th>
                <th scope="col">Action</th>
              </tr>
              </thead>
              <tbody>{this.loadFillData()}</tbody>
            </table>
          </div>
          {that.state.showPopup ?
              <ManageTestPopup
                  testList={that.state.list}
                  selectedTest={that.state.selectedTest}
                  //        popupHeaderText={that.state.popupHeaderText}
                  //        popupBtnText={that.state.popupBtnText}
                  //        updateInfo={that.updateInfo}
                  //        addUser={that.addUser}
                  //        closePopup={that.closePopup}
              /> : null}
        </div>

    )
  }

  onTestChange(data){
    this.setState({selectedTest:data})
  }

  openUpdatePopup(data){
    var that = this;

    that.setState({},()=>{
      that.togglePopup();
    })
  }

  togglePopup() {
    this.setState({showPopup: !this.state.showPopup});
  }

  loadFillData() {
    if (this.state.studentList.length) {
      return this.state.studentList.map((data, idx) => {
        return (
            <tr key={data.username + idx}>
              <td>{data.name}</td>
              <td>{data.marks}</td>
              <td>{<button className="btn btn-info" onClick={() => this.openUpdatePopup(data)}>Update</button>}</td>
            </tr>
        );
      });
    }
  }

  getAllTests() {
    var tempList = [];
    // getAllClass(token).then((data) => {
    //   data.data.forEach((info) => {
    testList.forEach(info => {
      var obj = {value: info.tid, label: info.testname};
      tempList.push(obj);
    });

    this.setState({list: tempList});
    // });
  }
}
