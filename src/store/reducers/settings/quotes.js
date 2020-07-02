import { quoteConstants } from '../../actions/settings/quotes';

const initialState = {
  error: null,
  isLoading: false,
  isUpdating: false,
  data: [],
  meta: {},
  quote: {},
  quoteId: {
    isLoading: false,
    id: null
  }
};

export default function quotes(state = initialState, action) {
  switch (action.type) {
    case quoteConstants.GET_QUOTES_REQUEST:
      return {
        ...state, isLoading: true
      }
    case quoteConstants.GET_QUOTES_SUCCESS:
      const { data, ...rest } = action.payload;
      return {
        ...state, data, meta: rest, isLoading: false
      }
    case quoteConstants.GET_QUOTES_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    case quoteConstants.GET_QUOTE_REQUEST:
      return {
        ...state, isLoading: true
      }
    case quoteConstants.GET_QUOTE_SUCCESS:
      return {
        ...state, quote: action.payload, isLoading: false
      }
    case quoteConstants.GET_QUOTE_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    case quoteConstants.GET_QUOTE_ID_REQUEST:
      return {
        ...state, quoteId: { ...state.quoteId, isLoading: true }
      }
    case quoteConstants.GET_QUOTE_ID_SUCCESS:
      return {
        ...state, quoteId: { ...state.quoteId, isLoading: false, id: action.payload }
      }
    case quoteConstants.GET_QUOTE_ID_FAILURE:
      return {
        ...state, quoteId: { ...state.quoteId, isLoading: false }, error: action.payload
      }
    case quoteConstants.CREATE_QUOTE_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case quoteConstants.CREATE_QUOTE_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case quoteConstants.CREATE_QUOTE_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case quoteConstants.UPDATE_QUOTE_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case quoteConstants.UPDATE_QUOTE_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case quoteConstants.UPDATE_QUOTE_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case quoteConstants.UPDATE_QUOTE_STATUS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case quoteConstants.UPDATE_QUOTE_STATUS_SUCCESS:
      const _data = state.data.map((d) => {
        if (d._id === action.payload._id) {
          d.status = action.payload.status;
        }
        return d;
      });
      return {
        ...state, isUpdating: false, data: _data
      }
    case quoteConstants.UPDATE_QUOTE_STATUS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case quoteConstants.DELETE_QUOTES_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case quoteConstants.DELETE_QUOTES_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case quoteConstants.DELETE_QUOTES_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    default:
      return state;
  }
}
