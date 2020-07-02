import { taxConstants } from '../../actions/settings/taxes';

const initialState = {
  error: null,
  isLoading: false,
  isUpdating: false,
  data: [],
  meta: {}
};

export default function taxes(state = initialState, action) {
  switch (action.type) {
    case taxConstants.GET_TAXES_REQUEST:
      return {
        ...state, isLoading: true
      }
    case taxConstants.GET_TAXES_SUCCESS:
      const { data, ...rest } = action.payload;
      return {
        ...state, data, meta: rest, isLoading: false
      }
    case taxConstants.GET_TAXES_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    case taxConstants.CREATE_TAXES_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case taxConstants.CREATE_TAXES_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case taxConstants.CREATE_TAXES_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case taxConstants.UPDATE_TAXES_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case taxConstants.UPDATE_TAXES_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case taxConstants.UPDATE_TAXES_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case taxConstants.DELETE_TAXES_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case taxConstants.DELETE_TAXES_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case taxConstants.DELETE_TAXES_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    default:
      return state;
  }
}
