import { vendorsConstants } from '../../actions/settings/vendors';

const initialState = {
  error: null,
  isLoading: false,
  isUpdating: false,
  data: [],
  meta: {}
};

export default function vendors(state = initialState, action) {
  switch (action.type) {
    case vendorsConstants.GET_VENDORS_REQUEST:
      return {
        ...state, isLoading: true
      }
    case vendorsConstants.GET_VENDORS_SUCCESS:
      const { data, ...rest } = action.payload;
      return {
        ...state, data, meta: rest, isLoading: false
      }
    case vendorsConstants.GET_VENDORS_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    case vendorsConstants.CREATE_VENDORS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case vendorsConstants.CREATE_VENDORS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case vendorsConstants.CREATE_VENDORS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case vendorsConstants.UPDATE_VENDORS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case vendorsConstants.UPDATE_VENDORS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case vendorsConstants.UPDATE_VENDORS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case vendorsConstants.DELETE_VENDORS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case vendorsConstants.DELETE_VENDORS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case vendorsConstants.DELETE_VENDORS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    default:
      return state;
  }
}
