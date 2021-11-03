import {combineReducers} from 'redux';

import {
  SELECT_TO_DO_SETTING,
} from '../actions/types';

const INITIAL_STATE = {
  setting_id: null
}

function selectToDoSetting(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_TO_DO_SETTING:
      return {
        setting_id: action.payload.id,
      };

    default:
      return state;
  }
}

export default selectToDoSetting;
