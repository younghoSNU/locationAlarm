import {
  ADD_TODO_TITLE,
  ADD_TODO_TITLE_FAIL,
  CHANGE_LOCATION_SUCCESS,
  CHANGE_LOCATION_FAIL,
  UPDATE_MODALVISIBLE,
  UPDATE_FORMATTED_ADDRESS,
  UPDATE_TODO,
  UPDATE_MAP_SIZE,
  CONTENT_CREATED,
  ERROR_FIXED,
  TOGGLE_INTRODUCE_SCREEN_CHECKBOX,
  OFF_INTRODUCTION_SCREEN,
} from './types';

let nextId = 0; //danger of habbit: not const but let
const API_KEY = 'AIzaSyC3gTpYDDOeZUjHrVP6MY8I9IJ4902F2Fk';
const GOOGLE_MAP_API = 'https://maps.googleapis.com/maps/api/geocode/json?';

export const updateTodo = (todo) => {
  return { type: UPDATE_TODO, todo };
};

export const updateModalVisible = () => {
  return { type: UPDATE_MODALVISIBLE };
};

export const updateFormattedAddress = (formatted_address) => {
  return { type: UPDATE_FORMATTED_ADDRESS, formatted_address };
};

export const fixMapSize = () => (dispatch) => {
  dispatch({ type: UPDATE_MAP_SIZE });
};

export const contentCreated = () => {
  return { type: CONTENT_CREATED };
};

export const fixError = () => {
  return { type: ERROR_FIXED };
};

export const on_click_introduce_screen_checkbox = () => {
  return {type: TOGGLE_INTRODUCE_SCREEN_CHECKBOX};
};

export const off_introduction_screen = () => {
  return {type: OFF_INTRODUCTION_SCREEN, payload: {toggle: false}};
}
