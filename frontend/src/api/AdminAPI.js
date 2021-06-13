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

export async function getAllClass(token){
  url = host + "class";
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

export async function createNewUser(user,token){
  url = host + "user/";
  try{
    const response = await axios.post(url,user,{
      headers: {
        'Authorization': token
      }
    });
    return response.data
  }catch(error){
    console.log(error)
  }
}

export async function updateAUser(user,token){
  url = host + "user/"+ user.uid;
  try{
    const response = await axios.put(url, user,{
      headers: {
        'Authorization': token
      }
    });
    return response.data
  }catch(error){
    console.log(error)
  }
}
