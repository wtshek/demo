import React, { useRef } from 'react';
import customStyleMap from '../resources/customStyleMap';
import './ColorPicker.css';

// TODOS: make two color picker
const ColorPicker = React.forwardRef(({ onChange, COLORS, type }, ref) => {
  const color = useRef([...Array(6)].map(() => React.createRef()));
  const onBtClick = (i) => {
    ref.current.focus();
    onChange(color.current[i].current.value);
  };

  const renderedList = Object.keys(COLORS).map((col, i) => {
    const colorInMap = COLORS[col].value;
    const hexCol = type === 'ftColor' ? customStyleMap[colorInMap].color : customStyleMap[colorInMap].backgroundColor;
    return (
      <button
        key={col}
        className="colorBts"
        ref={color.current[i]}
        onClick={() => onBtClick(i)}
        value={colorInMap}
        style={{ backgroundColor: hexCol }}
      />
    );
  });
  return <div className="boxed">{renderedList}</div>;
});

export default ColorPicker;
