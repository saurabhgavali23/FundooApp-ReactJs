import Axios from "axios";
import NoteApi from "../config/NoteApi";
import apiServices from "./apiServices";

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

export const uploadUserProfile = (data) => {
  return apiServices.postWithHeader(NoteApi.uploadUserImage, data)
}
