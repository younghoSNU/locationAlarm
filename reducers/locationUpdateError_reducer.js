import {
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAIL_NONEXISTADDRESS,
  UPDATE_LOCATION_FAIL_MISSINGADDRESS,
  UPDATE_LOCATION_FAIL_NETWORKERROR,
  UPDATE_LOCATION_FAIL_UNKNOWNERROR,
} from '../actions/types';

//const CONTENT_LIST = [];reducer returns object only

export default function(state = {}, action) {
  switch (action.types) {
    case UPDATE_LOCATION_FAIL_NONEXISTADDRESS:
      return { alertMessage: '잘못된 주소를 입력하셨습니다.' };
    case UPDATE_LOCATION_FAIL_MISSINGADDRESS:
      return { alertMessage: '주소를 입력하지 않으셨습니다.' };
    case UPDATE_LOCATION_FAIL_NETWORKERROR:
      return { alertMessage: '네트워크 연결상태(Wi-Fi, 3G, 4G)가 좋지 않습니다. 확인 후 다시 시도해 주세요.' };
    case UPDATE_LOCATION_FAIL_MISSINGADDRESS:
      return { alertMessage: '알 수 없는 장애(ERROR)가 발생했습니다. 다시 접속해 주세요.' };
    default:
      return state;
  }
}
