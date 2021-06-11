import React from 'react'
import {checkUserType} from "../../api/APIUtils";

export default class pupilPanel extends React.Component{

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var that = this;
    debugger;
    var token = this.props.location.state ? this.props.location.state.token : '';
    checkUserType('token '+ token ).then(res => {
      if(res.status === "FAILED") that.props.history.push("/");
    });
  }

  render(){
    return(
        <label>I am in pupil panel</label>
    )
  }
}
