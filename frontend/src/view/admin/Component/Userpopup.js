import React from 'react';
import '../../../App.css';

class userpopup extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: ""
    }
    // this.oninputChange = this.oninputChange.bind(this);
    // this.changeDOB = this.changeDOB.bind(this);
    // this.sendData = this.sendData.bind(this);

  }

  render(){
    var that = this;
    return(
        <div className='popup'>
          <div className='App popup_inner'>
            <h2>{that.props.popupHeaderText + " " + that.props.selectedRole}</h2>
            <div style={{alignItem:'center'}}>
              <label> First Name:</label>
                <input className="form-control"  type="text" name="fname" defaultValue={this.state.fname}
                       // onChange={this.oninputChange.bind(this, "fname")}
                />
              <br/>
              <label>Last Name:</label>
                <input className="form-control"   type="text" name="lname" defaultValue={this.state.lname}
                       // onChange={this.oninputChange.bind(this, "lname")}
                />
              <br/>
            </div>
            <button className='btn btn-primary'  onClick={this.sendData}>{this.props.popupBtnText}</button>
            <button className='btn btn-danger' onClick={this.props.closePopup}>{"Close"}</button>
          </div>
        </div>
    )
  }
}

export default userpopup;
