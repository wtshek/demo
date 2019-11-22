import React from 'react';
import './Toolbar.css';
import {
  mdiUndo, mdiRedo, mdiFormatBold, mdiFormatItalic,
  mdiFormatUnderline, mdiFormatColorText, mdiFormatColorHighlight,
} from '@mdi/js';
import {
  fontFamiliesRedner, fontTypeRender, fontSizeRender, buttonsRenderFunc, buttonsHoverFunc,
} from '../resources/fontStyle';


const Toolbar = React.forwardRef(({
  onBtClick, toggleIsHidden, selectedValue, undoFunc, redoFunc,
}, ref) => {
  const onSelectChange = (e) => {
    ref.current.focus();
    selectedValue(e.target.value);
  };
  return (
    <div className="toolbar">
      <div className="right-border">
        {buttonsRenderFunc(mdiUndo, 'Undo', undoFunc)}
        {buttonsRenderFunc(mdiRedo, 'Redo', redoFunc)}
      </div>
      <div className="right-border">
        <select onChange={e => onSelectChange(e)}>
          {fontTypeRender}
        </select>
        <select onChange={e => onSelectChange(e)}>
          {fontFamiliesRedner}
        </select>
        <select onChange={e => onSelectChange(e)}>
          {fontSizeRender}
        </select>
      </div>
      <div className="right-brder">
        {buttonsRenderFunc(mdiFormatBold, 'Bold', onBtClick, 'BOLD')}
        {buttonsRenderFunc(mdiFormatUnderline, 'Underline', onBtClick, 'UNDERLINE')}
        {buttonsRenderFunc(mdiFormatItalic, 'Italic', onBtClick, 'ITALIC')}
        {/* changing font color */}
        {buttonsHoverFunc(mdiFormatColorText, 'Text Color', (e) => { toggleIsHidden('ftColor', e); })}
        {/* changnig hightlighter color */}
        {buttonsHoverFunc(mdiFormatColorHighlight, 'Highlight', (e) => { toggleIsHidden('hlColor', e); })}
      </div>
    </div>
  );
});

export default Toolbar;
