import Axios from "axios";
import NoteApi from "../config/NoteApi";

const URL = process.env.REACT_APP_BASE_URL

export const userRegistration = (data) =>{
 return Axios.post(
        URL+NoteApi.userSignUp,
        data
    )
}

export const login = (data) =>{
    return Axios.post(
        URL+NoteApi.userLogin,
        data
    )
}