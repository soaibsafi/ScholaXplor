import React from "react";
import "../../App.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class ManageTestPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sid: this.props.sid,
      testList: this.props.testList,
      selectedTest: this.props.selectedTest,
      selectedTestName: "",
      selectedTestDate: "",
      selectedTestId: "",
      testDetailsList: this.props.testDetailsList,
    };
    this.oninputChange = this.oninputChange.bind(this);
    this.onTestSelect = this.onTestSelect.bind(this);
    // this.setUserID = this.setUserID.bind(this);
    this.sendData = this.sendData.bind(this);
    this.resetState = this.resetState.bind(this);
    this.close = this.close.bind(this);
    this.getIndex = this.getIndex.bind(this);
  }

  componentDidMount() {
    if(this.props.popupBtnText === "Update"){
      var x =
          this.state.testList[
              this.getIndex(this.state.testList, this.state.selectedTest)
              ];

      var dt = this.state.testDetailsList.findIndex((obj) => obj.tid === x.value);
      this.setState(
          {
            selectedTestName: x.label,
            selectedTestDate: this.state.testDetailsList[dt].testdate,
            selectedTestId: this.state.testDetailsList[dt].tid,
          },
          () => {
            console.log(this.state.selectedTestDate);
          }
      );
    }
  }

  render() {
    var that = this;
    return (
      <div className="popup">
        <div className="App popup_inner">
          <h2>{that.props.popupHeaderText}</h2>
          <div style={{ alignItem: "left" }}>
            {console.log(that.props.popupHeaderText)}
            <label>Test Name</label>
            <br />
            <input
              className="form-control"
              type="text"
              name="testname"
              defaultValue={that.props.popupBtnText=== "Add"? "" : that.state.selectedTestName}
              onChange={that.oninputChange.bind(this, "testname")}
            />
            <label>Test Date</label>
            <br />
            <input
              className="form-control"
              type="date"
              name="testdate"
              defaultValue={that.props.popupBtnText=== "Add"? "" : that.state.selectedTestDate.slice(0, 10)}
              onChange={that.oninputChange.bind(this, "testdate")}
            />
          </div>
          <button className="btn btn-primary" onClick={that.sendData}>
            {this.props.popupBtnText}
          </button>
          <button className="btn btn-danger" onClick={this.close}>
            {"Close"}
          </button>
        </div>
      </div>
    );
  }

  getIndex(arr, testVal) {
    return arr.findIndex((obj) => obj.value === testVal);
  }

  close() {
    this.props.closePopup();
  }

  oninputChange(key, e) {
    switch (key) {
      case "testname":
        this.setState({ selectedTestName: e.target.value });
        break;
      case "testdate":
        this.setState({ selectedTestDate: e.target.value }, () => {
          console.log(this.state.testdate);
        });
        break;
      default:
        break;
    }
  }

  onTestSelect(e) {
    this.setState({ selectedTest: e.value });
  }

  setUserID() {
    return "TST" + Date.now();
  }

  sendData() {
    var data =
      this.props.popupBtnText === "Add"
        ? {
            tid: this.setUserID(),
            testname: this.state.selectedTestName,
            testdate: this.state.selectedTestDate,
            sid: this.state.sid,
          }
        : {
            tid: this.state.selectedTestId,
            testname: this.state.selectedTestName,
            testdate: this.state.selectedTestDate,
            sid: this.state.sid,
          };
    // debugger;
    this.resetState();
    if (this.props.popupBtnText === "Add") {
      if (data.testname.length && data.testdate.length)
        this.props.addTest(data);
      else alert("Please Provide all information");
    } else {
      if (data.testname.length && data.testdate.length)
        this.props.updateTest(data);
      else alert("Please Provide all information");
    }
  }

  resetState() {
    this.setState({
      tid: "",
      testname: "",
      testdate: "",
    });
  }
}

export default ManageTestPopup;
