import {
  CREATE_CONTENT,
  UNCREATE_CONTENT,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
  ADD_TODO_TITLE,
  ADD_TODO_TITLE_FAIL,
  UPDATE_MODALVISIBLE,
  UPDATE_FORMATTED_ADDRESS,
  UPDATE_TODO,
  UPDATE_MAP_SIZE,
  CONTENT_CREATED,
  UPDATE_LOCATION_FAIL_NETWORKERROR,
  ERROR_FIXED,
} from '../actions/types';


// delete_content
const INITIAL_STATE = [{
  id: 1,
  title: "emart shopping",
  location: {
    lat: 35.907757,
    lng: 127.766922,
    latD: 3,
    lngD: 3,
 },
 radius: 500,
 alarm: "ring1",
 weekPeriod: "sun,sat,wed", //everyday
 period: "20210307_20210407",
 isToggleOn: false,
 formatted_address: ''}]; //이 reducer는 딱 content에 관련 state에 대해서만 일을 수행한다. 따라서 []를 사용하는 것이 답이다.

let contentId = 0;

export default function createContentReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_CONTENT:
      return [
        ...state, {
          id: contentId++,
          setting: {
            modalVisible: false,
            radius: 500,
            created: false,
            error: [false, ''],
          },
          location: {
            lat: 35.907757,
            lng: 127.766922,
            latD: 3,
            lngD: 3,
          },
          formatted_address: '',
        },
      ];
    case UNCREATE_CONTENT:
      console.log(state);
      return state.filter(content => content.id !== contentId - 1);
    case UPDATE_MODALVISIBLE: //work
      return state.map(content => {
        if( content.id === contentId - 1/*contentId is already ++ after CREATE_CONTENT*/ ) {
          return {
            ...content,
            setting: {
              ...content.setting, modalVisible: true,
            },
          };
        }

        return content;
      });
    case UPDATE_LOCATION_SUCCESS://work!
      return state.map(content => {
        if (content.id === contentId - 1) {
          return {
            ...content,
            location: {
              lat: action.payload.location.lat,
              lng: action.payload.location.lng,
              latD: 0.0015,
              lngD: 0.008,
            },
            formatted_address: action.payload.formatted_address,
            setting: {
              ...content.setting, modalVisible: false,
            },
          };
        }
        return content;
      });
    case UPDATE_ADDRESS_SUCCESS:
      return state.map(content => {
        if (content.id === contentId - 1) {
          return {
            ...content,
            location: {
              lat: action.payload.region.latitude,
              lng: action.payload.region.longitude,
              latD: 0.0015,
              lngD: 0.008,
            },
            formatted_address: action.payload.formatted_address,
            setting: {
              ...content.setting, modalVisible: false,
            },
          };
        }
        return content;
      });
    case UPDATE_MAP_SIZE://done
      return state.map(content => {
        if (content.id === contentId - 1) {
          return {
            ...content,
            location: {
              ...content.location,
              latD: 0.007,
              lngD: 0.007,
            //단지 latD, lngD만 업뎃 하고 싶다고 lat, lng 까먹으면 노노
            },
          };
        }

        return content;
      })
    case UPDATE_FORMATTED_ADDRESS://done
      return state.map(content => {
        if (content.id === contentId - 1) {
          return {
            ...content,
            formatted_address: action.formatted_address,
          };
        }
        return content;
      });
    case UPDATE_TODO://done
      return state.map(content => {
        if (content.id === contentId - 1) {
          return {
            ...content,
            todo: action.todo,
          };
        }
        return content;
      });
    case CONTENT_CREATED:
      return state.map(content => {
        if (content.id === contentId - 1) {
          return {
            ...content,
            setting: {
              ...content.setting,
              created: true,
            },
          };
        }
        return content;
      });
    case UPDATE_LOCATION_FAIL_NETWORKERROR:
      return state.map(content => {
        if (content.id === contentId - 1) {
          return {
            ...content,
            setting: {
              ...content.setting,
              modalVisible: false,
              error: [true, action.error],
            },
          };
        }
        return content;
      });
    case ERROR_FIXED:
    console.log('errorfixed works!');
      return state.map(content => {
        if (content.id === contentId - 1) {
          return {
            ...content,
            setting: {
              ...content.setting,
              error: [false, ''],
            },
          };
        }
        return content;
      });
    default:
      return INITIAL_STATE;
  }
}
