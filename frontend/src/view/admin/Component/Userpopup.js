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
          <div className='App popup_inner custom_pop'>
            <h2>{that.props.popupHeaderText + " " + that.props.selectedRole}</h2>
            <div style={{alignItem:'center', textAlign:'left'}}>
              <p> First Name:</p>
                <input className="form-control-lg"  type="text" name="fname" id="firstname" defaultValue={this.state.fname}
                       // onChange={this.oninputChange.bind(this, "fname")}
                />
              <br/>
              <br/>
              <p>Last Name:</p>
                <input className="form-control-lg"   type="text" name="lname" id="lastname" defaultValue={this.state.lname}
                       // onChange={this.oninputChange.bind(this, "lname")}
                />
              <br/>
            </div>
            <div style={{width:'170px', margin: '0px auto'}}> 
              <button className='btn btn-primary btn-lg float-left'  onClick={this.sendData}>{this.props.popupBtnText}</button>
              <button className='btn btn-danger btn-lg float-right' onClick={this.props.closePopup}>{"Close"}</button>
            </div>
          </div>
        </div>
    )
  }
}

export default userpopup;
