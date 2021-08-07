
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
                password2: props.credentials.user.password2,
        });        


    let user = props.credentials.user;   

        return (
            
            <div class="container">

                <div class="row row-cols-2">

                    <div class="col mlf-photoProfile">
                        <img className="img-thumbnail mlf-photoProfile" alt="profilePhoto" src={PhotoProfile} width="30%"></img>
                    </div>
                    <div class="col">
                        <div class="viewProfileHi">¡Hola {user.name}!</div>
                        <br />
                        <div class="text"><h5>Este es tu perfil público.</h5></div>
                        <div class="text"><h5>Recuerda que puedes consultar tus registros de tiempo.</h5></div>
                    </div>  
                </div>

            </div>
        )
    }


export default connect((state)=>({
    credentials:state.credentials,
}))(DataContainer);