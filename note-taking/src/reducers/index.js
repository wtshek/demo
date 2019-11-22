/* eslint-disable import/no-named-as-default */
import { combineReducers } from 'redux';
import editorReducer from './editorReducer';
import colorPickerReducer from './colorPickerReducer';
import dndReducer from './dndReducer';

export default combineReducers({
  editor: editorReducer,
  colorPicker: colorPickerReducer,
  dnd: dndReducer,
});
