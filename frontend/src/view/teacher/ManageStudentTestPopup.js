import React from 'react';
import '../../App.css';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

export default class ManageStudentTestPopup extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      testList:this.props.testList,
      selectedTest:this.props.selectedTest,
      marks:this.props.studentData.marks,
    }

    this.getIndex = this.getIndex.bind(this);
    this.oninputChange = this.oninputChange.bind(this);
    this.close = this.close.bind(this);

  }

  componentDidMount() {

  }

  close(){
    this.props.closePopup();
  }

  oninputChange(key, e) {
    switch (key) {
      case "marks":
        this.setState({marks: e.target.value});
        break;
      default:
        break;
    }
  }

  getIndex(arr, testVal) {
    return arr.findIndex(obj => obj.value === testVal);
  }

  render() {
    var that = this;

    return(
        <div className='popup'>
          <div className='App popup_inner'>
            <h2>{that.props.popupHeaderText }</h2>
            <div style={{alignItem: 'left'}}>
              <Dropdown classname='style.dropDown'
                        value={that.state.testList[this.getIndex(this.state.testList, this.state.selectedTest)]}
                        options={that.state.testLists}
                        onChange={that.onTestSelect}
                        placeholder="Select an option"
                        placeholderClassName='myPlaceholderClassName'/>



              <label> Marks</label><br/>
              <input className="form-control" defaultValue={this.state.marks} type="text" name="marks" onChange={that.oninputChange.bind(this, "marks")}/>
              <br/>
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
            </div>
            <button className='btn btn-primary' onClick={that.sendData}>Update</button>
            <button className='btn btn-danger' onClick={this.close}>{"Close"}</button>
          </div>
        </div>
    )
  }
}
