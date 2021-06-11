import axios from "axios";

const host = "http://localhost:3000/";
var url;

export async function getAllUsers(token){
  url = host + "users";
  try{
    const response = await  axios.get(url,{
      headers: {
        'Authorization': token
      }
    });
    return response.data;
  }catch(error){
    console.log(error);
  }
}
