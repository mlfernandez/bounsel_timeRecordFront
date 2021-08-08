import React, { useEffect } from "react";
import {useHistory} from 'react-router-dom';
import {notification} from 'antd';
import './Navbar.scss';
import { connect } from 'react-redux';
import { LOGOUT } from '../../redux/types';
import endTimeRecord from '../../utils';



const Navbar = (props) => {

  let history = useHistory();

// funcion guarda registro de tiempo cuando se cierra el browser

  window.onbeforeunload = function(e) {


    if (props.credentials?.token) {

      endTimeRecord(props.credentials.user.id)
      props.dispatch({ type: LOGOUT });

    }
    return ('Texto de aviso');
    };


    // Logout
  const logOut = async() => {

    let mensaje = "Hasta pronto " + props.credentials.user.name

    notification.success({message:'¡Hasta luego!',description: mensaje});

    endTimeRecord(props.credentials.user.id)


    props.dispatch({ type: LOGOUT });
  

    setTimeout(() => {
      history.push('/');
    }, 1)

  }



    // Vista navbar usuario visitante
  if (props.credentials?.token === '') {
    return (

        
<nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <div className="logo">
        <a class="mlf-logo-bracket" >[</a>
        <a class="mlf-logo" href="/">Bounsel</a>
        <a class="mlf-logo-bracket" >]</a>
    </div>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>


  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary mlf-btn-color" type="button" onClick={() => history.push('/login')}>
            <strong>Iniciar sesión</strong>
          </a>
          <a class="button is-light mlf-btn-color-solid" type="button">
            Registrase
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>

    )

    // vista navbar usuario logeado
  } else if (props.credentials?.user?.profile === "user" ) {
    return (
        <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <div className="logo">
                    <a class="mlf-logo-bracket" >[</a>
                    <a class="mlf-logo" href="/">Bounsel</a>
                    <a class="mlf-logo-bracket" >]</a>
                </div>

                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>


            </div>


            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-end">
                  <div class="navbar-item">

                    <div class="buttons">
                      <a class="button is-primary mlf-btn-color" type="button"  onClick={()=>logOut()} to="/">
                          <strong>Cerrar sesión</strong>
                      </a>
                      <a class="button is-light mlf-btn-color-solid" type="button" onClick={() => history.push('/records')}>
                          Mis Registros
                      </a>
                    </div>
                </div>
                </div>
            </div>
        </nav>

    )

    }

};


export default connect((state)=>({credentials:state.credentials}))(Navbar);