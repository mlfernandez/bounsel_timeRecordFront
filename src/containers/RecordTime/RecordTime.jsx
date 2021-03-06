
import { connect } from 'react-redux';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { GETRECORD } from '../../redux/types'
import './RecordTime.scss';
import moment from "moment";





const RecordTime = (props) => {
       
        //Hooks
        const [record, setRecord] = useState([]); 
     
// eslint-disable-next-lin
    useEffect(() => {
        findAllRecords();
      }, []);


    function saveStart () {
         
        return document.getElementById("startTime").value;
           }

    function saveEnd () {

        return document.getElementById("endTime").value;
        
    }

    const findAllRecords = async () => {

        let startTime = saveStart()
        let endTime = saveEnd()


        
        let body = {
            startTime : startTime,
            endTime: endTime,
            idUser: props.credentials.idUser
        }

        console.log(body)

        axios
            .post('http://localhost:3006/record/records/filter',body)
            .then((res)=> {
                setRecord(res.data);
                props.dispatch({type:GETRECORD,payload: res.data});
            })
            .catch((err) => {

            });
    };    

    if (!record[0]?.id) {
        return (

        <div class="card">
            <p class="title">
                Buscar registros    
            </p>
            <div className="inputBox">
                <p>Desde</p>
                <input class="input" id="startTime" onChange={()=>saveStart(document.getElementById("startTime").value)}type="date" placeholder="Fecha inicio"></input>

                <p>Hasta</p>
                <input class="input" id="endTime" onChange={()=>saveEnd(document.getElementById("endTime").value)} type="date" placeholder="Fecha fin"></input>

            </div>
            <br />
            <div class="field">
                <p class="control buttons is-centered">
                    <button class="button is-success mlf-button-center-bg" onClick={()=>findAllRecords()}>
                    Buscar
                    </button>
                </p>
                <br />
            </div>
            


        </div>
  

        );
      } else {
        return (
 
            <div class="card">
            <p class="title">
                Tus registros    
            </p>
            <div className="inputBox">
                <p>Desde</p>
                <input class="input" id="startTime" onChange={()=>saveStart(document.getElementById("startTime").value)}type="date" placeholder="Fecha inicio"></input>

                <p>Hasta</p>
                <input class="input" id="endTime" onChange={()=>saveEnd(document.getElementById("endTime").value)} type="date" placeholder="Fecha fin"></input>

            </div>

            <br />
            <div class="field">
                <p class="control buttons is-centered">
                    <button class="button is-success mlf-button-center-bg" onClick={()=>findAllRecords()}>
                    Buscar
                    </button>
                </p>
                <br />
            </div>


            <table class="table">
                <thead>
                    <tr>
                    <th>Comienzo</th>
                    <th>Fin</th>
                    <th>Minutos</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {record.map(item => {
                    return (
                        <tr key={item.index}>
                            <td>{moment(item.startTime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                            <td>{moment(item.endTime).format('MMMM Do YYYY, h:mm:ss a')}</td>
                            <td>{ item.timeRecord }</td>
                        </tr>
                    );
                
                    })}
                </tbody>
                <br />
                
            </table>
        </div>      
        );
      }
  };



export default connect((state)=>({
    credentials:state.credentials,
    record:state.record
}))(RecordTime);