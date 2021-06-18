import React from "react";
import Dropdown from "react-dropdown";
import {getStudentMarkDetails} from "../../api/TeacherAPI";
import {CSVReader} from 'react-papaparse'

import '../../App.css';
import ManageTestPopup from './ManageTestPopup'
import ManageStudentTestPopup from './ManageStudentTestPopup'

const buttonRef = React.createRef();

var redirectloginpath = "/teacherpanel"

export default class manageTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.location.state.token,
      uid: this.props.location.state.uid,
      subjectname: this.props.location.state.info.subjectname,
      sid: this.props.location.state.info.sid,
      classname: this.props.location.state.info.classname,
      testDetailsList: this.props.location.state.testList,
      testList: [],
      studentList: [{name: 'abc', marks: 1.2, username: 'abc1'}],
      selectedTest: this.props.location.state.selectedTest,

      showTestPopup: false,
      showStudentGradePopup: false,
      showPopUp: false,

      popupHeaderText: '',
      popupBtnText: '',
      studentData: '',

      testResult:[],

    }

    this.getAllTests = this.getAllTests.bind(this);
    this.loadFillData = this.loadFillData.bind(this);
    this.onTestChange = this.onTestChange.bind(this);
    this.gotoBack = this.gotoBack.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.loadStudentList = this.loadStudentList.bind(this);

    this.toggleNewTestPopup = this.toggleNewTestPopup.bind(this);
    this.toggleStudentGradePopup = this.toggleStudentGradePopup.bind(this);


    this.openStudentTestGradeUpdatePopup = this.openStudentTestGradeUpdatePopup.bind(this);
    this.openNewTestPopup = this.openNewTestPopup.bind(this);
    this.openUpdatePopup = this.openUpdatePopup.bind(this);

    this.closeStudentGradePopup = this.closeStudentGradePopup.bind(this);
    this.closeTestPopup = this.closeTestPopup.bind(this);
    this.uploadTestResult = this.uploadTestResult.bind(this);

  }

  uploadTestResult(){
    if(this.state.testResult){

    }else{alert("Please select a CSV file.")}
  }

  openUpdatePopup(data) {
    var that = this;
    that.setState({
      popupHeaderText: "Update selected Test for " + that.state.classname + " - " + that.state.subjectname,
      popupBtnText: "Update",
    }, () => {
      that.toggleNewTestPopup();
    })
  }

  toggleNewTestPopup() {
    this.setState({showPopUp: !this.state.showPopUp});
  }

  closeTestPopup() {
    var that = this;
    that.setState({
      popupHeaderText: "",
      popupBtnText: "",

    }, () => {
      that.toggleNewTestPopup();
    })
  }

  openNewTestPopup() {
    var that = this;
    that.setState({
      popupHeaderText: "Add A new Test for " + that.state.classname + " - " + that.state.subjectname,
      popupBtnText: "Add",
    }, () => {
      that.toggleNewTestPopup();
    })
  }

  toggleStudentGradePopup() {
    this.setState({showStudentGradePopup: !this.state.showStudentGradePopup})
  }

  closeStudentGradePopup() {
    var that = this;
    this.setState({
          popupHeaderText: '',
          popupBtnText: "",
          studentData: '',
        },
        () => {
          that.toggleStudentGradePopup();
        })
  }

  openStudentTestGradeUpdatePopup(data) {
    var that = this;
    that.setState({
      popupHeaderText: data.name + "'s test and grade update",
      popupBtnText: "Update",
      studentData: data,

    }, () => {
      that.toggleStudentGradePopup();
    })
  }

  loadStudentList() {
    var that = this;
    getStudentMarkDetails(that.state.selectedTest, that.state.token).then(response => {
      console.log(response.data);
      if (response.data) {
        that.setState({studentList: response.data})
      }
    })
  }

  componentDidMount() {
    this.getAllTests();
    this.loadStudentList();
  }

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnRemoveFile = (data) => {
    console.log(data);
  };

  handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  handleOnFileLoad = (data) => {
    console.log(data);
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log('---------------------------');
    console.log(err);
    console.log('---------------------------');
  };

  render() {
    var that = this;
    return (
        <div className="App">
          <h2>Test Management for {that.state.classname} - {that.state.subjectname}</h2>
          <div className="row" style={{width: 520}}>
            <button className="btn btn-success" onClick={this.gotoBack}>Back</button>

            <Dropdown
                classname="style.dropDown"
                value={that.state.testList[this.getIndex(this.state.testList, this.state.selectedTest)]}
                options={that.state.testList}
                onChange={this.onTestChange}
                placeholder="Select a test"
                placeholderClassName="myPlaceholderClassName"
            />
            <button className="btn btn-success" onClick={this.openNewTestPopup}>Add</button>
            <button className="btn btn-info" onClick={() => this.openUpdatePopup(that.state.classinfo)}>Update</button>
            <button className="btn  btn-danger" onClick={() => this.deleteInfo(that.state.classinfo.cid)}>Delete
            </button>
          </div>
          <div className="row" style={{width: 1020}}>
            <CSVReader noClick noDrag ref={buttonRef}
                       onFileLoad={this.handleOnFileLoad}
                       onError={this.handleOnError} onRemoveFile={this.handleOnRemoveFile}>
              {({file}) => (
                  <aside style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
                    <button style={{
                      borderRadius: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      width: '40%',
                      paddingLeft: 0,
                      paddingRight: 0
                    }} type='button' onClick={this.handleOpenDialog}>Browse file
                    </button>
                    <div style={{
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#ccc',
                      height: 45,
                      lineHeight: 2.5,
                      marginTop: 5,
                      marginBottom: 5,
                      paddingLeft: 13,
                      paddingTop: 3,
                      width: '60%'
                    }}>{file && file.name}</div>
                    <button style={{
                      borderRadius: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      paddingLeft: 20,
                      paddingRight: 20
                    }} onClick={this.handleRemoveFile}>Remove</button>
                  </aside>
              )}
            </CSVReader>
            <button className="btn  btn-danger" onClick={this.uploadTestResult}>Upload</button>

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
          {that.state.showPopUp ?
              <ManageTestPopup
                  testList={that.state.testList}
                  selectedTest={that.state.selectedTest}
                  popupHeaderText={that.state.popupHeaderText}
                  popupBtnText={that.state.popupBtnText}
                  //        updateInfo={that.updateInfo}
                  //        addUser={that.addUser}
                  closePopup={that.closeTestPopup}
              /> : null}

          {that.state.showStudentGradePopup ?
              <ManageStudentTestPopup
                  testList={that.state.testList}
                  selectedTest={that.state.selectedTest}
                  popupHeaderText={that.state.popupHeaderText}
                  studentData={that.state.studentData}
                  //        popupBtnText={that.state.popupBtnText}
                  //        updateInfo={that.updateInfo}
                  //        addUser={that.addUser}
                  closePopup={that.closeStudentGradePopup}
              /> : null}
        </div>

    )
  }

  getIndex(arr, testVal) {
    return arr.findIndex(obj => obj.value === testVal);
  }

  gotoBack() {
    this.props.history.push({
      pathname: redirectloginpath,
      state: {token: this.state.token, uid: this.state.uid}
    });
  }

  onTestChange(data) {
    this.setState({selectedTest: data})
  }


  loadFillData() {
    if (this.state.studentList.length) {
      return this.state.studentList.map((data, idx) => {
        return (
            <tr key={data.username + idx}>
              <td>{data.name}</td>
              <td>{data.marks}</td>
              <td>{<button className="btn btn-info"
                           onClick={() => this.openStudentTestGradeUpdatePopup(data)}>Update</button>}</td>
            </tr>
        );
      });
    }
  }

  getAllTests() {
    var tempList = [];
    var that = this;

    that.state.testDetailsList.forEach(info => {
      var obj = {value: info.tid, label: info.testname};
      tempList.push(obj);
    });

    that.setState({testList: tempList}, () => {
    });
  }
}
