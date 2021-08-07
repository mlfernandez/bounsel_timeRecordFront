import axios from 'axios';

 const endTimeRecord = async (userId) => {


// guarda el fin del registro de tiempo
    let endTime = new Date()
    window.localStorage.setItem("dateEnd", endTime.toString());
       
  // llamo al endpoint para guardar los registros en la api

  let start =  Date.parse(localStorage.getItem("dateStart"));
  let end =  Date.parse(localStorage.getItem("dateEnd"));

  let body = {
    startTime : start,
    endTime : end,
    idUser : userId
  }

  var res = await axios.post('http://localhost:3006/record', body);
  return res

  };
   
  export default endTimeRecord;