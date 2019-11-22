/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/aria-role */
import React, { useState } from 'react';
import _ from 'lodash';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { EditorState } from 'draft-js';
import {
  CREATE_EDITOR,
  UPDATE_BOX_POSITION,
  UPDATE_EDITOR_STATE,
  DELETE_EDITOR,
} from '../actions/type';
import ColorPicker from './ColorPicker';
import TextEditor from './TextEditor';
import Toolbar from './Toolbar';
import './TextEditorPage.css';
import itemsType from './itemsType';

const TextEditorPage = () => {
  const [utilsToggle, setUtilsToggle] = useState(false);
  const [utils, setUtils] = useState();
  const [currFocus, setCurrFocus] = useState();
  const [currEditorState, setCurrEditorState] = useState({ editorState: null, id: null });
  // creating editor
  const editor = useSelector(state => state.editor);
  const dispatch = useDispatch();

  // for color picker
  const [isHidden, setIsHidden] = useState(true);
  const [prevBtType, setPrevBtType] = useState();
  const [selectedValue, setSelectedValue] = useState();

  // eslint-disable-next-line no-underscore-dangle
  const _colorPicker = () => {
    const { style, type, COLORS } = useSelector(state => state.colorPicker);
    if (isHidden) {
      return '';
    }
    return (
      <div className="colorPicker" style={style}>
        <ColorPicker
          type={type}
          COLORS={COLORS}
          ref={currFocus}
          onChange={setSelectedValue}
        />
      </div>
    );
  };

  const toggleIsHidden = (btType, e) => {
    e.stopPropagation();
    if (currFocus) {
      currFocus.current.focus();
      if (isHidden && btType !== prevBtType) {
        dispatch({ type: btType });
        setIsHidden(!isHidden);
      } else if (btType === prevBtType) {
        setIsHidden(!isHidden);
      } else if (btType !== prevBtType) {
        dispatch({ type: btType });
      }
      setPrevBtType(btType);
    }
  };

  const turnOnIsHidden = () => {
    if (isHidden === false) {
      setIsHidden(true);
    }
  };

  const createTextArea = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    dispatch({
      type: CREATE_EDITOR,
      payload: {
        top: y, left: x, ref: React.createRef(), editorState: EditorState.createEmpty(),
      },
    });
  };

  const deleteEmpty = () => {
    if (!_.isEmpty(editor)) {
      const contentState = currEditorState.editorState.getCurrentContent();
      const text = contentState.getPlainText();
      if (text.length === 0) {
        dispatch({
          type: DELETE_EDITOR,
          payload: currEditorState.id,
        });
      }
    }
  };


  const onBtClick = (e, utils) => {
    e.preventDefault();
    if (currFocus) {
      currFocus.current.focus();
      setUtilsToggle(!utilsToggle);
      setUtils(utils);
    }
  };

  const undoFunc = () => {
    const { id, editorState } = currEditorState;
    const newState = EditorState.undo(editorState);
    dispatch({
      type: UPDATE_EDITOR_STATE,
      payload: { newState, id },
    });
  };

  const redoFunc = () => {
    const { id, editorState } = currEditorState;
    const newState = EditorState.redo(editorState);
    dispatch({
      type: UPDATE_EDITOR_STATE,
      payload: { newState, id },
    });
  };

  const renderedTextList = () => {
    const keys = Object.keys(editor);
    const renderedList = keys.map((key) => {
      const {
        top, left, ref, editorState,
      } = editor[key];
      return (
        <div
          key={key}
          onBlur={() => { setCurrFocus(ref); setCurrEditorState({ editorState, id: key }); }}
        >
          <TextEditor
            id={key}
            selectedValue={selectedValue}
            utils={utils}
            utilsToggle={utilsToggle}
            ref={ref}
            left={left < 0 ? 0 : left}
            top={top}
          />
        </div>
      );
    });
    return renderedList;
  };


  const updateBoxPosition = (id, left, top) => {
    dispatch({ type: UPDATE_BOX_POSITION, payload: { id, left, top } });
  };

  const [, drop] = useDrop({
    accept: itemsType.TEXTBOX,
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);
      updateBoxPosition(item.id, left, top);
      return undefined;
    },
  });

  return (
    <div>
      <div role="body" className="container" onClick={() => turnOnIsHidden()}>
        <Toolbar
          redoFunc={redoFunc}
          undoFunc={undoFunc}
          ref={currFocus}
          selectedValue={setSelectedValue}
          onBtClick={onBtClick}
          toggleIsHidden={toggleIsHidden}
        />
      </div>
      <div
        ref={drop}
        className="textArea"
        onDoubleClick={(e) => { deleteEmpty(); createTextArea(e); }}
      >
        {_colorPicker()}
        {renderedTextList()}
      </div>
    </div>
  );
};

export default TextEditorPage;
