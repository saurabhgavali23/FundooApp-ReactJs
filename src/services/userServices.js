import Axios from "axios";

export const userRegistration = (data) =>{
 return Axios.post(
        'http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp',
        data
    )
}