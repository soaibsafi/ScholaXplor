

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


 import login from './view/login';
 import adminPanel from './view/admin/adminPanel'

import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends React.Component {
render(){
  return (
      <Router>
        <div className="App">
          <div className="container py-4">
            <div className="row">
              <Route path="/" exact component={login} />
              <Route path="/adminpanel" exact component={adminPanel}/>
            </div>
          </div>
        </div>
      </Router>
  );
}
}


