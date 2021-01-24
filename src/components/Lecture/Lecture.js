import React from 'react'
import {Link, BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';
import SideBar from './../SideBar/SideBar';
import Header from './../Header/Header';
import axios from 'axios';

export default function Lecture() {

    const [state,setState] = React.useState('');
    const [lectures, setLectures] = React.useState([]);
    const [edit,setEdit] = React.useState(false);
    const [lectureEdit, setLectureEdit] = React.useState({});
    const [message, setMessage] = React.useState("");
    const [lectureUpdate, setLectureUpdate] = React.useState({});
    const [teachings, setTeachings] = React.useState([]);

    const gateway = (edit,lecture) => {
        if(edit){
            console.log("we in the edit now");
            updateLecture(lectureEdit,lecture);
        }else{
            addLecture(lecture);
        }
    }

    const getAllLectures = async () => {

        const url = "https://miniprojetandroid.herokuapp.com/api/v1/lectures/";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'get',
                url
            });

            setLectures(result.data.lectures);
            console.log(lectures);
   
            
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

    const addLecture = async (lecture) => {
        setMessage("");

        if(lecture.teaching === "" || lecture.teaching === undefined){
            return setMessage("Please provide a teaching.");
        }

        if(lecture.duration === "" || lecture.duration === undefined){
            return setMessage("Please provide a duration.");
        }

        if(lecture.date === "" || lecture.date === undefined){
            return setMessage("Please provide a date.");
        }

        if(state === "" || state === undefined){
            return setMessage("Please provide a state.");
        }else{
            lecture.state = state;
        }
        
        if(lecture.state === "offline"){
            if(lecture.room === "" || lecture.romm === undefined){
                return setMessage("Please provide a room.");
            }
        }

        console.log(lecture);
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/lectures/";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'post',
                data: lecture,
                url
            });

            console.log(result.data);
            setMessage("");
            window.location.replace("/lectures");
            
       }catch(err){
            setMessage("Something went wrong! Please check fields.");
            console.log(err.message);
       }
    }

    const updateLecture = async (lecture,lectureUpdate) => {
        setMessage("");
        let body = {};
        var test = false;
        if(!(lectureUpdate.teaching === "" || lectureUpdate.teaching === undefined)) { body.teaching = lectureUpdate.teaching; test = true;}
        if(!(lectureUpdate.duration === "" || lectureUpdate.duration === undefined)) { body.duration = lectureUpdate.duration; test = true;} 
        if(!(lectureUpdate.date === "" || lectureUpdate.date === undefined)) { body.date = lectureUpdate.date; test = true;} 
        if(!(lectureUpdate.room === "" || lectureUpdate.room === undefined)) { body.room = lectureUpdate.room; test = true;}  
        if(!(state === "" || state === undefined)) { body.state = state; test = true;} 

        console.log("body",body);
        console.log(lecture);

        if(test){
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/lectures/"+lecture._id;

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'patch',
                data: body,
                url
            });

            console.log(result.data);
            window.location.replace("/lectures");
   
            
       }catch(err){
            setMessage("Something went wrong! Please provide unique name.");
            console.log(err);
       }
    }else{
        setMessage("Please provide a name.");
    }
    }

    const deleteLecture = async (lecture) => {
        console.log(lecture);
        const url = `https://miniprojetandroid.herokuapp.com/api/v1/lectures/`+lecture._id;

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'delete',
                url
            });

            console.log(result.data);
            window.location.replace("/lectures");
            
       }catch(err){
            
           console.log(err.message);
       }

    }

        function deleletconfig(lecture) {
        // eslint-disable-next-line no-restricted-globals
        var del=confirm("Are you sure you want to delete this lecture of ID : "+lecture._id+" ?");
        if (del){
            deleteLecture(lecture);
            alert (lecture._id+" deleted.")
        } else {
            alert(lecture._id+" not deleted")
        }
    }
       
        const openEditDialog = (lecture) => {
            console.log(lecture);
            setLectureEdit(lecture);
            setEdit(true);
            document.getElementById("mail-compose").click();
        }
    
        function closeDialog(){
            setLectureEdit({});
            setMessage("");
            setEdit(false);
            document.getElementById("dialogF").click();
        }
   
       React.useEffect(() => {

        getAllTeachings();
        getAllLectures();

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
                               <li className="breadcrumb-item active" aria-current="page">Lectures</li>
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
                                        <h5 className="card-title">All Lectures</h5>
                                       
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Teaching</th>
                                                        <th scope="col">Duration</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">State</th>
                                                        <th scope="col">Room</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { lectures.map((lecture,index) => (
                                                    <React.Fragment key={index}>
                                                    <tr>
                                                        <td>{lecture._id}</td>
                                                        <td>{lecture.teaching._id}</td>
                                                        <td>{lecture.duration} mn</td>
                                                        <td>{lecture.date}</td>
                                                        <td>{lecture.state}</td>
                                                        <td>{lecture.room}</td>
                                                        <td>
                                                            <Link className="dropdown-toggle" href="#" style={{borderBottomWidth: "0px", borderTopWidth: "0px"}} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            </Link>
                                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <span style={{cursor: "pointer"}} className="dropdown-item"  onClick={(e) => openEditDialog(lecture)}>Edit</span>
                                                            <span style={{cursor: "pointer"}} className="dropdown-item"  onClick={(e) => deleletconfig(lecture)}>Delete</span>
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
                               <h5>{ edit ? 'edit' : 'add' } Lecture</h5>
                               { edit ? <h6>You can update lecture of ID <strong>{lectureEdit._id}</strong> here!</h6> : "" } 
                            <h6 Style={{color: "red"}}>{message}</h6>
                           </div>
                           <div className="mailbox-compose-body">
                               <form>

                                    { edit ? '' :
                                    <div className="form-group">
                                        <select className="custom-select form-control" onChange={(e) => {lectureUpdate.teaching = e.target.value}}>
                                            <option selected>Select teaching</option>
                                            { teachings.map((teaching,index) => (
                                            <React.Fragment key={index}>
                                            <option value={teaching._id}>{teaching.teacher.name} - {teaching.course.name} - {teaching.classe.name}</option>
                                            </React.Fragment>
                                            ))
                                            }
                                        </select>
                                    </div>
                                    }

                                   <div className="form-group">
                                       <input type="number" className="form-control" placeholder="Duration en minutes" onChange={(e) => {lectureUpdate.duration = e.target.value}}/>
                                   </div>

                                   <div className="form-group">
                                       <input type="datetime-local" className="form-control" onChange={(e) => {lectureUpdate.date = e.target.value}}/>
                                   </div>

                                   <div className="form-group">
                                        <select className="custom-select form-control" onChange={(e) => {setState(e.target.value)}}>
                                            <option selected>Select State</option>
                                            <option value="online">Online</option>
                                            <option value="offline">Offline</option>
                                        </select>
                                    </div>

                                    { state === 'offline' ?
                                    <div className="form-group">
                                       <input type="text" className="form-control" placeholder="Room" onChange={(e) => {lectureUpdate.room = e.target.value}}/>
                                   </div> : ''
                                    }
                                   
                                   <div className="compose-buttons">
                                        <span onClick={(e) => gateway(edit,lectureUpdate)} className="btn btn-block btn-success">Save</span>
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
       );
}
