import React from 'react';
import {notification} from 'antd';
import './Navbar.scss';
import { connect } from 'react-redux';
import { LOGOUT, GETPROFILE, GETPROJECT } from '../../redux/types';
import { useHistory } from 'react-router-dom';
import Timer from '../Timer/Timer';
import moment from 'moment';
import axios from 'axios';



const Navbar = (props) => {


  let history = useHistory();


    // Logout
  const logOut = async() => {

    let mensaje = "Hasta pronto " + props.credentials.user.name

    notification.success({message:'¡Hasta luego!',description: mensaje});

    endRecord()

    // esto guardo en la api

    let start = (localStorage.getItem("dateStart"));
    let end =  (localStorage.getItem("dateEnd"));

    let body = {
      startTime : moment(start).format(),
      endTime : moment(end).format(),
      idUser : props.credentials.user.id
    }

    console.log(body)

    var res = await axios.post('http://localhost:3006/record', body);
    console.log(res)

    console.log(localStorage.getItem("dateStart"))
    console.log(localStorage.getItem("dateEnd"))

    props.dispatch({ type: LOGOUT });
  

    setTimeout(() => {
      history.push('/');
    }, 1)

  }


      // guarda el fin del registro de tiempo
const endRecord = () => {

/*   let endTime = moment(Date.now()).format()

 */  

  let endTime = Date.now()
  console.log(endTime)
  window.localStorage.setItem("dateEnd", JSON.stringify(endTime));
  

}

  const cambiaDatos = async (info) => {
    switch (info) {

        case "getprofile":
            props.dispatch({ type: GETPROFILE, payload: info });

            break;

        case "getproject":
            props.dispatch({ type: GETPROJECT, payload: info });

            break;


        default:

            break;
        }
  };

  

    // Vista navbar usuario visitante
  if (props.credentials?.token === '') {
    return (

        
<nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <div className="logo">
        <a class="mlf-logo-bracket" href="/">[</a>
        <a class="mlf-logo" href="/">Bounsel</a>
        <a class="mlf-logo-bracket" href="/">]</a>
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
                    <a class="mlf-logo-bracket" href="/">[</a>
                    <a class="mlf-logo" href="/">Bounsel</a>
                    <a class="mlf-logo-bracket" href="/">]</a>
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
                    <div className="logo">
                      <a class="mlf-logo"></a> 
                      <Timer/>
                    </div>
                    <div class="buttons">
                      <a class="button is-primary mlf-btn-color" type="button"  onClick={()=>logOut()} to="/">
                          <strong>Cerrar sesión</strong>
                      </a>
                      <a class="button is-light mlf-btn-color-solid" type="button" onClick={() => cambiaDatos("getproject")}>
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