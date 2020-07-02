import { inventoryConstants } from '../../actions/settings/inventory';

const initialState = {
  error: null,
  isLoading: false,
  isUpdating: false,
  data: [],
  inventoryItem: {},
  meta: {}
};

export default function inventory(state = initialState, action) {
  switch (action.type) {
    case inventoryConstants.GET_INVENTORY_REQUEST:
      return {
        ...state, isLoading: true
      }
    case inventoryConstants.GET_INVENTORY_SUCCESS:
      const { data, ...rest } = action.payload;
      return {
        ...state, data, meta: rest, isLoading: false
      }
    case inventoryConstants.GET_INVENTORY_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    case inventoryConstants.CREATE_INVENTORY_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case inventoryConstants.CREATE_INVENTORY_SUCCESS:
      return {
        ...state, isUpdating: false, inventoryItem: action.payload
      }
    case inventoryConstants.CREATE_INVENTORY_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case inventoryConstants.UPDATE_INVENTORY_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case inventoryConstants.UPDATE_INVENTORY_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case inventoryConstants.UPDATE_INVENTORY_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case inventoryConstants.DELETE_INVENTORY_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case inventoryConstants.DELETE_INVENTORY_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case inventoryConstants.DELETE_INVENTORY_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case inventoryConstants.SEARCH_INVENTORY_REQUEST:
      return {
        ...state, isLoading: true
      }
    case inventoryConstants.SEARCH_INVENTORY_SUCCESS:
      return {
        ...state, data: action.payload, isLoading: false
      }
    case inventoryConstants.SEARCH_INVENTORY_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    default:
      return state;
  }
}
