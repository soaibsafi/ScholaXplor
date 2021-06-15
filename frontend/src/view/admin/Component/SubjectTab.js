import React from 'react';
import Dropdown from "react-dropdown";
import {getAllUsers, getAllClass, getSubjectClassTeacherTogether} from '../../../api/AdminAPI'
import SubjectPopUp from "./SubjectPopUp";

import style from './SubjectTab.css'
import '../../../App.css';
import 'react-dropdown/style.css';


export default class SubjectTab extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      allClass: [],
      list: [],
      showPopup: false,
      selectedClass:'',
      popupHeaderText:'',
      popupBtnText:'',
      subjectInfo: {
        classname: '',
        subjectname: '',
        tname: '',
        uid: '',
        status:''
      },
      token: "token " + this.props.token
    }
    this.loadFillData = this.loadFillData.bind(this);
    this.getAllUser = this.getAllUser.bind(this);
    this.getAllClass = this.getAllClass.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.onClassSelect = this.onClassSelect.bind(this);

    // this.addUser = this.addUser.bind(this);
    // this.updateUser = this.updateUser.bind(this);
     this.togglePopup = this.togglePopup.bind(this);
     
  }

  componentDidMount() {
    var token = this.props.token;
    this.getAllUser("tokeon " + token);
    this.getAllClass("tokeon " + token);
  }

  render() {
    var that = this;
    return (
        <div className="App">
          <h2 className={style.dropDown}>Subject Managment</h2>

          <div className="select-class-area">
          <Dropdown classname='style.dropDown'
                      options={this.state.allClass}
                      onChange={this.onClassSelect}
                      placeholder="Choose a class"
                      placeholderClassName='myPlaceholderClassName'/>
          </div>
          <div className='row add-subject-area'>     
            <input className="form-control-lg"  type="text" name="subject"  placeholder="Enter Subject Name"
                       // onChange={this.oninputChange.bind(this, "fname")}
                />
            <input className="form-control-lg"  type="text" name="teacher"  placeholder="Search Teacher"
                       // onChange={this.oninputChange.bind(this, "fname")}
                />
                <br/>
            <button className="btn btn-success " onClick={this.addNewUser}>Add</button>
          </div>
          <br/>
          <br/>
          <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
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
                            popupHeaderText={that.state.popupHeaderText}
                            popupBtnText={that.state.popupBtnText}
                            updateInfo={that.updateInfo}
                            addUser={that.addUser}
                            closePopup={that.closePopup}
              /> : null}
        </div>
    )
  }

  onClassSelect(e){
    var that = this;

    this.setState({selectedClass: e.value}, () => {
       
        getSubjectClassTeacherTogether(e.value, that.state.token).then(data => {
          //debugger;
          that.setState({list: data.data})
        })
      
    })
  }

  // addUser(data) {
  //   addAUser(data).then(data => {
  //     this.getAllInfo();
  //     this.togglePopup();
  //   })
  // }
  //
  // updateUser(data) {
  //   updateUser(data).then(res => {
  //     this.getAllInfo();
  //     this.togglePopup();
  //   })
  // }

  togglePopup(){
    this.setState({showPopup : !this.state.showPopup});
  }

  addNewUser() {
    if(this.state.selectedClass)
    this.setState({
          popupHeaderText: "Add A New",
          popupBtnText:"Add"},
        ()=>{this.togglePopup();})
    else alert("Please select a role.");

  }

  getAllUser(token) {
    getAllUsers(token).then(data => {
      this.setState({list: data.data})
    })
  }

  getAllClass(token) {
    var tList = [];
    getAllClass(token).then(data => {     
      data.data.forEach(info => {
          var obj = {value: info.cid, label: info.classname}
          tList.push(obj);            
      });
      this.setState({allClass: tList});
    })
  }

  loadFillData() {
    if(this.state.list.length) {

      return this.state.list.map(data => {
        return (
            <tr key={data.cid}>
              <th>{data.classname}</th>
              <th>{data.subjectname}</th>
              <th>{data.tname}</th>
              <th>{data.status}</th>
              
              {<td>{<button className="btn btn-info" onClick={() => this.openUpdatePopup(data)} disabled>Update</button>}</td>}
              {<td>{<button className="btn btn-info" onClick={() => this.openUpdatePopup(data)} >Update</button>}</td>}
              
              <td>{<button className="btn btn-danger" onClick={() => this.deleteInfo(data.id)}>Delete</button>}</td>
            </tr>
        )
      })
    }
    else console.log("No data");
  }


  openUpdatePopup(data) {
    this.setState({
          popupHeaderText: "Update",
          popupBtnText: "Update",
          subjectInfo: {
            classname: data.classname,
            subjectname: data.subjectname,
            uid: data.uid,
            tname: data.tname
          },
          selectedClass: data.cid
          
        },
        () => {
          this.togglePopup();
        })
  }

  close(){
    this.resetState();
    this.props.closePopup();
  }

  resetState(){
    this.setState({
      fname: "",
      lname: "",
      username: "",
      uid: "",
      selectedRole: "",
      password: ''
    })
  }

}
