/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import { EditorState, Modifier, RichUtils } from 'draft-js';
import customStyleMap from './customStyleMap';


// it is a function, not a component
export const _toggleStyle = (selectedStyle, editorState) => {
  const selection = editorState.getSelection();

  const nextContentState = Object.keys(customStyleMap).reduce(
    (contentState, color) => {
      return Modifier.removeInlineStyle(contentState, selection, color);
    }, editorState.getCurrentContent(),
  );

  let nextEditorState = EditorState.push(
    editorState,
    nextContentState,
    'change-inline-style',
  );

  const currentStyle = editorState.getCurrentInlineStyle();

  if (selection.isCollapsed()) {
    nextEditorState = currentStyle.reduce((state, style) => {
      if (Object.keys(customStyleMap).includes(style)) {
        return RichUtils.toggleInlineStyle(state, style);
      }
      return nextEditorState;
    }, nextEditorState);
  }

  if (!currentStyle.has(selectedStyle)) {
    nextEditorState = RichUtils.toggleInlineStyle(
      nextEditorState,
      selectedStyle,
    );
  }
  return nextEditorState;
};
