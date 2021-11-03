import axios from 'axios';

import {
  UPDATE_LOCATION_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
  UPDATE_LOCATION_FAIL_NONEXISTADDRESS,
  UPDATE_LOCATION_FAIL_NETWORKERROR,
  UPDATE_LOCATION_FAIL_MISSINGADDRESS,
  UPDATE_LOCATION_FAIL_UNKNOWNERROR,
 } from './types';

const API_KEY = 'AIzaSyC3gTpYDDOeZUjHrVP6MY8I9IJ4902F2Fk';
const GOOGLE_MAP_API = 'https://maps.googleapis.com/maps/api/geocode/json?';

export const getGeocode = (address) => async dispatch => {
  try {
    const url = `${GOOGLE_MAP_API}address=${address}&language=ko&components=country:KR&key=${API_KEY}`;
    let { data } = await axios.get(url);

    if (!data) {
      dispatch({ type: UPDATE_LOCATION_FAIL_NETWORKERROR });
    }

    const { status } = data,
          { formatted_address, geometry } = data.results[0],
          { location } = geometry;

    if (data && status === 'OK') {
      dispatch({ type: UPDATE_LOCATION_SUCCESS, payload: { formatted_address, location }});
    } else if (data && status === 'ZERO_RESULTS') {
      dispatch({ type: UPDATE_LOCATION_FAIL_NONEXISTADDRESS });
    } else if (date && status === 'INVALID_REQUEST') {
      dispatch({ type: UPDATE_LOCATION_FAIL_MISSINGADDRESS });
    } else {
      dispatch({ type: UPDATE_LOCATION_FAIL_UNKNOWNERROR });
    }
  } catch(e) {
    console.log(e + '   서버1error occurred');
    dispatch({ type: UPDATE_LOCATION_FAIL_NETWORKERROR, error: e });
  }
};

export const getAddress = (region) => async dispatch => {
  try {
    const url =`${GOOGLE_MAP_API}latlng=${region.latitude},${region.longitude}&language=ko&location_type=ROOFTOP&key=${API_KEY}`;
    let { data } = await axios.get(url);

    if (!data) {
      dispatch({ type: UPDATE_LOCATION_FAIL_NETWORKERROR });
    }

    const { status } = data,
          { formatted_address } = data.results[0];

    if (data && status === 'OK') {
      dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: { formatted_address, region }});
    } else if (data && status === 'ZERO_RESULTS') {
      dispatch({ type: UPDATE_LOCATION_FAIL_NONEXISTADDRESS });
    } else if (date && status === 'INVALID_REQUEST') {
      dispatch({ type: UPDATE_LOCATION_FAIL_MISSINGADDRESS });
    } else {
      dispatch({ type: UPDATE_LOCATION_FAIL_UNKNOWNERROR });
    }
  } catch(e) {
    console.log(e + '   서버2error occurred');
    dispatch({ type: UPDATE_LOCATION_FAIL_NETWORKERROR, error: e });
  }

}
