import React from 'react';
import Dropdown from "react-dropdown";
import {getAllUsers, createNewUser, updateAUser} from '../../../api/AdminAPI'
import Userpopup from "./Userpopup";

import style from './UserTab.css'
import '../../../App.css';
import 'react-dropdown/style.css';

const options = [
  {value: 'Admin', label: 'Admin'},
  {value: 'Pupil', label: 'Pupil'},
  {value: 'Teacher', label: 'Teacher'}
];

export default class UserTab extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      showPopup: false,
      selectedRole: '',
      popupHeaderText: '',
      popupBtnText: '',
      userinfo: {
        fname: '',
        lname: '',
        username: '',
        uid: ''
      }
    }
    this.loadFillData = this.loadFillData.bind(this);
    this.getAllUser = this.getAllUser.bind(this);
    this.openNewUserPopup = this.openNewUserPopup.bind(this);
    this.onRoleSelect = this.onRoleSelect.bind(this);
    this.openUpdatePopup = this.openUpdatePopup.bind(this);

    /// Popup functions
    this.addUser = this.addUser.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  componentDidMount() {
    var token = this.props.token;
    this.getAllUser("tokeon " + token);
  }

  render() {
    var that = this;
    return (
        <div className="App">

          <h2 className={style.dropDown}>User Managment</h2>
          <div className='row' style={{width: 340}}>
            <Dropdown classname='style.dropDown'
                      options={options}
                      onChange={this.onRoleSelect}
                      placeholder="Select an option"
                      placeholderClassName='myPlaceholderClassName'/>
            <button className="btn btn-success" onClick={this.openNewUserPopup}>Add</button>
          </div>
          {that.state.list.length ? <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
            <table className="table table-hover table-striped">
              <thead className="thead-dark">
              <tr key={"user_key1"}>
                <th scope="col">Username</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Role</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              {this.loadFillData()}
              </tbody>
            </table>
          </div>: <label>No data</label>}
          {that.state.showPopup ?
              <Userpopup userinfo={that.state.userinfo}
                         selectedRole={that.state.selectedRole}
                         closePopup={that.togglePopup.bind(this)}
                         popupHeaderText={that.state.popupHeaderText}
                         popupBtnText={that.state.popupBtnText}
                         updateInfo={that.updateInfo}
                         addUser={that.addUser}
              /> : null}
        </div>
    )
  }

  loadFillData() {
    if (this.state.list.length) {

      return this.state.list.map(data => {
        return (
            <tr key={data.uid}>
              <th>{data.username}</th>
              <th>{data.firstname}</th>
              <td>{data.lastname}</td>
              <td>{data.role}</td>
              <td>{<button className="btn btn-info" onClick={() => this.openUpdatePopup(data)}>Update</button>}</td>
              <td>{<button className="btn btn-danger" onClick={() => this.deleteInfo(data.id)}>Delete</button>}</td>
            </tr>
        )
      })
    } else console.log("No data");
  }

  getAllUser(token) {
    getAllUsers(token).then(data => {
      this.setState({list: data.data})
    })
  }

  openNewUserPopup() {
    if (this.state.selectedRole)
      this.setState({
            popupHeaderText: "Add A New",
            popupBtnText: "Add"
          },
          () => {
            this.togglePopup();
          })
    else alert("Please select a role.");

  }

  onRoleSelect(e) {
    this.setState({selectedRole: e.value})
  }

  openUpdatePopup(data) {
    this.setState({
          popupHeaderText: "Update",
          popupBtnText: "Update",
          userinfo: {
            fname: data.firstname,
            lname: data.lastname,
            uid: data.uid,
            username: data.username
          },
          selectedRole: data.role

        },
        () => {
          this.togglePopup();
        })
    // updateUser(data).then(res => {
    //   this.getAllInfo();
    //
    // })
  }

  addUser(data) {
    var that = this;
    createNewUser(data, "token " + that.props.token).then(data => {
      if (data.status === "SUCCESS") {
        that.togglePopup();
        that.setState({list:[]},() =>{
          that.getAllUser("Token " + that.props.token)
        })

      }
      else {
        alert("Error!!")
      }
    })
  }

  updateInfo(data) {
    var that = this;
    updateAUser(data, "Token " + that.props.token).then(response => {
      if (response.status === "SUCCESS") {
        that.togglePopup();
        that.setState({list:[]},() =>{
          that.getAllUser("Token " + that.props.token)
        })
      }
    })
  }

  togglePopup() {
    this.setState({showPopup: !this.state.showPopup});
  }
}
