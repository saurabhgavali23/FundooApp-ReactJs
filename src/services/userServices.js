import Axios from "axios";
import NoteApi from "../config/NoteApi";

const URL = process.env.REACT_APP_BASE_URL
let token = localStorage.getItem('userToken');

export const userRegistration = (data) =>{
 return Axios.post(
        `${URL}${NoteApi.userSignUp}`,
        data
    )
}

export const login = (data) =>{
    return Axios.post(
        `${URL}${NoteApi.userLogin}`,
        data
    )
}

export const sendEmail = (data) =>{
    
    return Axios.post(
        `${URL}${NoteApi.userReset}`,
        data,{
            headers:{
                Authorization: token
            }
        }
    )
}

export const resetPassword = (data, token) =>{
    
    return Axios.post(
        URL+NoteApi.resetUserPassword,
        data,{
            headers:{
                Authorization: token
            }
        }
    )
}

export const searchUserDetails = (data) =>{

    return Axios.post(
        `${URL}${NoteApi.SearchUserDetails}`,
        data,{
            headers:{
                Authorization: token
            }
        }
    )
}