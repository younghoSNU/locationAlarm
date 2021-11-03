import { CREATE_CONTENT, UNCREATE_CONTENT } from './types';

export const unCreateContent = (callback) => (dispatch) => {
  try {
    dispatch({ type: UNCREATE_CONTENT });
    callback();
  } catch(e) {
    console.log(e + 'error located in createContent_action.js');
  }
};


//first return action then do navigate to Map screen
export const createContent = (callback) => (dispatch) => {
  try {
    dispatch({ type: CREATE_CONTENT });
    callback();
  } catch(e) {
    console.log(e + 'error located in createContent_action.js');
  }
};
