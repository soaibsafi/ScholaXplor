import React from 'react';
import '../../../App.css';
import Dropdown from "react-dropdown";

import 'react-dropdown/style.css';

const StatusOptions = [
  {value: 'Archived', label: 'Archived'},
  {value: 'Not Archived', label: 'Not Archived'}
];

class SubjectPopUp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      classname: this.props.subjectInfo.classname,
      subjectname: this.props.subjectInfo.subjectname,
      tname: this.props.subjectInfo.tname,
      uid: this.props.subjectInfo.uid,
      selectedClass: this.props.selectedClass,
      allTeacher: this.props.allTeacher,
      selectedTeacher: '',
      selectedStatus: ''
    }
    this.oninputChange = this.oninputChange.bind(this);
    this.onTeacherSelect = this.onTeacherSelect.bind(this);
    this.setSubjectID = this.setSubjectID.bind(this);
    this.sendData = this.sendData.bind(this);
    this.resetState = this.resetState.bind(this);
    this.close = this.close.bind(this);
  }

  render() {
    var that = this;
    return (
        <div className='popup'>
          <div className='App popup_inner'>
            <h2>{that.props.popupHeaderText + " " + (that.props.popupHeaderText !== "Update" ? 'Subject' : '')}</h2>
            <div style={{alignItem: 'left'}}>
              {console.log(that.state.selectedClass)}
              <label> <b>Class name</b></label>
              <br/>
              <input className="form-control" type="text" name="classname" defaultValue={that.state.classname} disabled/>
              <br/>

              <label><b> Subject Name</b></label>
                  <input className="form-control" type="text" name="subjectname" defaultValue={that.props.popupHeaderText === "Update" ? that.state.subjectname : ""}
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

              {that.props.popupHeaderText === "Update" ?
                  <div>
                    <label><b> Status </b></label>
                    <Dropdown classname='style.dropDown'
                      options={StatusOptions}
                      onChange={that.onStatusSelect}
                      placeholder="Set a status"
                      placeholderClassName='myPlaceholderClassName'/>
                    <br/>
                  </div> : null}
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
      uid: "",
      cid: "",
      selectedClass: "",
      selectedTeacher: '',
      selectedStatus: ''
    })
  }

  oninputChange(key, e) {
    switch (key) {
      case "subjectname":
        this.setState({subjectname: e.target.value});
        break;
      default:
        break;
    }
  }

  onTeacherSelect(e) {
    this.setState({selectedTeacher: e.value})
  }

  onStatusSelect(e) {
    console.log(e.value)
    debugger
    this.setState({selectedStatus: e.value})
  }

  setSubjectID(){
    return "SUB" + Date.now()
  }

  sendData() {

    var data = this.props.popupBtnText === "Add" ? {
      "classname": this.state.classname,
      "subjectname": this.state.subjectname,
      "uid": this.state.selectedTeacher,
      "cid": this.state.selectedClass, 
      "status": "Not Archived",
      "sid": this.setSubjectID()

    } : {
      "firstname": this.state.classname,
      "lastname": this.state.subjectname,
      "role": this.state.selectedClass,
      "uid": this.state.uid
    }

    this.resetState();

    if (this.props.popupBtnText === "Add") {
      if (data.subjectname.length && data.uid.length)
        this.props.addSubject(data)
        
      else alert("Subject and Teacher name cannot be empty");
    } else {
      if (data.uid.length)
        this.props.updateInfo(data);
      else alert("Please choose a teacher")
    }
  }
}

export default SubjectPopUp;
