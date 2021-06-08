import axios from "axios";

const host = "http://localhost:3000/";

export async function login(data) {
  var url = host + "login";
  try {
    const response = await axios.post(url,data);
    // debugger;
    return response.data
  } catch (error) {
    // debugger;
    console.error(error);
  }
}
