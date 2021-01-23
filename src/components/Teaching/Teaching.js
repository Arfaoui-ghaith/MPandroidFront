import React from 'react'
import {Link, BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';
import SideBar from './../SideBar/SideBar';
import Header from './../Header/Header';
import axios from 'axios';


export default function Teaching() {

    const [edit,setEdit] = React.useState(false);
    const [teachings, setTeachings] = React.useState([]);
    const [classes, setClasses] = React.useState([]);
    const [courses, setCourses] = React.useState([]);
    const [teachers, setTeachers] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const [teachingEdit, setTeachingEdit] = React.useState({});
    const [teachingUpdate] = React.useState({});

    const gateway = (edit,teaching) => {
        if(edit){
            console.log("we in the edit now");
            //updateClasse(classe,classeEdit);
        }else{
            addTeaching(teaching);
        }
    }


    const addTeaching = async (teaching) => {
        setMessage("");

        if(teaching.teacher === "" || teaching.teacher === undefined){
            return setMessage("Please provide a teacher.");
        }

        if(teaching.classe === "" || teaching.classe === undefined){
            return setMessage("Please provide a classe.");
        }

        if(teaching.course === "" || teaching.course === undefined){
            return setMessage("Please provide a course.");
        }

        console.log(teaching);
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/teachings/";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'post',
                data: teaching,
                url
            });

            console.log(result.data);
            setMessage("");
            window.location.replace("/teachings");
            
       }catch(err){
            setMessage("Something went wrong! Please check fields.");
            console.log(err.message);
       }
    }

    const getAllClasses = async () => {

        const url = "https://miniprojetandroid.herokuapp.com/api/v1/classes/";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'get',
                url
            });

            setClasses(result.data.classes);
            console.log(result.data.classes);
   
            
       }catch(err){

           console.log(err.message);
       }
    }

    const getAllCourses = async () => {

        const url = "https://miniprojetandroid.herokuapp.com/api/v1/courses/";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'get',
                url
            });

            setCourses(result.data.courses);
            console.log(result.data.courses);
   
            
       }catch(err){

           console.log(err.message);
       }
    }

    const getAllTeachers = async () => {

        const url = "https://miniprojetandroid.herokuapp.com/api/v1/users/teachers";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'get',
                url
            });

            setTeachers(result.data.users);
            console.log(result.data.users);
   
            
       }catch(err){

           console.log(err.message);
       }
    }

    const getAllTeachings = async () => {

        const url = "https://miniprojetandroid.herokuapp.com/api/v1/teachings/";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'get',
                url
            });

            setTeachings(result.data.teachings);
            console.log(result.data.teachings);
   
            
       }catch(err){

           console.log(err.message);
       }
    }

    const deleteTeaching = async (teaching) => {
        console.log(teaching);
        const url = `https://miniprojetandroid.herokuapp.com/api/v1/teachings/`+teaching._id;

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'delete',
                url
            });

            console.log(result.data);
            window.location.replace("/teachings");
            
       }catch(err){
            
           console.log(err.message);
       }

    }

    function deleletconfig(teaching) {
        // eslint-disable-next-line no-restricted-globals
        var del=confirm("Are you sure you want to delete this teaching "+teaching.teacher.name+" "+teaching.classe.name+" "+teaching.course.name+" ?");
        if (del){
            deleteTeaching(teaching);
            alert (teaching.teacher.name+" "+teaching.classe.name+" "+teaching.course.name+" deleted.");
        } else {
            alert(teaching.teacher.name+" "+teaching.classe.name+" "+teaching.course.name+" not deleted")
        }
    }
       
    const openEditDialog = (teaching) => {
        console.log(teaching);
        setTeachingEdit(teaching);
        setEdit(true);
        document.getElementById("mail-compose").click();
    }

    function closeDialog(){
        setTeachingEdit({});
        setMessage("");
        setEdit(false);
        document.getElementById("dialogF").click();
    }
   
       React.useEffect(() => {

        getAllClasses();
        getAllCourses();
        getAllTeachers();

        getAllTeachings();

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
                               <li className="breadcrumb-item active" aria-current="page">Teachings</li>
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
                                        <h5 class="card-title">All Teachings</h5>
                                       
                                        <div class="table-responsive">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                    
                                                        <th scope="col">Teaching ID</th>
                                                        <th scope="col">Teacher</th>
                                                        <th scope="col">Classe</th>
                                                        <th scope="col">Course</th>
                                                        
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { teachings.map((teaching,index) => (
                                                        <React.Fragment key={index}>
                                                    <tr>
                                                        
                                                        <td>{teaching._id}</td>
                                                        <td>{teaching.teacher.name}</td>
                                                        <td>{teaching.classe.name}</td>
                                                        <td>{teaching.course.name}</td>
                                                       
                                                        <td>
                                                            <Link className="dropdown-toggle" href="#" style={{borderBottomWidth: "0px", borderTopWidth: "0px"}} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            </Link>
                                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            
                                                            <span style={{cursor: "pointer"}} className="dropdown-item"  onClick={(e) => deleletconfig(teaching)}>Delete</span>
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
                               <h5>{ edit ? 'edit' : 'add' } Teaching</h5>
                               { edit ? <h6>You can update <strong>{teachingEdit.teacher.name} {teachingEdit.classe.name} {teachingEdit.course.name}</strong> here!</h6> : "" } 
                            <h6 Style={{color: "red"}}>{message}</h6>
                           </div>
                           <div className="mailbox-compose-body">
                               <form>
                                    <div className="form-group">
                                        <select class="custom-select form-control" onChange={(e) => teachingUpdate.teacher = e.target.value}>
                                            <option selected>Select Teacher</option>
                                            { teachers.map((teacher, index) => (
                                            <React.Fragment key={index}>
                                            <option value={teacher._id}>{teacher.name} {teacher.cin}</option>
                                            </React.Fragment>
                                            ))
                                            }
                                        </select>
                                    </div>

                                   <div className="form-group">
                                        <select class="custom-select form-control" onChange={(e) => teachingUpdate.classe = e.target.value}>
                                            <option selected>Select Classe</option>
                                            { classes.map((classe, index) => (
                                            <React.Fragment key={index}>
                                            <option value={classe._id}>{classe.name}</option>
                                            </React.Fragment>
                                            ))
                                            }
                                            
                                        </select>
                                   </div>

                                   <div className="form-group">
                                        <select class="custom-select form-control" onChange={(e) => teachingUpdate.course = e.target.value}>
                                            <option selected>Select Course</option>
                                            { courses.map((course, index) => (
                                            <React.Fragment key={index}>
                                            <option value={course._id}>{course.name}</option>
                                            </React.Fragment>
                                            ))
                                            }
                                            
                                        </select>
                                   </div>
                                   
                                   <div className="compose-buttons">
                                        <span onClick={(e) => gateway(edit,teachingUpdate)} className="btn btn-block btn-success">Save</span>
                                    <span className="btn btn-block btn-danger" onClick={closeDialog}>Cancel</span>
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
       );
}
