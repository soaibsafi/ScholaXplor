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
      resid:this.props.studentData.resid
    }

    this.onTestSelect = this.onTestSelect.bind(this);
    this.getIndex = this.getIndex.bind(this);
    this.oninputChange = this.oninputChange.bind(this);
    this.sendData = this.sendData.bind(this);
    this.close = this.close.bind(this);

  }

  componentDidMount() {

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
                        options={that.state.testList}
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


  close(){
    this.props.closePopup();
  }
  


  getIndex(arr, testVal) {
    return arr.findIndex(obj => obj.value === testVal);
  }


   //******************* Changes On Select ********************/

   onTestSelect(e) {
     console.log(e.value)
    this.setState({ selectedTest: e.value })
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

  //******************* Send Data to Subject Tab Component ********************/


  sendData() {

    var data =  {
      "resid": this.state.resid,
      "marks": this.state.marks
    } 

console.log(data.resid)
      if (data.resid != null && data.marks.length)
        this.props.updateInfo(data);
      else alert("Please provide all info") 
  }

}
