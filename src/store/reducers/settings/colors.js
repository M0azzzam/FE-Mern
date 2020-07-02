import { colorsConstants } from '../../actions/settings/colors';

const initialState = {
  error: null,
  isLoading: false,
  isUpdating: false,
  data: [],
  meta: {}
};

export default function colors(state = initialState, action) {
  switch (action.type) {
    case colorsConstants.GET_COLORS_REQUEST:
      return {
        ...state, isLoading: true
      }
    case colorsConstants.GET_COLORS_SUCCESS:
      const { data, ...rest } = action.payload;
      return {
        ...state, data: data, meta: rest, isLoading: false
      }
    case colorsConstants.GET_COLORS_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    case colorsConstants.CREATE_COLORS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case colorsConstants.CREATE_COLORS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case colorsConstants.CREATE_COLORS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case colorsConstants.UPDATE_COLORS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case colorsConstants.UPDATE_COLORS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case colorsConstants.UPDATE_COLORS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case colorsConstants.DELETE_COLORS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case colorsConstants.DELETE_COLORS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case colorsConstants.DELETE_COLORS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    default:
      return state;
  }
}
