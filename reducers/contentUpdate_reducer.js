import { combineReducers }  from 'redux';

import {
  UPDATE_LOCATION_SUCCESS,
  ADD_TODO_TITLE,
  ADD_TODO_TITLE_FAIL,
  OFF_INTRODUCTION_SCREEN,
  TOGGLE_INTRODUCE_SCREEN_CHECKBOX
} from '../actions/types';

const INITIAL_STATE = {
  location: {
    lat: 35.907757,
    lng: 127.766922,
    latD: 3,
    lngD: 3,
   },
  formatted_address: '',
};

const INITIAL_GLOBAL_SETTING = {
  toggle_introduction_screen: true,
  introduce_screen_checkbox: false,
};

function updateLocation (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_LOCATION_SUCCESS:
      return {
        location: {
          lat: action.payload.location.lat,
          lng: action.payload.location.lng,
          latD: 0.01,
          lngD: 0.01,
        },
        formatted_address: action.payload.formatted_address,
      };
    default:
      return state;
  }
}

function updateTodoTitle (state = {}, action) {
  switch (action.type) {
    case ADD_TODO_TITLE:
      return { title: action.title };
    case ADD_TODO_TITLE_FAIL:
      return { alertMessage: '할일을 입력해주세요.' };
    default:
      return state;
  }
}

function updateGlobalSetting (state = INITIAL_GLOBAL_SETTING, action) {
  switch (action.type) {
    case OFF_INTRODUCTION_SCREEN:
      return {
        ...state,
        toggle_introduction_screen: action.payload.toggle,

      };

    case TOGGLE_INTRODUCE_SCREEN_CHECKBOX:
      return {
        ...state,
        introduce_screen_checkbox: !state.introduce_screen_checkbox,
      }

    default:
      return state;
  }
}

export default combineReducers({
  updateLocation,
  updateTodoTitle,
  updateGlobalSetting,
});//; necessary
