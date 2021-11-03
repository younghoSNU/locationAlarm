import {
  SELECT_TO_DO_SETTING
} from './types';

export const selectSettingId = (id) => {
  return {type: SELECT_TO_DO_SETTING, payload: {id}};
};
