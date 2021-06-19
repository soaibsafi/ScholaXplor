import React from 'react';

import '../../App.css';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';


class ManageTestPopup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     testList:this.props.testList,
      selectedTest: this.props.selectedTest,
    }
    // this.oninputChange = this.oninputChange.bind(this);
    this.onTestSelect = this.onTestSelect.bind(this);
    // this.setUserID = this.setUserID.bind(this);
    // this.sendData = this.sendData.bind(this);
    // this.resetState = this.resetState.bind(this);
     this.close = this.close.bind(this);
    this.getIndex = this.getIndex.bind(this);
  }

  componentDidMount() {
  }

  render() {
    var that = this;
    return (
        <div className='popup'>
          <div className='App popup_inner'>
            <h2>{that.props.popupHeaderText}</h2>
            {/*<div style={{alignItem: 'left'}}>*/}
            {/*      <Dropdown classname='style.dropDown'*/}
            {/*                value={that.state.testList[this.getIndex(this.state.testList, this.state.selectedTest)]}*/}
            {/*                options={that.state.testLists}*/}
            {/*                onChange={that.onTestSelect}*/}
            {/*                placeholder="Select an option"*/}
            {/*                placeholderClassName='myPlaceholderClassName'/>*/}

            {/*  <label> User name</label><br/>*/}
            {/*  {that.props.popupHeaderText === "Update" ?*/}
            {/*      <label>{this.state.username}</label> :*/}
            {/*      <input className="form-control" type="text" name="username"*/}
            {/*             onChange={that.oninputChange.bind(this, "username")}*/}
            {/*      />}*/}
            {/*  <br/>*/}
            {/*  <label> First Name:</label>*/}
            {/*  <input className="form-control" type="text" name="fname" defaultValue={this.state.fname}*/}
            {/*         onChange={that.oninputChange.bind(this, "fname")}*/}
            {/*  />*/}
            {/*  <br/>*/}
            {/*  <label>Last Name:</label>*/}
            {/*  <input className="form-control" type="text" name="lname" defaultValue={this.state.lname}*/}
            {/*         onChange={that.oninputChange.bind(this, "lname")}*/}
            {/*  />*/}
            {/*  <br/>*/}
            {/*  {that.props.popupHeaderText !== "Update" ?*/}
            {/*      <div>*/}
            {/*        <label>Password:</label>*/}
            {/*        <input className="form-control" type="password" name="password"*/}
            {/*               onChange={that.oninputChange.bind(this, "password")}*/}
            {/*        />*/}
            {/*        <br/>*/}
            {/*      </div> : null}*/}
            {/*</div>*/}
            <button className='btn btn-primary' onClick={that.sendData}>{this.props.popupBtnText}</button>
            <button className='btn btn-danger' onClick={this.close}>{"Close"}</button>
          </div>
        </div>
    )
  }

  getIndex(arr, testVal) {
    return arr.findIndex(obj => obj.value === testVal.value);
  }


  close(){
    this.props.closePopup();
  }

  oninputChange(key, e) {
    switch (key) {
      case "username":
        this.setState({username: e.target.value});
        break;
      case "fname":
        this.setState({fname: e.target.value});
        break;
      case "lname":
        this.setState({lname: e.target.value});
        break;
      case "password":
        this.setState({password: e.target.value});
        break;
      default:
        break;
    }
  }

  onTestSelect(e) {
    this.setState({selectedTest: e.value})
  }

  setUserID(){
    return "USRATR" + Date.now()
  }

  sendData() {
    var data = this.props.popupBtnText === "Add" ? {
      "firstname": this.state.fname,
      "lastname": this.state.lname,
      "username": this.state.username,
      "password": this.state.password,
      "role": this.state.selectedRole,
      "uid": this.setUserID()

    } : {
      "firstname": this.state.fname,
      "lastname": this.state.lname,
      "role": this.state.selectedRole,
      "uid": this.state.uid
    }

    this.resetState();
    if (this.props.popupBtnText === "Add") {
      if (data.firstname.length &&
          data.lastname.length &&
          data.username.length &&
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

export default ManageTestPopup;
