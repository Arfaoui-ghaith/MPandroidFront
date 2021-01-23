import React from 'react'
import {Link, BrowserRouter as Router} from 'react-router-dom';
import $ from 'jquery';
import SideBar from './../SideBar/SideBar';
import Header from './../Header/Header';
import axios from 'axios';

export default function Classe() {
    const [edit,setEdit] = React.useState(false);
    const [classeEdit, setClasseEdit] = React.useState({});
    
    const [classes, setClasses] = React.useState([]);
    const [message, setMessage] = React.useState("");

    const gateway = (edit,classe) => {
        if(edit){
            console.log("we in the edit now");
            updateClasse(classe,classeEdit);
        }else{
            addClasse(classe);
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
            console.log(classes);
   
            
       }catch(err){

           console.log(err.message);
       }
    }


    const addClasse = async (classeEdit) => {
        if(classeEdit.name === "" || classeEdit.name === undefined){
            return setMessage("Please provide a unique name.");
        }
        console.log(classeEdit);
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/classes/";

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'post',
                data: classeEdit,
                url
            });

            console.log(result.data);
            setMessage("");
            window.location.replace("/classes");
            
       }catch(err){
            setMessage("Please provide a unique name.");
            console.log(err.message);
       }
    }

    const deleteClasse = async (classe) => {
        console.log(classe);
        const url = `https://miniprojetandroid.herokuapp.com/api/v1/classes/`+classe._id;

        try{
            const result = await axios({
                headers : {'Authorization': `Bearer ${localStorage.getItem('tokenIsetApp')}`},
                method: 'delete',
                url
            });

            console.log(result.data);
            window.location.replace("/classes");
            
       }catch(err){
            
           console.log(err.message);
       }

    }

    const updateClasse = async (classe,classeEdit) => {
        setMessage("");
        let body = {};
        var test = false;
        if(!(classeEdit.name === "" || classeEdit.name === undefined)) { body.name = classeEdit.name; test = true;}  

        console.log("body",body);
        console.log(classe);

        if(test){
        const url = "https://miniprojetandroid.herokuapp.com/api/v1/classes/"+classe._id;

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


    function deleletconfig(classe) {
        // eslint-disable-next-line no-restricted-globals
        var del=confirm("Are you sure you want to delete this classe "+classe.name+" ?");
        if (del){
            deleteClasse(classe);
            alert (classe.name+" deleted.")
        } else {
            alert(classe.name+" not deleted")
        }
    }
    
    const openEditDialog = (classe) => {
        console.log(classe);
        setClasseEdit(classe)
        setEdit(true);
        document.getElementById("mail-compose").click();
    }

    function closeDialog(){
        setClasseEdit({});
        setMessage("");
        setEdit(false);
        document.getElementById("dialogF").click();
    }


    React.useEffect(() => {

        getAllClasses();


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
        
        <div className="connect-container align-content-stretch d-flex flex-wrap">
        <SideBar/>
        <div className="page-container">  
        <Header/>
            <div className="page-content">
                <div className="page-info">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="#">Management</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Classes</li>
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
                                                        
                                                        
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {classes.map((classe,index) => (
                                                    <React.Fragment key={index}>
                                                    <tr>
                                                        <td>{classe._id}</td>
                                                        <td><Link to="/students" alt={classe.name} onClick={(e) => localStorage.setItem('classeName', e.target.attributes[0].value)}>{classe.name}</Link></td>
                                                        
                                                        
                                                        <td>
                                                            <Link className="dropdown-toggle" to="#" style={{borderBottomWidth: "0px", borderTopWidth: "0px"}} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            </Link>
                                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                            <span style={{cursor: "pointer"}} className="dropdown-item"  onClick={(e) => openEditDialog(classe)}>Edit</span>
                                                            <span style={{cursor: "pointer"}} className="dropdown-item"  onClick={(e) => deleletconfig(classe)}>Delete</span>
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
                            <h5>{ edit ? 'edit' : 'add' } Classe</h5>
                            { edit ? <h6>You can update <strong>{classeEdit.name}</strong> here!</h6> : "" } 
                            <h6 Style={{color: "red"}}>{message}</h6>
                        </div>
                        <div className="mailbox-compose-body">
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="compose-email" onChange={(e) => classeEdit.name = e.target.value} placeholder="Classe Name"/>
                                </div>
                                
                                <div className="compose-buttons">
                                    <span onClick={(e) => gateway(edit,classeEdit)} className="btn btn-block btn-success">Save</span>
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
        
        </React.Fragment>
    )
}
