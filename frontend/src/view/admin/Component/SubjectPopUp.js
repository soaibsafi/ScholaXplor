import React from 'react';
import '../../../App.css';
import Dropdown from "react-dropdown";

import 'react-dropdown/style.css';

class SubjectPopUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      classname: this.props.subjectInfo.classname,
      subjectname: this.props.subjectInfo.subjectname,
      tname: this.props.subjectInfo.tname,
      uid: this.props.subjectInfo.uid,
      selectedClass: this.props.selectedClass,
      allTeacher: this.props.allTeacher
    }
    this.oninputChange = this.oninputChange.bind(this);
    this.onRoleSelect = this.onRoleSelect.bind(this);
    this.setUserID = this.setUserID.bind(this);
    this.sendData = this.sendData.bind(this);
    this.resetState = this.resetState.bind(this);
    this.close = this.close.bind(this);
  }

  render() {
    var that = this;
    return (
        <div className='popup'>
          <div className='App popup_inner'>
            <h2>{that.props.popupHeaderText + " " + (that.props.popupHeaderText !== "Update" ? that.props.selectedClass : '')}</h2>
            <div style={{alignItem: 'left'}}>
              {console.log(that.state.selectedClass)}
              <label> <b>Class name</b></label>
              <br/>
              <input className="form-control" type="text" name="classname" defaultValue={this.state.classname}
                     onChange={that.oninputChange.bind(this, "classname")} disabled
              />
              <br/>

              <label><b> Subject Name</b></label>
              <input className="form-control" type="text" name="subjectname" defaultValue={this.state.subjectname}
                     onChange={that.oninputChange.bind(this, "subjectname")}
              />
              <br/>

              <label><b> Teacher </b></label>
              <br/>
              <Dropdown classname='style.dropDown'
                      options={this.state.allTeacher}
                      onChange={this.onTeacherSelect}
                      placeholder="Choose a Teacher"
                      placeholderClassName='myPlaceholderClassName'/>
              <br/>

            </div>
            <button className='btn btn-primary' onClick={that.sendData}>{this.props.popupBtnText}</button>
            <button className='btn btn-danger' onClick={this.close}>{"Close"}</button>
          </div>
        </div>
    )
  }

  close(){
    this.resetState();
    this.props.closePopup();
  }

  resetState(){
    this.setState({
      classname: "",
      subjectname: "",
      tname: "",
      uid: "",
      selectedClass: "",
    })
  }

  oninputChange(key, e) {
    switch (key) {
      case "tname":
        this.setState({tname: e.target.value});
        break;
      case "classname":
        this.setState({classname: e.target.value});
        break;
      case "subjectname":
        this.setState({subjectname: e.target.value});
        break;
      case "password":
        this.setState({password: e.target.value});
        break;
      default:
        break;
    }
  }

  onRoleSelect(e) {
    this.setState({selectedClass: e.value})
  }

  setUserID(){
    return "USRATR" + Date.now()
  }

  sendData() {
    var data = this.props.popupBtnText === "Add" ? {
      "firstname": this.state.classname,
      "lastname": this.state.subjectname,
      "tname": this.state.tname,
      "password": this.state.password,
      "role": this.state.selectedClass,
      "uid": this.setUserID()

    } : {
      "firstname": this.state.classname,
      "lastname": this.state.subjectname,
      "role": this.state.selectedClass,
      "uid": this.state.uid
    }

    this.resetState();
    if (this.props.popupBtnText === "Add") {
      if (data.firstname.length &&
          data.lastname.length &&
          data.tname.length &&
          data.password.length)
        this.props.addUser(data)
      else alert("No name provided");
    } else {
      if (data.firstname.length &&
          data.lastname.length)
        this.props.updateInfo(data);
      else alert("Please Provide all information")
    }
  }
}

export default SubjectPopUp;
