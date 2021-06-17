import axios from "axios";

const host = "http://localhost:3000/";
var url;

// APIs for User management Tab
export async function getSubjectDetails(tid, token){
  url = host + "subjectDetails/" + tid;
  console.log(url)
  try{
    const response = await  axios.get(url,{
      headers: {
        'Authorization': token
      }
    });
    console.log(response.data)
    return response.data.data;
    
  }catch(error){
    console.log(error);
  }
}