
import { connect } from 'react-redux';
import React, { useState } from "react";
import './DataContainer.scss';
import PhotoProfile from '../../images/profilePhoto.png'


const DataContainer = (props) => {
       
        //Hooks
        // eslint-disable-next-line
        const [profile, setProfile] = useState([]); 
        // eslint-disable-next-line
        const [datosUser, setDatosUser] = useState(
            {
                name : props.credentials.user.name,
                lastName: props.credentials.user.lastName,
                lastName2: props.credentials.user.lastName2,
                email: props.credentials.user.email,
                password: props.credentials.user.password,
        });        



    let user = props.credentials.user;   

        return (
            
            <div class="container">
                <div class="row row-cols-2">
                    <div class="col mlf-photoProfile">
                        <img className="img-thumbnail mlf-photoProfile" alt="profilePhoto" src={PhotoProfile} width="30%"></img>
                    </div>
                    <div class="col">
                        <div class="viewProfileHi"><strong>¡Hola {user.name}!</strong></div>
                        <br />
                        <div class="textData">Este es tu perfil público.</div>
                        <div class="textData">Recuerda que puedes consultar tus registros de tiempo.</div>
                    </div>  
                </div>

            </div>
        )
    }


export default connect((state)=>({
    credentials:state.credentials,
}))(DataContainer);