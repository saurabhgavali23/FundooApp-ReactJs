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

export const updateNotePin = (data) => {
  return apiServices.postWithHeader(NoteApi.pinUnpinNotes, data)
}

export const updateNoteArchive = (data) => {
  return apiServices.postWithHeader(NoteApi.ArchiveNote, data)
}

export const updateNoteColor = (data) => {
  return apiServices.postWithHeader(NoteApi.NoteColor, data)
}

export const updateNoteTitleDescription = (data) => {
  return apiServices.postWithHeader(NoteApi.updateNotes, data)
}

export const getNoteLabelList = () => {
  return apiServices.getWithHeader(NoteApi.getLabelList)
}