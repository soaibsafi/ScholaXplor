import React from 'react';
import '../../../App.css';
import Dropdown from "react-dropdown";

import 'react-dropdown/style.css';

const options = [
  {value: 'Admin', label: 'Admin'},
  {value: 'Pupil', label: 'Pupil'},
  {value: 'Teacher', label: 'Teacher'}
];

class classpopup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      classname: this.props.classinfo.classname,
      cid: this.props.classinfo.cid,
    }
    this.oninputChange = this.oninputChange.bind(this);
    this.setClassID = this.setClassID.bind(this);

    this.sendData = this.sendData.bind(this);
  }

  render() {
    var that = this;
    return (
        <div className='popup'>
          <div className='App popup_inner'>
            <h2>{that.props.popupHeaderText + " " + (that.props.popupHeaderText !== "Update" ? that.props.selectedRole : '')}</h2>
            <div style={{alignItem: 'left'}}>

              <label>Class Name</label><br/>
              {that.props.popupHeaderText === "Update" ?
                  <label>{this.state.username}</label> :
                  <input className="form-control" type="text" name="classname"
                         onChange={that.oninputChange.bind(this, "classname")}
                  />}
            </div>
            <button className='btn btn-primary' onClick={that.sendData}>{this.props.popupBtnText}</button>
            <button className='btn btn-danger' onClick={that.props.closePopup}>{"Close"}</button>
          </div>
        </div>
    )
  }

  oninputChange(key, e) {
    switch (key) {
      case "classname":
        this.setState({classname: e.target.value});
        break;
      default:
        break;
    }
  }

  onRoleSelect(e) {
    this.setState({selectedRole: e.value})
  }

  setClassID(){
    return "CLS" + Date.now()
  }

  sendData() {
    var data = this.props.popupBtnText === "Add" ? {
      "classname": this.state.classname,
      "cid": this.setClassID()

    } : {
      "classname": this.state.classname,
      "cid": this.state.cid
    }

    if (this.props.popupBtnText === "Add") {
      if (data.classname.length)
        this.props.addClass(data)
      else alert("No name provided");
    } else {
      if (data.classname.length)
        this.props.updateInfo(data);
      else alert("Please Provide all information")
    }
  }
}

export default classpopup;
