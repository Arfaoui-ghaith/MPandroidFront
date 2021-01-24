import React from 'react';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';
import SideBar from './../SideBar/SideBar';
import Header from './../Header/Header';
import axios from 'axios';

export default function Student() {
      //const [mode,setMode] = React.useState('create');
      const [edit,setEdit] = React.useState(false);
      const [students, setStudents] = React.useState([]);
      const [studentEdit, setStudentEdit] = React.useState({});
      const [studentUpdate, setStudentUpdate] = React.useState({});
      const [message, setMessage] = React.useState("");

      const gateway = (edit,student) => {
        if(edit){
            console.log("we in the edit now");
            updateStudent(studentEdit,student);
        }else{
            addStudent(student);
        }
    }

      const getAllStudents = async () => {

        const url = "https://miniprojetandroid.herokuapp.com/api/v1/students/classe/"+localStorage.getItem("classeName");

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'get',
                url
            });

            setStudents(result.data.students);
            console.log(students);
   
            
       }catch(err){

           console.log(err.message);
       }
    }

    const addStudent = async (student) => {
        setMessage("");

        if(student.first_name === "" || student.first_name === undefined){
            return setMessage("Please provide a first name.");
        }

        if(student.last_name === "" || student.last_name === undefined){
            return setMessage("Please provide a last name.");
        }

        if(student.cin === "" || student.cin === undefined){
            return setMessage("Please provide a cin.");
        }

        if(localStorage.getItem("classeID") === null || localStorage.getItem("classeID") === undefined){
            return setMessage("Please provide a classe ID.");
        }else{
            student.classe = localStorage.getItem("classeID");
        }
        

        console.log(student);
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/students/";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'post',
                data: student,
                url
            });

            console.log(result.data);
            setMessage("");
            
            
       }catch(err){
            setMessage("Something went wrong! Please check fields.");
            console.log(err.message);
       }
    }

    const deleteStudent = async (student) => {
        console.log(student);
        const url = `https://miniprojetandroid.herokuapp.com/api/v1/students/`+student._id;

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'delete',
                url
            });

            console.log(result.data);
            
            
       }catch(err){
            
           console.log(err.message);
       }

    }

    const updateStudent = async (student,studentUpdate) => {
        setMessage("");
        let body = {};
        var test = false;
        if(!(studentUpdate.first_name === "" || studentUpdate.first_name === undefined)) { body.first_name = studentUpdate.first_name; test = true;}
        if(!(studentUpdate.last_name === "" || studentUpdate.last_name === undefined)) { body.last_name = studentUpdate.last_name; test = true;} 
        if(!(studentUpdate.cin === "" || studentUpdate.cin === undefined)) { body.cin = studentUpdate.cin; test = true;} 
        

        console.log("body",body);
        console.log(student);

        if(test){
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/students/"+student._id;

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'patch',
                data: body,
                url
            });

            console.log(result.data);
            
   
            
       }catch(err){
            setMessage("Something went wrong! Please provide unique name.");
            console.log(err);
       }
    }else{
        setMessage("Please provide a name.");
    }
    }

    function deleletconfig(student) {
        // eslint-disable-next-line no-restricted-globals
        var del=confirm("Are you sure you want to delete this lecture of ID : "+student.first_name+" "+student.last_name+" ?");
        if (del){
            deleteStudent(student);
            alert (student.first_name+" "+student.last_name+" deleted.")
        } else {
            alert(student.first_name+" "+student.last_name+" not deleted")
        }
    }
      
    const openEditDialog = (student) => {
        console.log(student);
        setStudentEdit(student)
        setEdit(true);
        document.getElementById("mail-compose").click();
    }

    function closeDialog(){
        setStudentEdit({});
        setMessage("");
        setEdit(false);
        document.getElementById("dialogF").click();
    }
  
      React.useEffect(() => {

        getAllStudents();
            console.log("classe",localStorage.getItem("classeName"));
            console.log("classeID",localStorage.getItem("classeID"));
          $(document).ready(function() {
          
              $('#mail-compose').on('click', function(e) {
                  $('.mailbox-compose').toggleClass('show');
                  $('body').toggleClass('mailbox-compose-show');
          
                  e.preventDefault();
              });
          
              $('.mailbox-compose-overlay').on('click', function() {
                  if(!edit){setEdit(false);}
                  $('.mailbox-compose').toggleClass('show');
                  $('body').toggleClass('mailbox-compose-show');
              });
          
          });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);
  
      return (
          <React.Fragment>
          <Router>
            <div className="connect-container align-content-stretch d-flex flex-wrap">
            <SideBar/>
            <div className="page-container">  
            <Header/>
              <div className="page-content">
                  <div className="page-info">
                      <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                              <li className="breadcrumb-item"><Link to="#">Management</Link></li>
                              <li className="breadcrumb-item active" aria-current="page">Students</li>
                          </ol>
                      </nav>
                      <div className="page-options">
                          <Link to="#" className="btn btn-primary" id="mail-compose">Add</Link>
                      </div>
                  </div>
                  <div className="main-wrapper">
                  <div class="row">
                              <div class="col-xl">
                                  <div class="card">
                                      <div class="card-body">
                                          <h5 class="card-title">All Students</h5>
                                         
                                          <div class="table-responsive">
                                              <table class="table">
                                                  <thead>
                                                      <tr>
                                                          <th scope="col">#</th>
                                                          <th scope="col">Full Name</th>
                                                          <th scope="col">CIN</th>
                                                          
                                                          
                                                          <th scope="col">Actions</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                    { students.map((student, index) => (
                                                    <React.Fragment key={index}>
                                                      <tr>
                                                          <th scope="row">{index+1}</th>
                                                          <td>{student.first_name} {student.last_name}</td>
                                                          <td>{student.cin}</td>
                                                          
                                                          
                                                          <td>
                                                              <Link className="dropdown-toggle" href="#" style={{borderBottomWidth: "0px", borderTopWidth: "0px"}} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                              </Link>
                                                              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                                <span style={{cursor: "pointer"}} className="dropdown-item"  onClick={(e) => openEditDialog(student)}>Edit</span>
                                                                <span style={{cursor: "pointer"}} className="dropdown-item"  onClick={(e) => deleletconfig(student)}>Delete</span>
                                                              </div>
                                                          </td>
                                                      </tr>
                                                    </React.Fragment>
                                                      ))
                                                    }
                                                  </tbody>
                                              </table>
                                          </div>      
                                      </div>
                                  </div>
                              </div>
                          </div>
                  </div>
                  <div className="mailbox-compose" style={{"bottom": "0px", "height": "290px", "top": "0px"}}>
                      <div className="mailbox-compose-content">
                          <div className="mailbox-compose-header">
                              <h5>{ edit ? 'edit' : 'add' } User</h5>
                              { edit ? <h6>You can update <strong>{studentEdit.first_name} {studentEdit.last_name}</strong> here!</h6> : "" } 
                            <h6 Style={{color: "red"}}>{message}</h6>
                          </div>
                          <div className="mailbox-compose-body">
                              <form>
                                  <div className="form-group">
                                      <input type="text" className="form-control"  placeholder="First Name" onChange={(e) => studentUpdate.first_name = e.target.value}/>
                                  </div>
                                  <div className="form-group">
                                      <input type="text" className="form-control"  placeholder="Last Name" onChange={(e) => studentUpdate.last_name = e.target.value}/>
                                  </div>
                                  <div className="form-group">
                                      <input type="text" className="form-control"  placeholder="CIN" onChange={(e) => studentUpdate.cin = e.target.value}/>
                                  </div>
                                  
                                  
                                  <div className="compose-buttons">
                                        <span onClick={(e) => gateway(edit,studentUpdate)} className="btn btn-block btn-success">Save</span>
                                        <span to="" className="btn btn-block btn-danger" onClick={closeDialog}>Cancel</span>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="page-footer">
                  <div className="row">
                      <div className="col-md-12">
                          <span className="footer-text">{new Date().getFullYear()} © Iset App</span>
                      </div>
                  </div>
              </div>
              <div id="dialogF" className="mailbox-compose-overlay"></div>
            </div>
            </div>
          </Router>
          </React.Fragment>
      )
}
