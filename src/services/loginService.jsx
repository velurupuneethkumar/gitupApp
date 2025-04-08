import axios from 'axios';
 
const LOGIN_URL="http://localhost:9696/edu-con/login";

export const registerNewUser = (user) =>{
    return axios.post(LOGIN_URL,user)
}

export const validateUser = (userId,password) => {
    return axios.get(LOGIN_URL+ '/' + userId+'/'+password);
}