import NoteApi from "../config/NoteApi";
import apiServices from "./apiServices";

export const saveNotes = (data) => {
  return apiServices.postWithHeader(NoteApi.addNotes, data);
};

export const getNoteList = () => {
  return apiServices.getWithHeader(NoteApi.getNotes);
};

export const saveNoteLabels = (data) => {
  return apiServices.postWithHeader(NoteApi.saveNoteLabels, data);
};
