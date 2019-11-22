import React from 'react';
import Icon from '@mdi/react';
import './fontStyle.css';

const fontFamilies = ["'Alegreya Sans', sans-serif", "'Alegreya', serif", "'Chivo', sans-serif",
  "'Cormorant', serif", "'Eczar', serif", "'Fira Sans', sans-serif", "'IBM Plex Sans', sans-serif",
  "'Libre Franklin', sans-serif", "'Lora', serif", "'Roboto', sans-serif", "'Rubik', sans-serif",
  "'Space Mono', monospace", "'Source Sans Pro', sans-serif", "'Source Serif Pro', serif",
  "'Work Sans', sans-serif"];
const fontTypes = ['normal', 'H1', 'H2', 'H3', 'H4'];
const size = ['8', '9', '10', '11', '12', '14', '18', '24', '30', '36', '48', '60', '72', '96'];


const listRender = (list) => {
  const renderList = list.map((i) => {
    switch (i) {
      case '14':
        return (
          <option
            key={i}
            value={i}
            selected
          >
            {i.split(',')[0].match(/[A-za-z0-9]/g)}
          </option>
        );

      default:
        return (
          <option
            key={i}
            value={i}
            style={{ fontFamily: i }}
          >
            {i.split(',')[0].match(/[A-za-z0-9]/g)}
          </option>
        );
    }
  });
  return renderList;
};

export const buttonsRenderFunc = (buttons, title, onClickFunc, utils) => (
  <button onClick={e => onClickFunc(e, utils)}>
    <Icon path={buttons} title={title} size="1rem" />
  </button>
);

export const buttonsHoverFunc = (buttons, title, onMouseFunc, utils) => (
  <button
    onClick={e => onMouseFunc(e, utils)}
  >
    <Icon path={buttons} title={title} size="1rem" />
  </button>
);

export const fontFamiliesRedner = listRender(fontFamilies);
export const fontTypeRender = listRender(fontTypes);
export const fontSizeRender = listRender(size);
