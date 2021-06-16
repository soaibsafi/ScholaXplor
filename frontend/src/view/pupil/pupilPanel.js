import React from 'react'
import {checkUserType} from "../../api/APIUtils";
import PupilTestDetails from "./PupilTestDetails";

const redirectpath = '/login';

export default class pupilPanel extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      token: this.props.location.state ? 'token ' + this.props.location.state.token : '',
      subjectList:[
        {
          sid:1,
          subjectname:'Bangla',
          avgGrade:1.2
        },
        {
          sid:2,
          subjectname:'English',
          avgGrade:2.2
        },
        {
          sid:3,
          subjectname:'Math',
          avgGrade:1.2
        }
      ],
      subjectTestDetailsList:[
        {
          tid:1,
          tname:'test1',
          score:1.2
        },
        {
          tid:2,
          tname:'test2',
          score:2.2
        },
        {
          tid:3,
          tname:'test3',
          score:1.2
        }
      ],
      showPopup:false,
      popupHeaderText:''
    }

    this.logoutAction = this.logoutAction.bind(this);
    this.loadFillData = this.loadFillData.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentDidMount() {
    var that = this;
    var token = this.props.location.state ? this.props.location.state.token : '';
    if (token) {
      window.onpopstate = function (event) {
        that.props.history.go(1);
      };
    }
    checkUserType('token '+ token ).then(res => {
      if(res.status === "FAILED") that.props.history.push("/");
    });
  }

  render(){
    var that = this;
    return(
        <div style={{width: '1024px'}}>

          <div className='row'>
            <h1>Pupil Panel</h1>
            <button type="button" className="btn btn-danger" onClick={this.logoutAction}>Logout</button>
          </div>

          <div className="ag-theme-alpine" style={{height: 400, width: 800}}>
            <table className="table table-hover table-striped">
              <thead className="thead-dark">
              <tr key={"user_key1"}>
                <th scope="col">Subject</th>
                <th scope="col">Avg. Grade</th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              {this.loadFillData()}
              </tbody>
            </table>
          </div>
          {that.state.showPopup ?
              <PupilTestDetails subjectTestDetailsList={that.state.subjectTestDetailsList}
                                popupHeaderText={that.state.popupHeaderText}
                                closePopup={that.closePopup}/> : null}
                         {/*// selectedRole={that.state.selectedRole}*/}
                         {/*// */}
                         {/*// popupBtnText={that.state.popupBtnText}*/}
                         {/*// updateInfo={that.updateInfo}*/}
                         {/*// addUser={that.addUser}*/}
                         {/*// */}


        </div>
    )
  }

  logoutAction() {
    var that = this;
    that.setState({token: ''},
        () => {
          that.props.history.push({pathname:redirectpath});
        })
  }

  loadFillData(){
    if (this.state.subjectList.length) {

      return this.state.subjectList.map(data => {
        return (
            <tr key={data.sid}>
              <th>{data.subjectname}</th>
              <th>{data.avgGrade}</th>
              <td>{<button className="btn btn-info" onClick={() => this.openDetailsPopup(data)}>View Details</button>}</td>
            </tr>
        )
      })
    }
  }

  openDetailsPopup(data){
    this.setState({
      popupHeaderText:"Test Details for " + data.subjectname
    }, ()=>{
      this.togglePopup();
    })

  }

  closePopup(){
    this.setState({
          popupHeaderText: "",
          // subjectTestDetailsList:[]
        },
        () => {
          this.togglePopup();
        })
  }

  togglePopup() {
    this.setState({showPopup: !this.state.showPopup});
  }
}
