import React from 'react';
import Classe from './components/Classe/Classe';
import Student from './components/Student/Student';
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


  return (
    <Router>
          <Route exact path="/login" component={Login} />
          <Route exact path="/classes" component={Classe} />
          <Route exact path="/students" component={Student} />
          <Route exact path="/" component={Users} />
          <Route exact path="/courses" component={Course} />
          <Route exact path="/teachings" component={Teaching} />
          <Route exact path="/lectures" component={Lecture} />
          
      
    </Router>
  );
}

export default App;
