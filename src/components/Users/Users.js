import React from 'react'
import {Link, BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';
import SideBar from './../SideBar/SideBar';
import Header from './../Header/Header';
import axios from 'axios';


export default function Users() {
    //const [mode,setMode] = React.useState('create');
    const [edit,setEdit] = React.useState(false);
    const [users, setUsers] = React.useState([]);
    const [userEdit, setUserEdit] = React.useState({});
    const [message, setMessage] = React.useState("");
    const [userUpdate, setUserUpdate] = React.useState({});
    
    const userInitialize = {};

    const gateway = (edit,user) => {
        if(edit){
            updateUser(user,userUpdate);
        }else{
            addUser(user);
        }
    }

    const getAllUsers = async () => {

        const url = "https://miniprojetandroid.herokuapp.com/api/v1/users/";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'get',
                url
            });

            setUsers(result.data.users);
            console.log(result.data);
   
            
       }catch(err){

           console.log(err.message);
       }
    };

    const addUser = async (userEdit) => {
        if(userEdit.password !== userEdit.passwordConfirm){
            return setMessage("Passwords are not the same.");
        }
        console.log(userEdit);
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/users/";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'post',
                data: userEdit,
                url
            });

            console.log(result.data);
   
            
       }catch(err){
            
           console.log(err.message);
       }
    }

    const deleteUser = async (user) => {
        console.log(user);
        const url = `https://miniprojetandroid.herokuapp.com/api/v1/users/`+user._id;

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

    const updateUser = async (userEdit,userUpdate) => {
        setMessage("");
        let body = {};
        var test = false;
        if(!(userUpdate.name === "" || userUpdate.name === undefined)) { body.name = userUpdate.name; test = true;} 
        if(!(userUpdate.email === "" || userUpdate.email === undefined)) { body.email = userUpdate.email; test = true;} 
        if(!(userUpdate.cin === "" || userUpdate.cin === undefined)) { body.cin = userUpdate.cin; test = true;} 
        if(!(userUpdate.password === "" || userUpdate.password === undefined)) {  
        if(!(userUpdate.passwordConfirm === "" || userUpdate.passwordConfirm === undefined)) { 
            if(userUpdate.password !== userUpdate.passwordConfirm){
                setMessage("Please confirm your password.");
                return;
            }
            body.password = userUpdate.password;
            
         } test = true;}
        if(userUpdate.role === "teacher" || userUpdate.role === "admin") { body.role = userUpdate.role; test = true;}  

        console.log("body",body);
        console.log(userEdit);

        if(test){
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/users/"+userEdit._id;

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'patch',
                data: body,
                url
            });

            console.log(result.data);
   
            
       }catch(err){
            setMessage("Something went wrong! cin already used or invalid fields to update.");
           console.log(err);
       }
    }else{
        setMessage("All Fields Empty !!");
    }
    }

    
    function deleletconfig(user) {
        // eslint-disable-next-line no-restricted-globals
        var del=confirm("Are you sure you want to delete this user with name : "+user.name+"?");
        
        if (del){
            deleteUser(user);
            alert (user.name+" deleted");
        } else {
            alert(user.name+" not deleted");
        }
    }
    
    const openEditDialog = (user) => {
        setUserEdit(user);
        setEdit(true);
        document.getElementById("mail-compose").click();
    }

    function closeDialog(){
        setMessage("");
        setUserUpdate({});
        setUserEdit(userInitialize);
        setEdit(false);
        document.getElementById("dialogF").click();
    }

    React.useEffect(() => {
        console.log(localStorage.getItem("tokenIsetApp"));
        
        getAllUsers();

        

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
                            <li className="breadcrumb-item active" aria-current="page">Users</li>
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
                                        <h5 className="card-title">All Users</h5>
                                       
                                        <div className="table-responsive">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">ID</th>
                                                        <th scope="col">Full Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">CIN</th>
                                                        <th scope="col">Role</th>
                                                        
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { users.map((user,index) => (
                                                    <React.Fragment key={index}>
                                                    <tr>
                                                        
                                                        <td>{user._id}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.cin}</td>
                                                        <td>{user.role}</td>
                                                        
                                                
                                                        <td>
                                                            <Link className="dropdown-toggle" to="#" style={{borderBottomWidth: "0px", borderTopWidth: "0px"}} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            </Link>
                                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <span style={{cursor: "pointer"}} className="dropdown-item" onClick={(e) => openEditDialog(user)}>Edit</span>
                                                            <span style={{cursor: "pointer"}} className="dropdown-item" onClick={(e) => deleletconfig(user)}>Delete</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    </React.Fragment>
                                                    )
                                                    )
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
                            { edit ? <h6>You can update <strong>{userEdit.name}</strong> of the cin <strong>{userEdit.cin}</strong> here!</h6> : "" } 
                            <h6 Style={{color: "red"}}>{message}</h6>

                        </div>
                        <div className="mailbox-compose-body">
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control"  onChange={(e) => userUpdate.name = e.target.value}  placeholder="Name"/>
                                </div>
                                
                                <div className="form-group">
                                    <input type="email" className="form-control"  onChange={(e) => userUpdate.email = e.target.value} placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control"  onChange={(e) => userUpdate.cin = e.target.value} placeholder="Cin"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" onChange={(e) => userUpdate.password = e.target.value}  placeholder="Password"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" onChange={(e) => userUpdate.passwordConfirm = e.target.value}  placeholder="Confirm Password"/>
                                </div>
                                <div className="form-group">
                                        <select class="custom-select form-control" onChange={(e) => userUpdate.role = e.target.value}>
                                            <option selected>Select Role</option>
                                            <option value="teacher" selected>Teacher</option>
                                            <option value="admin">Admin</option>
                                            
                                        </select>
                                    </div>
                                
                                <div className="compose-buttons">
                                    <span onClick={(e) => gateway(edit,userEdit)} className="btn btn-block btn-success">Save</span>
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
