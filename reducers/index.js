import { combineReducers } from 'redux';

import contentListReducer from './contentUpdate_reducer';
import  contentReducer from './content_reducer';
import temporaryClickedReducer from './temporaryClicked_reducer';


export default combineReducers({
  "userSetting": contentListReducer,
  "contentsList": contentReducer,
  "temporaryClicked": temporaryClickedReducer,
});
//combineReducers를 사용하면 그것의 프로퍼티이름이 바로 state의 프로퍼티이름으로 적용되 해당 이름을 수정해 줬다
