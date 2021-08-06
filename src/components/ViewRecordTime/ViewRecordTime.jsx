
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { GETSEARCHPROJECT, UPDATE } from '../../redux/types'
import { Input, notification } from 'antd';
import './ViewRecordTime.scss';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { GETNEWPROJECT } from '../../redux/types';




const DataProject = (props) => {
       
        //Hooks
        const [profile, setProfile] = useState([]); 
        const [project, setProject] = useState([]); 
        const [datosProject, setDatosProject] = useState(
            {
                name : '',
                state : '',
                endDate : '',
                idCategory : '',
            }); 
        const [datosUser, setDatosUser] = useState(
            {
                name : props.credentials.user.name,
                lastName: props.credentials.user.lastName,
                lastName2: props.credentials.user.lastName2,
                email: props.credentials.user.email,
                password: props.credentials.user.password,
                password2: props.credentials.user.password2,
        });        


    const [errors, setErrors] = useState({
        eName : '',
        eEndDate : '', 
        
    });


    useEffect(() => {
    
            
       
      }, []);

    let user = props.credentials.user;   



    const [newMessage, setNewMessage] = useState([]);

    //Handlers (manejadores)

    const updateFormulario = (e) => {
        setDatosProject({...datosProject, [e.target.name]: e.target.value});
    }


 
    const cambiaDatos = async (info) => {
        switch (info) {
    
            case "getnewproject":
                props.dispatch({ type: GETNEWPROJECT, payload: info });
    
                break;

            case "getsearchproject":
                props.dispatch({ type: GETSEARCHPROJECT, payload: info });
    
                break;

    
    
            default:
    
                break;
            }
      };



    

    if (props.credentials?.user?.profile === "admin") {
        
         

        return (
            
            <div class="container">

                <div class="row row-cols">

                    <div class="col viewProyectHi">
                        <div class="viewProyectHi">¡Hola {user.name}!</div>
                        <br />
                        <div><h5>Esta es la vista administrador,</h5></div>
                        <div><h5>aquí puedes crear y modificar proyectos.</h5></div>
                        <br />
                    </div>  

                </div>

                <div class="row row-cols">

                    <div className="boxCardSearch">
                        <div className="mlf-submit-btn">
                            <button type="submit" className="btn btn-primary btn-block mlf-btn-yellow" onClick={() => cambiaDatos("getnewproject")}>Crear proyecto</button>
                        </div>

                        <div className="mlf-submit-btn">
                            <button type="submit" className="btn btn-primary btn-block mlf-btn-yellow" onClick={()=> cambiaDatos("getsearchproject")}>Buscar proyectos</button>
                        </div>


                    </div> 

                </div>

            </div>    

        )
    } 

}

export default connect((state)=>({
    credentials:state.credentials,
}))(DataProject);