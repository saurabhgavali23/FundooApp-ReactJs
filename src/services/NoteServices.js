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

export const updateNoteLables = (id, data) => {
  return apiServices.postWithHeader(NoteApi.saveNoteLabels+'/'+id+NoteApi.updateNoteLabel, data)
}

export const deleteNoteLabels = (id) => {
  return apiServices.deleteWithHeader(NoteApi.saveNoteLabels+'/'+id+NoteApi.deleteNoteLabel)
}

export const trashNotes = (data) => {
  return apiServices.postWithHeader(NoteApi.TrashNotes, data)
}

export const deleteNotePermanently = (data) => {
  return apiServices.postWithHeader(NoteApi.PermanentDeleteNotes, data)
}

export const addNoteLabels = (id, data) => {
  return apiServices.postWithHeader(NoteApi.notes+id+NoteApi.addNoteLabels, data)
}

export const addCollaborator = (id, data) => {
  return apiServices.postWithHeader(NoteApi.notes+id+NoteApi.addCollaborator, data)
}

export const addReminder = (data) => {
  return apiServices.postWithHeader(NoteApi.addReminder, data)
}

export const updateNoteItemList = (noteId, itemId, data) => {
  return apiServices.postWithHeader(NoteApi.notes+noteId+NoteApi.checkList+itemId+NoteApi.update, data)
}