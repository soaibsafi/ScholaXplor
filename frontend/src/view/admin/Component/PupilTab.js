import React from 'react';
import Dropdown from "react-dropdown";
import {getAllClass, searchPupil} from "../../../api/AdminAPI";
import SearchField from 'react-search-field';


const options = ['a', 'b']

class PupilTab extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      classList: [],
      pupilList: [],
      token: "token " + this.props.token,
      checkedPupil: []
    }
    this.oninputChange = this.oninputChange.bind(this);
    this.loadAllClass = this.loadAllClass.bind(this);
    this.assignStudent = this.assignStudent.bind(this);
    this.loadFillData = this.loadFillData.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.goClassTab = this.goClassTab.bind(this);
  }

  componentDidMount() {
    this.loadAllClass();
  }

  render() {
    var that = this;
    return (
        <div className='App'>
          <h2>Pupil Management</h2>
          <div className='row add-subject-area'>
            <Dropdown classname='style.dropDown'
                      options={this.state.classList}
                      onChange={this.onRoleSelect}
                      placeholder="Choose a class"
                      placeholderClassName='myPlaceholderClassName'/>
            {/*<input className="form-control-lg" type="text" name="subject"*/}
            {/*       placeholder="Search student"*/}
            {/*       onChange={this.oninputChange.bind(this, "fname")}*/}
            {/*/>*/}


            <SearchField placeholder='Search Pupil' onSearchClick={that.oninputChange}/>
            <br/>
            <button className="btn btn-success " onClick={that.assignStudent}>Assign</button>
            <button className="btn btn-success " onClick={that.goClassTab}>Go</button>
          </div>

          {that.state.pupilList.length ?
              <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
                <table className="table table-hover table-striped">
                  <thead className="thead-dark">
                  <tr key={"user_key1"}>
                    <th scope="col"></th>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.loadFillData()}
                  </tbody>
                </table>
              </div> : null}
        </div>
    )
  }
  goClassTab(){
    this.props.tabSelection(1);
  }

  oninputChange(e) {
    var that = this;
    searchPupil(e, that.state.token).then((response) => {
      that.setState({pupilList: response.data}, () => {
        that.loadFillData();
      })
    })
  }

  loadAllClass() {
    var tempList = [];
    var that = this;
    getAllClass(that.state.token).then((data) => {
      data.data.map((info) => {
        var obj = {value: info.cid, label: info.classname};
        tempList.push(obj);
      });
      this.setState({classList: tempList}, () => {
        console.log(that.state.classList)
      });
    });
  }

  assignStudent() {

  }

  loadFillData() {
    console.log("Loading data.... ");
    if (this.state.pupilList.length) {
      return this.state.pupilList.map(data => {
        return (
            <tr key={data.uid}>
              <td>{<input id={data.uid} name={data.uid} type="checkbox"
                          onChange={(e) => this.handleCheckBox(e, data.uid)}
              />}</td>
              <th>{data.username}</th>
              <th>{data.firstname}</th>
              <td>{data.lastname}</td>

            </tr>
        )
      })
    } else console.log("No data");
  }

  handleCheckBox(e, id) {
    var that = this;
    console.log(e.target)
    let resultArray = []
    if (e.target.checked) {
      resultArray = this.state.checkedPupil.filter(checkedID =>
          checkedID !== e.target.id
      )
      resultArray.push(e.target.id)
    } else {
      resultArray = this.state.checkedPupil.filter(checkedID =>
          checkedID !== e.target.id
      )
    }
    console.log(resultArray);
    this.setState({
      checkedPupil:resultArray
    })
  }
}


export default PupilTab;
