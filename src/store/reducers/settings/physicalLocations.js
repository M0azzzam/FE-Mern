import { physicalLocationsConstants } from '../../actions/settings/physicalLocations';

const initialState = {
  error: null,
  isLoading: false,
  isUpdating: false,
  data: [],
  meta: {}
};

export default function physicalLocations(state = initialState, action) {
  switch (action.type) {
    case physicalLocationsConstants.GET_PHYSICAL_LOCATIONS_REQUEST:
      return {
        ...state, isLoading: true
      }
    case physicalLocationsConstants.GET_PHYSICAL_LOCATIONS_SUCCESS:
      const { data, ...rest } = action.payload;
      return {
        ...state, data, meta: rest, isLoading: false
      }
    case physicalLocationsConstants.GET_PHYSICAL_LOCATIONS_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    case physicalLocationsConstants.CREATE_PHYSICAL_LOCATIONS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case physicalLocationsConstants.CREATE_PHYSICAL_LOCATIONS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case physicalLocationsConstants.CREATE_PHYSICAL_LOCATIONS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case physicalLocationsConstants.UPDATE_PHYSICAL_LOCATIONS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case physicalLocationsConstants.UPDATE_PHYSICAL_LOCATIONS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case physicalLocationsConstants.UPDATE_PHYSICAL_LOCATIONS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case physicalLocationsConstants.DELETE_PHYSICAL_LOCATIONS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case physicalLocationsConstants.DELETE_PHYSICAL_LOCATIONS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case physicalLocationsConstants.DELETE_PHYSICAL_LOCATIONS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    default:
      return state;
  }
}
