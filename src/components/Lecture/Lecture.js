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

        function deleletconfig() {
           // eslint-disable-next-line no-restricted-globals
           var del=confirm("Are you sure you want to delete this record?");
           if (del){
               alert ("record deleted")
           } else {
               alert("Record Not Deleted")
           }
        }
       
       function openEditDialog(){
           setEdit(true);
           document.getElementById("mail-compose").click();
       }
   
       function closeDialog(){
           setEdit(false);
           document.getElementById("dialogF").click();
       }
   
       React.useEffect(() => {

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
                                                            <Link className="dropdown-item" to="" onClick={openEditDialog}>Edit</Link>
                                                            <Link className="dropdown-item" to="" onClick={deleletconfig}>Delete</Link>
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
                           </div>
                           <div className="mailbox-compose-body">
                               <form>

                                    <div className="form-group">
                                        <select className="custom-select form-control">
                                            <option selected>Select teaching</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>

                                   <div className="form-group">
                                       <input type="time" className="form-control" value="" placeholder="Duration"/>
                                   </div>

                                   <div className="form-group">
                                       <input type="datetime-local" className="form-control" />
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
                                       <input type="text" className="form-control" value="" placeholder="Room"/>
                                   </div> : ''
                                    }
                                   
                                   <div className="compose-buttons">
                                       <button className="btn btn-block btn-success">Save</button>
                                       <Link to="" className="btn btn-block btn-danger" onClick={closeDialog}>Cancel</Link>
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
