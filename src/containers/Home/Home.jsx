import React from "react";
import { connect } from 'react-redux';
import './Home.scss';


const Home = (props) => {





            // Vista Home con usuario visitante
    if (!props.credentials?.token) {
        return (

            <div className="HomeContainer">
                <div className="title"><strong>¡Hola!</strong> </div>
                <br />
                <h1>   Esta es una prueba técnica para <strong>Bounsel</strong>,</h1>
                <h1>realizada por <strong>Mariana Fernández Sacristan</strong>.</h1>
                <br />
                <h1>Para acceder a la aplicación y consultar tus registros tienes que loguearte.</h1>
            </div>
        
        );

            // Vista Home con usuario logeado
    }else {
        return(

            <div className="HomeContainer">
                <div className="title"><strong>¡Hola {props.credentials.user.name}!</strong> </div>
                <br />
                Gracias por visitarnos, recuerda que puedes consultar tus registros.
            </div>
        )
    }
}


export default connect((state) => ({
    credentials:state.credentials, 
    }))(Home);