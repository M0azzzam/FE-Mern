import { devicesConstants } from '../../actions/settings/devices';

const intialState = {
  error: {},
  isLoading: false,
  isUpdating: false,
  data: [],
  meta: {}
}

export default function devices(state = intialState, action) {
  switch (action.type) {
    case devicesConstants.GET_DEVICES_REQUEST:
      return {
        ...state, isLoading: true
      }
    case devicesConstants.GET_DEVICES_SUCCESS:
      const { data, ...rest } = action.payload
      return {
        ...state, data: data, meta: rest, isLoading: false
      }
    case devicesConstants.GET_DEVICES_FAILURE:
      return {
        ...state, error: action.payload, isLoading: false
      }
    case devicesConstants.CREATE_DEVICES_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case devicesConstants.CREATE_DEVICES_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case devicesConstants.CREATE_DEVICES_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case devicesConstants.UPDATE_DEVICES_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case devicesConstants.UPDATE_DEVICES_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case devicesConstants.UPDATE_DEVICES_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case devicesConstants.DELETE_DEVICES_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case devicesConstants.DELETE_DEVICES_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case devicesConstants.DELETE_DEVICES_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case devicesConstants.UPDATE_DEVICES_TRIGGERS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case devicesConstants.UPDATE_DEVICES_TRIGGERS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case devicesConstants.UPDATE_DEVICES_TRIGGERS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    default:
      return state;
  }
}
