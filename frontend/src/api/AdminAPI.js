import axios from "axios";

const host = "http://localhost:3000/";
var url;

// APIs for User management Tab
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

export async function createNewUser(user, token){
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

export async function updateAUser(user, token){
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

export async function checkDuplicateUsername(username, token){
  url = host + "usercheck/" + username;
  try{
    const response = await axios.get(url, {
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

export async function getUsersByRole(role, token){
  url = host + "user/getUserByRole/" + role;
  try{
    const response = await axios.get(url, {
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

export async function deleteAUser(userid, token){
  url = host + "user/" + userid;
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



// APIs for Class management Tab
export async function getAllClass(token){
  url = host + "class/";
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

export async function getSubjectsDetails(token, sid){
  url = host + "subjects/"+sid;
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

export async function createNewClass(classObj,token){
  url = host + "class/";
  try{
    const response = await axios.post(url,classObj,{
      headers: {
        'Authorization': token
      }
    });
    return response.data
  }catch(error){
    console.log(error)
  }
}
