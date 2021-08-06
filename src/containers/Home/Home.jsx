import React from 'react';
import { connect } from 'react-redux';
import './Home.scss';


const Home = (props) => {


            // Vista Home con usuario visitante
    if (!props.credentials?.token) {
        return (

            <div className="HomeContainer">
                ¡Hola! Para acceder a la aplicación tienes que logearte.
            </div>
        
        );

            // Vista Home con usuario logeado
    }else {
        return(

            <div className="HomeContainer">
                ¡Hola! Gracias por visitarnos, recuerda que puedes consultar tus registros.
            </div>
        )
    }
}


export default connect((state) => ({
    credentials:state.credentials, 
    }))(Home);