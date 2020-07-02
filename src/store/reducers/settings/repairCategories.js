import {
  repairCategoriesConstants
} from '../../actions/settings/repairCategories';

const initialState = {
  error: {},
  isLoading: false,
  isUpdating: false,
  data: [],
  meta: {}
}

export default function repairCategories(state = initialState, action) {
  switch (action.type) {
    case repairCategoriesConstants.GET_REPAIR_CATEGORIES_REQUEST:
      return {
        ...state, isLoading: true
      }
    case repairCategoriesConstants.GET_REPAIR_CATEGORIES_SUCCESS:
      const { data, ...rest } = action.payload
      return {
        ...state, isLoading: false, data, meta: rest,
      }
    case repairCategoriesConstants.GET_REPAIR_CATEGORIES_FAILURE:
      return {
        ...state, error: action.payload, isLoading: false
      }
    case repairCategoriesConstants.CREATE_REPAIR_CATEGORY_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case repairCategoriesConstants.CREATE_REPAIR_CATEGORY_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case repairCategoriesConstants.CREATE_REPAIR_CATEGORY_FAILURE:
      return {
        ...state, isUpdating: false, error: action.payload
      }
    case repairCategoriesConstants.UPDATE_REPAIR_CATEGORY_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case repairCategoriesConstants.UPDATE_REPAIR_CATEGORY_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case repairCategoriesConstants.UPDATE_REPAIR_CATEGORY_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case repairCategoriesConstants.DELETE_REPAIR_CATEGORIES_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case repairCategoriesConstants.DELETE_REPAIR_CATEGORIES_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case repairCategoriesConstants.DELETE_REPAIR_CATEGORIES_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case repairCategoriesConstants.UPDATE_REPAIR_CATEGORIES_TRIGGERS_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case repairCategoriesConstants.UPDATE_REPAIR_CATEGORIES_TRIGGERS_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case repairCategoriesConstants.UPDATE_REPAIR_CATEGORIES_TRIGGERS_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    default:
      return state
  }
}
