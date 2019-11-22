/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor, RichUtils } from 'draft-js';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import itemTypes from './itemsType';
import { _toggleStyle } from '../resources/draft-jsModifier';
import customStyleMap from '../resources/customStyleMap';
import { UPDATE_EDITOR_STATE, ISDRAGGING } from '../actions/type';

import './TextEditor.css';


const TextEditor = React.forwardRef(({
  id, left, top, utils, utilsToggle, selectedValue,
}, ref) => {
  const contentRef = useRef();
  const areaRef = useRef();
  let outlineRef = useRef();
  const editorState = useSelector(state => state.editor[id].editorState);
  const dispatch = useDispatch();
  const [styleOnState, setStyleOnState] = useState(false);

  const onSaveEditor = (editorState) => {
    dispatch({
      type: UPDATE_EDITOR_STATE,
      payload: { editorState, id },
    });
  };

  useEffect(() => {
  }, [left, top]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const text = contentState.getPlainText();
    try {
      contentRef.current.style.resize = styleOnState && text.length !== 0 ? 'both' : 'none';
      outlineRef.style.borderBottom = styleOnState && text.length !== 0 ? '1px solid #bebebea8' : 'none';
      outlineRef.style.cursor = styleOnState && text.length !== 0 ? 'move' : 'default';
      outlineRef.style.backgroundColor = styleOnState && text.length !== 0 ? '#bebebea8' : '#ffffff';
      areaRef.current.style.border = styleOnState && text.length !== 0 ? '1px solid #bebebea8' : 'none';
    } catch (e) {
      return '';
    }
  }, [styleOnState]);

  const [isDragging, drag, preview] = useDrag({
    item: {
      type: itemTypes.TEXTBOX, id, top, left,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    dispatch({
      type: ISDRAGGING,
      payload: isDragging,
    });
  }, [isDragging]);

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);


  useEffect(() => {
    if (ref) {
      setTimeout(() => {
        ref.current.focus();
      }, 0);
    }
  }, [ref]);

  useEffect(() => {
    const newState = RichUtils.toggleInlineStyle(editorState, utils);
    onSaveEditor(newState);
  }, [utils, utilsToggle]);

  useEffect(() => {
    const newEditorState = _toggleStyle(selectedValue, editorState);
    onSaveEditor(newEditorState);
  }, [selectedValue]);

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onSaveEditor(newState);
      return 'handled';
    }
    return 'not-handled';
  };


  return (
    <div
      className="newArea"
      onMouseEnter={() => { setStyleOnState(true); }}
      onMouseLeave={() => { setStyleOnState(false); }}
      ref={areaRef}
      style={{ left: `${`${left}px`}`, top: `${`${top}px`}` }}
    >
      <div
        className="outlineArea"
        ref={(hook) => { outlineRef = hook; drag(hook); }}
      />
      <div>
        <div
          className="contentArea"
          ref={contentRef}
        >
          <Editor
            customStyleMap={customStyleMap}
            ref={ref}
            handleKeyCommand={handleKeyCommand}
            onChange={state => onSaveEditor(state)}
            editorState={editorState}
          />
        </div>
      </div>
    </div>
  );
});

export default TextEditor;
