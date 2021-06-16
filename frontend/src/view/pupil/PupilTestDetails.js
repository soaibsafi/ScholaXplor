import React from 'react';
import '../../App.css';

class PupilTestDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      subjectTestDetailsList: this.props.subjectTestDetailsList,
      popupHeaderText: this.props.popupHeaderText
    }
    this.loadFillData = this.loadFillData.bind(this);
    this.close = this.close.bind(this);
  }

  render() {
    return(
        <div className='popup'>
          <div className='App popup_inner'>
            <h2>{this.state.popupHeaderText}</h2>
            <div className="ag-theme-alpine" >
              <table className="table table-hover table-striped">
                <thead className="thead-dark">
                <tr key={"user_key1"}>
                  <th scope="col">Test Name</th>
                  <th scope="col">Score/Grade</th>
                </tr>
                </thead>
                <tbody>
                {this.loadFillData()}
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger' onClick={this.close}>{"Close"}</button>

          </div>
        </div>
    )
  }

  close(){
    this.props.closePopup();
  }


  loadFillData(){
    if (this.state.subjectTestDetailsList.length) {

      return this.state.subjectTestDetailsList.map(data => {
        return (
            <tr key={data.tid}>
              <th>{data.tname}</th>
              <th>{data.score}</th>
              {/*<td>{<button className="btn btn-info" onClick={() => this.openDetailsPopup(data)}>View Details</button>}</td>*/}
            </tr>
        )
      })
    }
  }
}

export default PupilTestDetails;
