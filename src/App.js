import React from 'react';
import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import Classe from './components/Classe/Classe';
import Users from './components/Users/Users';
import Course from './components/Course/Course';
import Teaching from './components/Teaching/Teaching';
import Lecture from './components/Lecture/Lecture';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
function App() {

  if(true){
  return (
    <Router>
      <div>
      <div className="connect-container align-content-stretch d-flex flex-wrap">
        <SideBar/>
        <div className="page-container">
          <Header/>
          <Route exact path="/classes" component={Classe} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/courses" component={Course} />
          <Route exact path="/teachings" component={Teaching} />
          <Route exact path="/lectures" component={Lecture} />
        </div>
      </div>
      </div>
    </Router>
  );}
  else{
  return (
    <React.Fragment>
      <Login/>
    </React.Fragment>
  );}
}

export default App;
