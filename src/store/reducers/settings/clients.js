import { clientConstants } from '../../actions/settings/clients';

const initialState = {
  error: null,
  isLoading: false,
  isUpdating: false,
  data: [],
  meta: {}
};

export default function clients(state = initialState, action) {
  switch (action.type) {
    case clientConstants.GET_CLIENTS_REQUEST:
      return {
        ...state, isLoading: true
      }
    case clientConstants.GET_CLIENTS_SUCCESS:
      const { data, ...rest } = action.payload;
      return {
        ...state, data, meta: rest, isLoading: false
      }
    case clientConstants.GET_CLIENTS_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    case clientConstants.CREATE_CLIENTS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case clientConstants.CREATE_CLIENTS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case clientConstants.CREATE_CLIENTS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case clientConstants.UPDATE_CLIENTS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case clientConstants.UPDATE_CLIENTS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case clientConstants.UPDATE_CLIENTS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case clientConstants.DELETE_CLIENTS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case clientConstants.DELETE_CLIENTS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case clientConstants.DELETE_CLIENTS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case clientConstants.SEARCH_CLIENTS_REQUEST:
      return {
        ...state, isLoading: true
      }
    case clientConstants.SEARCH_CLIENTS_SUCCESS:
      return {
        ...state, data: action.payload, isLoading: false
      }
    case clientConstants.SEARCH_CLIENTS_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    default:
      return state;
  }
}
