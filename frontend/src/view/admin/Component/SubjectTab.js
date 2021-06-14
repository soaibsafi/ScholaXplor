import React from 'react';
import Dropdown from "react-dropdown";
import {getAllUsers, getAllClass} from '../../../api/AdminAPI'
import Userpopup from "./Userpopup";

import style from './SubjectTab.css'
import '../../../App.css';
import 'react-dropdown/style.css';

var options = [
  'Pupil', 'Teacher'
];

export default class SubjectTab extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      class: [],
      list: [],
      showPopup: false,
      selectedRole:'',
      popupHeaderText:'',
      popupBtnText:''
    }
    this.loadFillData = this.loadFillData.bind(this);
    this.getAllUser = this.getAllUser.bind(this);
    this.getAllClass = this.getAllClass.bind(this);
    this.addNewUser = this.addNewUser.bind(this);
    this.onRoleSelect = this.onRoleSelect.bind(this);

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
         {this.loadClass()}
          <h2 className={style.dropDown}>Subject Managment</h2>

          <div className='row add-subject-area'>
            <Dropdown classname='style.dropDown'
                      options={options}
                      onChange={this.onRoleSelect}
                      placeholder="Choose a class"
                      placeholderClassName='myPlaceholderClassName'/>
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
              <Userpopup selectedRole={that.state.selectedRole}
                         closePopup={that.togglePopup.bind(this)}
                         popupHeaderText={that.state.popupHeaderText}
                         popupBtnText={that.state.popupBtnText}

              /> : null}
        </div>
    )
  }

  onRoleSelect(e){
    console.log(e);
    this.setState({selectedRole : e.value})
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
    if(this.state.selectedRole)
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
    getAllClass(token).then(data => {
      console.log(data.data);
      this.setState({class: data.data})
    })
  }

  loadFillData() {
    if(this.state.list.length) {

      return this.state.list.map(data => {
        return (
            <tr key={data.uid}>
              <th>{data.username}</th>
              <th>{data.firstname}</th>
              <td>{data.lastname}</td>
              <td>{<button className="btn btn-info" onClick={() => this.updateInfo(data)}>Update</button>}</td>
              <td>{<button className="btn btn-danger" onClick={() => this.deleteInfo(data.id)}>Delete</button>}</td>
            </tr>
        )
      })
    }
    else console.log("No data");
  }


  loadClass() {
    if(this.state.class.length) {

      return this.state.class.map(data => {
        return (
           [ data.classname ]            
        )
      })
    }
    else console.log("No data");
  }
}
