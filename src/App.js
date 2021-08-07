import './App.scss';
import React, { useEffect } from "react";
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Navbar from './components/Navbar/Navbar';
import DataContainer from './containers/DataContainer/DataContainer';
import { connect } from 'react-redux';
import endTimeRecord from './utils';
import RecordTime from './containers/RecordTime/RecordTime';


function App(props) {


  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    
    return () => {
      window.removeEventListener('beforeunload', alertUser)

          // llamo a la funcion de guardar el registro
    endTimeRecord(props.credentials.user.id)
      
    }
  }, [])
  
  const alertUser = e => {
    e.preventDefault()
    e.returnValue = ''




  }


  return (
    <div>
      <BrowserRouter>
      
        <Navbar/>


        <Switch>

          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/datacontainer" exact component={DataContainer}/>
          <Route path="/records" exact component={RecordTime}/>

          

        </Switch>

        
      </BrowserRouter>

    </div>
  );
}

/* export default App; */
export default connect((state)=>({credentials:state.credentials}))(App);
