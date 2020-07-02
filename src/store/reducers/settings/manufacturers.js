import {
  manufacturersConstants
} from '../../actions/settings/manufacturers';

const initialState = {
  error: {},
  isLoading: false,
  data: [],
  meta: {}
}

export default function manufacturers(state = initialState, action) {
  switch (action.type) {
    case manufacturersConstants.GET_MANUFACTURERS_REQUEST:
      return {
        ...state, isLoading: true
      }
    case manufacturersConstants.GET_MANUFACTURERS_SUCCESS:
      const { data, ...rest } = action.payload
      return {
        ...state, isLoading: false, data, meta: rest,
      }
    case manufacturersConstants.GET_MANUFACTURERS_FAILURE:
      return {
        ...state, error: action.payload
      }
    case manufacturersConstants.DELETE_MANUFACTURERS_REQUEST:
      return {
        ...state, isLoading: true
      }
    case manufacturersConstants.DELETE_MANUFACTURERS_SUCCESS:
      return {
        ...state, isLoading: false
      }
    case manufacturersConstants.DELETE_MANUFACTURERS_FAILURE:
      return {
        ...state, error: action.payload
      }
    case manufacturersConstants.UPDATE_MANUFACTURERS_REQUEST:
      return {
        ...state, isLoading: true
      }
    case manufacturersConstants.UPDATE_MANUFACTURERS_SUCCESS:
      return {
        ...state, isLoading: false
      }
    case manufacturersConstants.UPDATE_MANUFACTURERS_FAILURE:
      return {
        ...state, error: action.payload
      }
    case manufacturersConstants.CREATE_MANUFACTURERS_REQUEST:
      return {
        ...state
      }
    case manufacturersConstants.CREATE_MANUFACTURERS_SUCCESS:
      return {
        ...state, isLoading: false, data: action.payload
      }
    case manufacturersConstants.CREATE_MANUFACTURERS_FAILURE:
      return {
        ...state, error: action.payload
      }
    case manufacturersConstants.UPDATE_MANUFACTURERS_TRIGGERS_REQUEST:
      return {
        ...state, isLoading: true
      }
    case manufacturersConstants.UPDATE_MANUFACTURERS_TRIGGERS_SUCCESS:
      return {
        ...state, isLoading: false
      }
    case manufacturersConstants.UPDATE_MANUFACTURERS_TRIGGERS_FAILURE:
      return {
        ...state, error: action.payload
      }
    default:
      return state
  }
}
