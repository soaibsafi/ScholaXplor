

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


 import login from './view/login';



import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {

  return (
      <Router>
        <div className="App">
          <div class="container py-4">
            <div class="row">

              <Route path="/" exact component={login} />
              {/*<Route path="/studetnForm" component={studetnForm} />*/}
              {/*<Route path="/edit/:employeeId" component={Edit} />*/}

            </div>
          </div>

        </div>
      </Router>
  );
}

export default App;



