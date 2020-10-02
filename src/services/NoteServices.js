import Axios from "axios"
import NoteApi from "../config/NoteApi"

const URL = process.env.REACT_APP_BASE_URL
let token = localStorage.getItem('userToken')

export const saveNotes = (data) =>{

    return Axios.post(
        URL+NoteApi.addNotes,
        data,{
            headers:{
                Authorization: token
            }
        }
    )
}