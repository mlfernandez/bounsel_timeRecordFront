import './App.scss';
import React, { useEffect, useState } from "react";
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Navbar from './components/Navbar/Navbar';
import DataContainer from './containers/DataContainer/DataContainer';
import { LOGOUT } from './redux/types';
import moment from 'moment';
import {notification} from 'antd';





function App(props) {

  let history = useHistory();

  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    
    return () => {
      window.removeEventListener('beforeunload', alertUser)
      
    }
  }, [])
  
  const alertUser = e => {
    e.preventDefault()
    e.returnValue = ''

    endRecord()
      
    console.log(localStorage.getItem("dateStart"), "start")
    console.log(localStorage.getItem("dateEnd"), "end")

  }

    
          // guarda el fin del registro de tiempo
    const endRecord = (props) => {
    
      let endTime = moment(Date.now()).format()
      console.log(endTime)
      window.localStorage.setItem("dateEnd", JSON.stringify(endTime));
      alert(endTime)
         
    
    }




  return (
    <div>
      <BrowserRouter>
      
        <Navbar/>


        <Switch>

          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/datacontainer" exact component={DataContainer}/>
          

        </Switch>

        
      </BrowserRouter>

    </div>
  );
}

export default App;
