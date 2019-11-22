import { BKCOLORS, FTCOLORS } from '../resources/COLORS';
import { FTCOLOR, HLCOLOR } from '../actions/type';


export default (state = { top: 0, left: 0 }, action) => {
  if (action.type === FTCOLOR) {
    return {
      style: { top: '0.1rem', left: '70%', position: 'relative' }, COLORS: FTCOLORS, type: 'ftColor',
    };
  }

  if (action.type === HLCOLOR) {
    return {
      style: { top: '0.1rem', left: '76%', position: 'relative' }, COLORS: BKCOLORS, type: 'hlColor',
    };
  }
  return state;
};
