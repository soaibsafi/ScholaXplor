import axios from "axios";

const host = "http://localhost:3000/";
var url;

export async function getSubjectDetails(tid, token){
  url = host + "subjectDetails/" + tid;
  try{
    const response = await  axios.get(url,{
      headers: {
        'Authorization': token
      }
    });
    //console.log(response.data)
    return response.data;

  }catch(error){
    console.log(error);
  }
}

export async function getTestDetails(sid, token){
  url = host + "test/" + sid;
  try{
    const response = await  axios.get(url,{
      headers: {
        'Authorization': token
      }
    });
    //console.log(response.data)
    return response.data;

  }catch(error){
    console.log(error);
  }
}

export async function getStudentMarkDetails(tid, token){
  url = host + "marks/" + tid;

  try{
    const response = await  axios.get(url,{
      headers: {
        'Authorization': token
      }
    });
    //console.log(response.data)
    return response.data;

  }catch(error){
    console.log(error);
  }
}

export async function updateResult(data, token){
  url = host + "uploadResult/";
  debugger
  try{
    const response = await axios.post(url, data,{
      headers: {
        'Authorization': token
      }
    });
    console.log(response);
    return response.data;
  }catch(error){
    console.log(error);
  }
}

export async function createNewTest(test, token){
  url = host + "test/";
  try{
    const response = await axios.post(url,test,{
      headers: {
        'Authorization': token
      }
    });
    return response.data
  }catch(error){
    console.log(error)
  }
}

export async function updateATest(testObj, token){
  url = host + "test/"+ testObj.tid;

  try{
    const response = await axios.put(url, testObj,{
      headers: {
        'Authorization': token
      }
    });
    return response.data
  }catch(error){
    console.log("Error Res: "+error)
  }
}


export async function deleteATest(tid, token){
  url = host + "test/" + tid;
  debugger
  try{
    const response = await axios.delete(url, {
      headers: {
        'Authorization': token
      }
    })

    console.log(response);
    return response.data;
  }catch(error){
    console.log(error);
  }
}
