
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import {LOGIN} from '../../redux/types'
import {notification} from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import './Login.scss';
import 'antd/dist/antd.css';



const Login = (props) => {

    let history = useHistory();

    //Hooks
    const [credentials, setCredentials] = useState({email:'', password:''});
    // eslint-disable-next-line
    const [msgError, setMensajeError] = useState('');
    
    //Handle
    const updateCredentials = (e) => {
        setCredentials ({...credentials, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                logueame();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
        // eslint-disable-next-line
    },[credentials]);


    const logueame = async () => {


        //Primero, validamos los datos
            
        if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(credentials.email) ) {
             setMensajeError('Introduce el formato de email valido ejemplo@ejemplo.com');
             return;
        }

        //Luego, generamos el body de datos
        let body = {
            email : credentials.email,
            password : credentials.password
        }

        
        // llamada a axios Axios      
        try {var res = await axios.post('http://localhost:3006/login', body);
           
               
                let data = {
                    token : res.data.token,
                    user : res.data.user,
                    idUser: res.data.user.id,
                    
                }

                //Guardo en RDX
                props.dispatch({type:LOGIN,payload:data});
                               
                //Mensaje de bienvenida
                let description = ("¡Hola " + res.data.user.name + "!");
                
    
                notification.success({message:'Login correcto.',description: description});
                
                //iniciar contador de actividad
                startRecord();

                //Redireccion           
                history.push("/datacontainer");

            } catch (err) {
                    
                    notification.warning({message:'Atencion.',description: "Usuario o password incorrecto."});                 
                }       
    }

        // guarda el inicio del registro del tiempo
const startRecord = () => {

    let startTime = new Date();

    window.localStorage.setItem("dateStart", startTime.toString());

}

    return (
        <div class="container is-max-desktop">
            <div className="loginTitle">¡Inicia sesión en tu cuenta de [ Bounsel ]!</div>
            <div class="notification is-primary mlf-login-bg">
                <div class="field">
                    <p class="control has-icons-left">
                        <input className="input form-control inputLoginFormItem" type="email" name="email" placeholder="Email" 
                            onChange={updateCredentials} size="40" lenght='30'>
                        </input>
                        <span class="icon is-small is-left">
                            <FontAwesomeIcon class="fas fa-envelope"icon={faEnvelope}/>
                        </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                    <input className="input form-control inputLoginFormItem" type="password" name="password" placeholder="Contraseña" 
                            onChange={updateCredentials} size="40" lenght='30'>
                        </input>
                        <span class="icon is-small is-left">
                            <FontAwesomeIcon class="fas fa-lock"icon={faLock}/>
                        </span>
                    </p>
                </div>

                <div class="field">
                    <p class="control buttons is-centered">
                        <button class="button is-success mlf-button-center-bg" onClick={()=>logueame()}>
                        Iniciar sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default connect()(Login);