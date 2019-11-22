import { ISDRAGGING } from '../actions/type';

export default (state = {}, action) => {
  if (action.type === ISDRAGGING) {
    return action.payload;
  }
  return state;
};
