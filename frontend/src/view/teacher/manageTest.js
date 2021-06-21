import React from "react";

import Dropdown from "react-dropdown";
import {
  getStudentMarkDetails,
  createNewTest,
  getTestDetails,
  checkResultID,
  uploadResult,
  deleteATest,
  updateResult,
  updateATest,
} from "../../api/TeacherAPI";

import { CSVReader } from "react-papaparse";

import "../../App.css";
import ManageTestPopup from "./ManageTestPopup";
import ManageStudentTestPopup from "./ManageStudentTestPopup";

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
      studentList: [{ name: 'abc', marks: 1.2, username: 'abc1' }],
      selectedTest: this.props.location.state.selectedTest,
      studentMarkData: [],

      showTestPopup: false,
      showStudentGradePopup: false,
      showPopUp: false,

      popupHeaderText: '',
      popupBtnText: '',
      studentData: '',

      testResult: [],
      tid: "",
      testname: "",
      testdate: "",
    };

    this.getAllTests = this.getAllTests.bind(this);
    this.loadFillData = this.loadFillData.bind(this);
    this.onTestChange = this.onTestChange.bind(this);
    this.gotoBack = this.gotoBack.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.loadStudentList = this.loadStudentList.bind(this);

    this.toggleNewTestPopup = this.toggleNewTestPopup.bind(this);
    this.toggleStudentGradePopup = this.toggleStudentGradePopup.bind(this);

    this.openStudentTestGradeUpdatePopup =
      this.openStudentTestGradeUpdatePopup.bind(this);
    this.openNewTestPopup = this.openNewTestPopup.bind(this);
    this.openUpdatePopup = this.openUpdatePopup.bind(this);

    this.closeStudentGradePopup = this.closeStudentGradePopup.bind(this);
    this.closeTestPopup = this.closeTestPopup.bind(this);
    this.uploadTestResult = this.uploadTestResult.bind(this);
    this.updateInfo = this.updateInfo.bind(this);

    this.addTest = this.addTest.bind(this);
    this.setID = this.setID.bind(this);
    this.deleteInfo = this.deleteInfo.bind(this);
    this.updateTest = this.updateTest.bind(this);
  }

  setID() {
    return "RES" + Date.now();
  }

  uploadTestResult() {
    var that = this;
    var countRow = 0;
    if (this.state.studentMarkData.length) {
      this.state.studentMarkData.forEach((stdData, idx) => {
        checkResultID(stdData, "Tokenn " + that.state.token).then(
          (response) => {
            if (response.res.length) {
              stdData.rid = response.res[0].resid;
            } else {
              stdData.rid = that.setID() + idx;
            }

            uploadResult(stdData, "Token " + that.state.token).then(
              (response) => {
                if (response.msg === "Inserted") {
                  that.loadStudentList();
                }
              }
            );
          }
        );
      });
    } else {
      alert("Please select a CSV file.");
    }
  }

  openUpdatePopup(data) {
    var that = this;
    debugger;
    if (this.state.selectedTest)
      that.setState(
        {
          popupHeaderText:
            "Update selected Test for " +
            that.state.classname +
            " - " +
            that.state.subjectname,
          popupBtnText: "Update",
        },
        () => {
          that.toggleNewTestPopup();
        }
      );
    else { alert("Please select a test") }
  }

  toggleNewTestPopup() {
    this.setState({ showPopUp: !this.state.showPopUp });
  }

  closeTestPopup() {
    var that = this;
    that.setState(
      {
        popupHeaderText: "",
        popupBtnText: "",
      },
      () => {
        that.toggleNewTestPopup();
      }
    );
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
    this.setState({ showStudentGradePopup: !this.state.showStudentGradePopup })
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
      studentMarkData: data,

    }, () => {
      that.toggleStudentGradePopup();
    })
  }

  loadStudentList() {
    var that = this;
    getStudentMarkDetails(that.state.selectedTest, that.state.sid, that.state.token).then(response => {
      // debugger;
      // console.log(response.data);
      debugger;
      if (response)
        if (response.data) {
          that.setState({ studentList: response.data })
        }
    })
  }

  handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnRemoveFile = (data) => {
    var that = this;
    this.setState({ studentMarkData: data ? data : [] }, () => {
      console.log(that.state.studentMarkData);
    });
  };

  handleRemoveFile = (e) => {
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  handleOnFileLoad = (data) => {
    var that = this;
    var obj = [];
    if (data) {
      data.forEach((dt, idx) => {
        if (idx !== 0)
          obj.push({
            uid: dt.data[0],
            grade: dt.data[1],
            sid: that.state.sid,
            tid: that.state.selectedTest,
            rid: "",
          });
      });
    }
    this.setState({ studentMarkData: obj }, () => {
      console.log(that.state.studentMarkData);
    });
  };

  handleOnError = (err, file, inputElem, reason) => { };

  componentDidMount() {
    this.getAllTests();
    this.loadStudentList();
  }

  render() {
    var that = this;
    return (
      <div>
        <div className="fill-window">
          <div className='main-title-area' style={{ paddingBottom: '20px', borderBottom: '3px solid rgb(95, 0, 124)' }}>
            <h3 style={{ color: '#6e6e6e' }}>Teacher Panel</h3>
          </div>
          <div className='tab-area'>
            <div className="subtitle-area">
              <button className="btn btn-outline-success" onClick={this.gotoBack}>Back</button>
              <h4 style={{ color: '#0275d8', textAlign: 'center', margin: '20px auto' }}>Test Management for {that.state.classname} - {that.state.subjectname}</h4>
            </div>
            <div className="box-container" >
              <div className='selection-area'>
                <Dropdown
                  classname="style.dropDown"
                  value={
                    that.state.testList[
                    this.getIndex(this.state.testList, this.state.selectedTest)
                    ]
                  }
                  options={that.state.testList}
                  onChange={this.onTestChange}
                  placeholder="Select a test"
                  placeholderClassName="myPlaceholderClassName"
                />
                <br/>
                <br/>
                <button className="btn btn-success" onClick={this.openNewTestPopup}> Add </button>
                <button
                  className="btn btn-info"
                  onClick={() => this.openUpdatePopup(that.state.classinfo)}
                >
                  Update
                </button>
                <button
                  className="btn  btn-danger"
                  onClick={() => this.deleteInfo(that.state.selectedTest)}
                >
                  Delete
                </button>

                <div className="upload-area">
                  <CSVReader
                    noClick
                    noDrag
                    ref={buttonRef}
                    onFileLoad={this.handleOnFileLoad}
                    onError={this.handleOnError}
                    onRemoveFile={this.handleOnRemoveFile}
                  >
                    {({ file }) => (
                      <aside
                        style={{  
                        }}
                      >
                        <button id="browse"  type="button" onClick={this.handleOpenDialog}> Browse file </button>
                        <div style={{}}>{file && file.name}</div>
                        <button  id="delete" onClick={this.handleRemoveFile} > Remove </button>
                      </aside>
                    )}
                  </CSVReader>
                  <button className="btn btn-danger" onClick={this.uploadTestResult}>
                    Upload
                  </button>
                </div>
              </div>

              {that.state.studentList.length ? (
                <div className="ag-theme-alpine data-table">
                  <div className="table-scroll">
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
                </div>
              ) : (
                <div>
                  <label>No student is in this class and test</label>
                </div>
              )}
              {that.state.showPopUp ? (
                <ManageTestPopup
                  testList={that.state.testList}
                  selectedTest={that.state.selectedTest}
                  popupHeaderText={that.state.popupHeaderText}
                  testDetailsList={that.state.testDetailsList}
                  sid={that.state.sid}
                  popupBtnText={that.state.popupBtnText}
                  updateTest={that.updateTest}
                  addTest={that.addTest}
                  closePopup={that.closeTestPopup}
                />
              ) : null}

              {that.state.showStudentGradePopup ? (
                <ManageStudentTestPopup
                  testList={that.state.testList}
                  selectedTest={that.state.selectedTest}
                  popupHeaderText={that.state.popupHeaderText}
                  studentData={that.state.studentData}
                  popupBtnText={that.state.popupBtnText}
                  studentMarkData={that.state.studentMarkData}
                  //        addUser={that.addUser}
                  updateInfo={that.updateInfo}
                  closePopup={that.closeStudentGradePopup}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  getIndex(arr, testVal) {
    return arr.findIndex((obj) => obj.value === testVal);
  }

  gotoBack() {
    this.props.history.push({
      pathname: redirectloginpath,
      state: { token: this.state.token, uid: this.state.uid },
    });
  }

  onTestChange(data) {
    var that = this;
    this.setState({ selectedTest: data.value }, () => {
      that.loadStudentList();
    });
  }

  loadFillData() {
    if (this.state.studentList.length) {
      return this.state.studentList.map((data, idx) => {
        return (
          <tr key={data.username + idx}>
            <td>{data.name}</td>
            <td>{data.marks}</td>
            <td>
              {
                <button
                  className="btn btn-info"
                  onClick={() => this.openStudentTestGradeUpdatePopup(data)}
                >
                  Change
                </button>
              }
            </td>
          </tr>
        );
      });
    }
  }

  getAllTests() {
    var tempList = [];
    var that = this;

    that.state.testDetailsList.forEach((info) => {
      var obj = { value: info.tid, label: info.testname };
      tempList.push(obj);
    });

    that.setState({ testList: tempList }, () => { });
  }

  addTest(data) {
    var that = this;
    console.log(that.state.token);

    createNewTest(data, "Token " + that.state.token).then((data) => {
      if (data.status === "SUCCESS") {
        that.toggleNewTestPopup();
        that.setState({ testList: [] }, () => {
          getTestDetails(that.state.sid, "Token " + that.props.token).then(
            (response) => {
              that.setState({ testDetailsList: response.data }, () => {
                that.getAllTests();
              });
            }
          );
        });
      } else {
        // alert("Error!!");
      }
    });

  }

  updateTest(data) {
    console.log(data);
    var that = this;
    //console.log(data)
    updateATest(data, "Token " + that.state.token).then((response) => {
      if (response.status === "SUCCESS") {
        that.toggleNewTestPopup();
        that.setState({ testList: [] }, () => {
          getTestDetails(that.state.sid, "Token " + that.props.token).then(
            (response) => {
              that.setState({ testDetailsList: response.data }, () => {
                that.getAllTests();
              });
            }
          );
        });
      } else {
        alert("Error!!");
      }
    });
  }

  deleteInfo(data) {
    var that = this;
    console.log(data);
    debugger
    if (this.state.selectedTest) {
      if (!window.confirm("Do you really want to delete the class?")) return;
      deleteATest(data, "Token " + that.state.token).then((data) => {
        alert(data.message);
        if (data.status === "SUCCESS") {
          that.setState({ testList: [] }, () => {
            getTestDetails(that.state.sid, "Token " + that.props.token).then(
              (response) => {
                that.setState({ testDetailsList: response.data, selectedTest: null }, () => {
                  that.getAllTests();
                });
              }
            );
          });
        } else {
          alert("Error!!");
        }
      });
    }
    else { alert("Please select a test to delete") }
  }



  updateInfo(data) {
    var that = this;
    var result = {
      rid: data.resid,
      sid: this.state.sid,
      tid: this.state.selectedTest,
      uid: data.uid,
      grade: data.marks,
    };
    debugger;
    updateResult(result, that.state.token).then((response) => {
      console.log(response);
      if (response.status === "SUCCESS") {
        that.toggleStudentGradePopup();
        that.setState({}, () => {
          that.loadStudentList();
        });
      } else {
        alert(response.message);
      }
    });
  }
}
