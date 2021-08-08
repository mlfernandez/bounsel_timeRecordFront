import './App.scss';
import React from "react";
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Navbar from './components/Navbar/Navbar';
import DataContainer from './containers/DataContainer/DataContainer';
import RecordTime from './containers/RecordTime/RecordTime';


function App() {


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

export default App;

