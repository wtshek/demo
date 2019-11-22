import uniqid from 'uniqid';
import _ from 'lodash';
import {
  CREATE_EDITOR,
  UPDATE_BOX_POSITION,
  UPDATE_EDITOR_STATE,
  DELETE_EDITOR,
} from '../actions/type';

export default (state = {}, action) => {
  if (action.type === CREATE_EDITOR) {
    const id = uniqid();
    return { ...state, [id]: action.payload };
  }
  if (action.type === UPDATE_BOX_POSITION) {
    const { id, left, top } = action.payload;
    return { ...state, [id]: { ...state[id], left, top } };
  }
  if (action.type === UPDATE_EDITOR_STATE) {
    const { editorState, id } = action.payload;
    return { ...state, [id]: { ...state[id], editorState } };
  }
  if (action.type === DELETE_EDITOR) {
    return _.omit(state, action.payload);
  }
  return state;
};
