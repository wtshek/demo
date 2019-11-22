/* eslint-disable import/prefer-default-export */
import {
  CREATE_EDITOR,
  UPDATE_BOX_POSITION,
  DELETE_EDITOR,
  ISDRAGGING,
} from './type';

export const createEditor = (payload) => {
  return { type: CREATE_EDITOR, payload };
};

export const updateBoxPosition = (payload) => {
  return { type: UPDATE_BOX_POSITION, payload };
};

export const deleteEditor = (payload) => {
  return { type: DELETE_EDITOR, payload };
};

export const isDragging = (payload) => {
  return { type: ISDRAGGING, payload };
};
