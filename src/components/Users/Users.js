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
    const userInitialize = { name: "", email: "", cin: ""};

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

    
    function deleletconfig() {
        // eslint-disable-next-line no-restricted-globals
        var del=confirm("Are you sure you want to delete this record?");
        if (del){
            alert ("record deleted")
        } else {
            alert("Record Not Deleted")
        }
    }
    
    const openEditDialog = (user) => {
        setUserEdit(user);
        setEdit(true);
        document.getElementById("mail-compose").click();
    }

    function closeDialog(){
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
                                                        <th scope="col">#</th>
                                                        <th scope="col">Full Name</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">CIN</th>
                                                        <th scope="col">Role</th>
                                                        
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    { users.map((user,index) => (
                                                    <tr>
                                                        
                                                        <th scope="row">{index+1}</th>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.cin}</td>
                                                        <td>{user.role}</td>
                                                        
                                                
                                                        <td>
                                                            <Link className="dropdown-toggle" to="#" style={{borderBottomWidth: "0px", borderTopWidth: "0px"}} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            </Link>
                                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <Link className="dropdown-item" to="" onClick={(e) => openEditDialog(user)}>Edit</Link>
                                                            <Link className="dropdown-item" to="" onClick={deleletconfig}>Delete</Link>
                                                            </div>
                                                        </td>
                                                    </tr>
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
                        </div>
                        <div className="mailbox-compose-body">
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" value={userEdit.name}  placeholder="Name"/>
                                </div>
                                
                                <div className="form-group">
                                    <input type="email" className="form-control" value={userEdit.email}  placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" value={userEdit.cin}  placeholder="Cin"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control"  placeholder="Password"/>
                                </div>
                                <div className="form-group">
                                    <input type="passwordConfirm" className="form-control"  placeholder="Confirm Password"/>
                                </div>
                                
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
    )
}
