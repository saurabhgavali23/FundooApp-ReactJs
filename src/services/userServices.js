import Axios from "axios";
import NoteApi from "../config/NoteApi";
import apiServices from "./apiServices";

const FETCH_IMAGE = process.env.REACT_APP_USER_IMAGE;

export const userRegistration = (data) => {
  return apiServices.post(NoteApi.userSignUp, data);
};

export const login = (data) => {
  return apiServices.post(NoteApi.userLogin, data);
};

export const sendEmail = (data) => {
  return apiServices.postWithHeader(NoteApi.userReset, data);
};

export const resetPassword = (data, token) => {
  return Axios.post(URL + NoteApi.resetUserPassword, data, {
    headers: {
      Authorization: token,
    },
  });
};

export const searchUserDetails = (data) => {
  return apiServices.postWithHeader(NoteApi.SearchUserDetails, data);
};

export const uploadUserProfile = async (data) => {
  return await apiServices.postWithHeader(NoteApi.uploadUserImage, data)
          .then(res=>{
            localStorage.setItem("userImage", FETCH_IMAGE+res.data.status.imageUrl)
          }).catch(err=>{console.warn("error", err)})
}
