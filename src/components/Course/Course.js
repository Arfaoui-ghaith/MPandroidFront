import React from 'react'
import {Link, BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';
import SideBar from './../SideBar/SideBar';
import Header from './../Header/Header';
import axios from 'axios';

export default function Course() {

    const [courses,setCourses] = React.useState([]);
    const [courseEdit, setCourseEdit] = React.useState({});
    const [courseUpdate, setCourseUpdate] = React.useState({});
    const [edit,setEdit] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const gateway = (edit,courseUpdate) => {
        if(edit){
            console.log("we in the edit now");
            updateCourse(courseEdit,courseUpdate);
        }else{
            addCourse(courseUpdate);
        }
    }

    const addCourse = async (courseEdit) => {
        if(courseEdit.name === "" || courseEdit.name === undefined){
            return setMessage("Please provide a unique name.");
        }
        if(courseEdit.volume * 1 < 1 || courseEdit.volume === undefined){
            return setMessage("Please provide a volume.");
        }
        if(courseEdit.coef * 1 < 1 || courseEdit.coef === undefined){
            return setMessage("Please provide a coef.");
        }
        if(courseEdit.state === "" || courseEdit.state === undefined){
            return setMessage("Please provide a state.");
        }
        console.log(courseEdit);
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/courses/";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'post',
                data: courseEdit,
                url
            });

            console.log(result.data);
            setMessage("");
            window.location.replace("/courses");
            
       }catch(err){
            setMessage("Something went wrong! Please check for invalid fields.");
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
            console.log(courses);
   
            
       }catch(err){

           console.log(err.message);
       }
    }

    const updateCourse = async (course,courseEdit) => {
        setMessage("");
        let body = {};
        let test = false;
        if(!(courseEdit.name === "" || courseEdit.name === undefined)) { body.name = courseEdit.name; test = true;}  
        if(!(courseEdit.volume * 1 < 1 || courseEdit.volume === undefined)) { body.volume = courseEdit.volume * 1; test = true;}  
        if(!(courseEdit.coef * 1 < 1 || courseEdit.coef === undefined)) { body.coef = courseEdit.coef * 1; test = true;}  
        if(!(courseEdit.state === "" || courseEdit.state === undefined)) { body.state = courseEdit.state; test = true;}  

        console.log("body",body);
        console.log(course);

        if(test){
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/courses/"+course._id;

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'patch',
                data: body,
                url
            });

            console.log(result.data);
            window.location.replace("/courses");
            
       }catch(err){
            setMessage("Something went wrong! Please check for invalid fields.");
            console.log(err);
       }
    }else{
        setMessage("All Fields Empty.");
    }
    }

    const deleteCourse = async (course) => {
        console.log(course);
        const url = `https://miniprojetandroid.herokuapp.com/api/v1/courses/`+course._id;

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'delete',
                url
            });

            console.log(result.data);
            window.location.replace("/courses");
            
       }catch(err){
            
           console.log(err.message);
       }

    }

    function deleletconfig(course) {
        // eslint-disable-next-line no-restricted-globals
        var del=confirm("Are you sure you want to delete this course "+course.name+" ?");
        if (del){
            deleteCourse(course);
            alert (course.name+" deleted.")
        } else {
            alert(course.name+" not deleted")
        }
    }
    
    const openEditDialog = (course) => {
        console.log(course);
        setCourseEdit(course);
        setEdit(true);
        document.getElementById("mail-compose").click();
    }

    function closeDialog(){
        setCourseUpdate({});
        setMessage("");
        setEdit(false);
        document.getElementById("dialogF").click();
    }

    React.useEffect(() => {

        getAllCourses();

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
                            <li className="breadcrumb-item active" aria-current="page">Courses</li>
                        </ol>
                    </nav>
                    <div className="page-options">
                        <Link to="#" className="btn btn-primary" id="mail-compose">Add</Link>
                    </div>
                </div>
                <div className="main-wrapper">
                        <div className="row">
                            <div className="col-xl">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">All Courses</h5>
                                       
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Volume</th>
                                                        <th scope="col">Coeff</th>
                                                        <th scope="col">State</th>
                                                        
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { courses.map((course,index) => (
                                                    <React.Fragment key={index}>
                                                    <tr>
                                                        <td>{course._id}</td>
                                                        <td>{course.name}</td>
                                                        <td>{course.volume} hrs</td>
                                                        <td>{course.coef}</td>
                                                        <td>{course.state}</td>
                                                        
                                                        <td>
                                                            <Link className="dropdown-toggle" to="#" style={{borderBottomWidth: "0px", borderTopWidth: "0px"}} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            </Link>
                                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <span style={{cursor: "pointer"}} className="dropdown-item"  onClick={(e) => openEditDialog(course)}>Edit</span>
                                                            <span style={{cursor: "pointer"}} className="dropdown-item"  onClick={(e) => deleletconfig(course)}>Delete</span>
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
                            <h5>{ edit ? 'edit' : 'add' } Course</h5>
                            { edit ? <h6>You can update <strong>{courseEdit.name}</strong> here!</h6> : "" } 
                            <h6 Style={{color: "red"}}>{message}</h6>
                        </div>
                        <div className="mailbox-compose-body">
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" onChange={(e)=> courseUpdate.name = e.target.value}  placeholder="Course Name"/>
                                </div>
                                <div className="form-group">
                                    <input type="number" step="0.01" className="form-control" onChange={(e)=> courseUpdate.volume = e.target.value}  placeholder="Course Volume"/>
                                </div>
                                <div className="form-group">
                                    <input type="number" step="0.01" className="form-control" onChange={(e)=> courseUpdate.coef = e.target.value}  placeholder="Course coef"/>
                                </div>
                                <div className="form-group">
                                    <select className="custom-select form-control" onChange={(e) => courseUpdate.state = e.target.value}>
                                        <option selected>Select State</option>
                                        <option value="tp">TP</option>
                                        <option value="session">Session</option>
                                    </select>
                                </div>
                               
                                
                                <div className="compose-buttons">
                                    <span onClick={(e) => gateway(edit,courseUpdate)} className="btn btn-block btn-success">Save</span>
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
    )
}
