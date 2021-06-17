import React from 'react';
import Dropdown from "react-dropdown";
import { 
  getUsersByRole, 
  getAllClass, 
  getSubjectClassTeacherTogether,
  checkSubjectExists,
  createSubject,
  updateSubject,
  deleteSubject
 } from '../../../api/AdminAPI'
import SubjectPopUp from "./SubjectPopUp";

import style from './SubjectTab.css'
import '../../../App.css';
import 'react-dropdown/style.css';


export default class SubjectTab extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allClass: [],
      allTeacher: [],
      list: [],
      showPopup: false,
      selectedClass: '',
      popupHeaderText: '',
      popupBtnText: '',
      subjectInfo: {
        classname: '',
        subjectname: '',
        tname: '',
        uid: '',
        status: ''
      },
      token: "token " + this.props.token
    }
    this.onClassSelect = this.onClassSelect.bind(this);
    this.getAllClass = this.getAllClass.bind(this);
    this.loadFillData = this.loadFillData.bind(this);
    /// Popup functions
    this.openAddNewSubjectPopUp = this.openAddNewSubjectPopUp.bind(this);
    this.addSubject = this.addSubject.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  componentDidMount() {
    var token = this.props.token;
    this.getAllClass("tokeon " + token);
    this.getAllTeacher("tokeon " + token);
  }

  render() {
    var that = this;
    return (
      <div className="App">
        <h2 className={style.dropDown}>Subject Management</h2>

        <div className="select-class-area">
          <Dropdown classname='style.dropDown'
            options={this.state.allClass}
            onChange={this.onClassSelect}
            placeholder="Choose a class"
            placeholderClassName='myPlaceholderClassName' />
        </div>
        <div className='row add-subject-area'>
          <button className="btn btn-success " onClick={this.openAddNewSubjectPopUp}>Add</button>
        </div>
        <br />
        <br />
        <div className="ag-theme-alpine" style={{ height: 400, width: 800 }}>
          <table className="table table-hover table-striped">
            <thead className="thead-dark">
              <tr key={"user_key1"}>
                <th scope="col">Class</th>
                <th scope="col">Subject</th>
                <th scope="col">Teacher</th>
                <th scope="col">Status</th>
                <th scope="col">Update</th>
                <th scope="col">Remove Subject</th>
              </tr>
            </thead>
            <tbody>
              {this.loadFillData()}
            </tbody>
          </table>
        </div>
        {that.state.showPopup ?
          <SubjectPopUp subjectInfo={that.state.subjectInfo}
            selectedClass={that.state.selectedClass}
            allTeacher={this.state.allTeacher}
            popupHeaderText={that.state.popupHeaderText}
            popupBtnText={that.state.popupBtnText}
            updateInfo={that.updateInfo}
            addSubject={that.addSubject}
            closePopup={that.closePopup}
          /> : null}
      </div>
    )
  }


  //******************* Changes On Select ********************/

  onClassSelect(e) {
    var that = this;

    that.setState({ subjectInfo: {classname: e.label} })

    this.setState({ selectedClass: e.value }, () => {
      getSubjectClassTeacherTogether(e.value, that.state.token).then(data => {
        //debugger;
        that.setState({ list: data.data })
      })
    })
  }



  //******************* Load Dropdown ********************/

  getAllTeacher(token) {
    var tList = [];
    getUsersByRole("Teacher", token).then(data => {      
      data.data.forEach(info => {
        var tname = info.firstname + " " + info.lastname
        var obj = { value: info.uid, label: tname }
        tList.push(obj);
      });
      this.setState({ allTeacher: tList });
    })
  }

  getAllClass(token) {
    var tList = [];
    getAllClass(token).then(data => {
      data.data.forEach(info => {
        var obj = { value: info.cid, label: info.classname }
        tList.push(obj);
      });
      this.setState({ allClass: tList });
    })
  }


  //******************* Load Table ********************/

  loadFillData() {
    if (this.state.list.length) {

      return this.state.list.map(data => {
        return (
          <tr key={data.sid}>
            <th>{data.classname}</th>
            <th>{data.subjectname}</th>
            <th>{data.tname}</th>
            <th>{data.status}</th>
            <td>{<button className="btn btn-info" onClick={() => this.openUpdatePopup(data)} disabled={data.status === "Archived" ? true : false}>Update</button>}</td>
            <td>{<button className="btn btn-danger" onClick={() => this.deleteInfo(data.sid)} disabled={data.status === "Archived" ? true : false}>Delete</button>}</td>
          </tr>
        )
      })
    }
    else console.log("No data");
  }



  //******************* Show PopUp ********************/

  openAddNewSubjectPopUp() {
    if (this.state.selectedClass)
      this.setState({
        popupHeaderText: "Add A New",
        popupBtnText: "Add",
        subjectInfo: {
          classname: this.state.subjectInfo.classname,
          subjectname: '',
          uid: '',
          tname: ''
        }
      },
        () => { this.togglePopup(); })
    else alert("Please select a class");

  }

  openUpdatePopup(data) {
    this.setState({
      popupHeaderText: "Update",
      popupBtnText: "Update",
      subjectInfo: {
        classname: data.classname,
        subjectname: data.subjectname,
        uid: data.uid,
        tname: data.tname,
        sid:data.sid
      },
      selectedClass: data.cid
    },
      () => {
        this.togglePopup();
      })
  }

  togglePopup() {
    this.setState({ showPopup: !this.state.showPopup });
  }



  //******************* Post PopUp Action ********************/

  addSubject(data) {
    var that = this;
    var tempCid = data.cid;
    checkSubjectExists(data.subjectname, data.uid, data.cid, that.state.token).then(response => {
      
      if (!response.data.length)
         createSubject(data.sid, data.subjectname, data.status, data.uid, data.cid, that.state.token).then(res => {
          if (res.status === "SUCCESS") {
            that.togglePopup();
            that.setState({
              list: [],
              popupHeaderText: "",
              popupBtnText: "",
              subjectInfo: {
                classname: '',
                subjectname: '',
                tname: '',
                uid: '',
                status: ''
              },
              selectedClass: tempCid}, () => {
                that.LoadUpdatedData(tempCid, that.state.token)
            })
          } else {
            alert("Error!!")
          }
        }) 
      else alert("This Subject already existed");
    })

  }

  updateInfo(data) {
    var that = this;
    var tempCid = data.cid

     updateSubject(data, that.state.token).then(response => {
      if (response.status === "SUCCESS") {
        that.togglePopup();
        that.setState({
          list: [],
          popupHeaderText: "",
          popupBtnText: "",
          subjectInfo: {
            classname: '',
            subjectname: '',
            tname: '',
            uid: '',
            status: ''
          },
          selectedClass: tempCid}, () => {
            that.LoadUpdatedData(tempCid, that.state.token)
        })
      }else {
        alert("Error!!")
      }
    }) 
  }

  deleteInfo(sid) {
    var that = this;

    if (!window.confirm("Do you really want to delete it?")) return;
      deleteSubject(sid, that.state.token).then(data => {
      alert(data.status + ": " +data.message);
      that.LoadUpdatedData(that.state.selectedClass, that.state.token);
    })
  }

  closePopup() {
    this.setState({
      subjectInfo: {
        classname: '',
        subjectname: '',
        tname: '',
        uid: '',
        status: ''
      }
    },
      () => {
        this.togglePopup();
      })
  }

  //******************** Load Updated Data After PopUp Action ************/

  LoadUpdatedData(cid, token) {
    getSubjectClassTeacherTogether(cid, token).then(data => {
      this.setState({ list: data.data })
    })
  }


}
