import { productCategoriesConstants } from '../../actions/settings/productCategories';

const initialState = {
  error: null,
  isLoading: false,
  isUpdating: false,
  data: [],
  meta: {}
};

export default function productCategories(state = initialState, action) {
  switch (action.type) {
    case productCategoriesConstants.GET_PRODUCT_CATEGORIES_REQUEST:
      return {
        ...state, isLoading: true
      }
    case productCategoriesConstants.GET_PRODUCT_CATEGORIES_SUCCESS:
      const { data, ...rest } = action.payload;
      return {
        ...state, data, meta: rest, isLoading: false
      }
    case productCategoriesConstants.GET_PRODUCT_CATEGORIES_FAILURE:
      return {
        ...state, isLoading: false, data: [], error: action.payload
      }
    case productCategoriesConstants.CREATE_PRODUCT_CATEGORIES_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case productCategoriesConstants.CREATE_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case productCategoriesConstants.CREATE_PRODUCT_CATEGORIES_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case productCategoriesConstants.UPDATE_PRODUCT_CATEGORIES_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case productCategoriesConstants.UPDATE_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case productCategoriesConstants.UPDATE_PRODUCT_CATEGORIES_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    case productCategoriesConstants.DELETE_PRODUCT_CATEGORIES_REQUEST:
      return {
        ...state, isUpdating: true
      }
    case productCategoriesConstants.DELETE_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state, isUpdating: false
      }
    case productCategoriesConstants.DELETE_PRODUCT_CATEGORIES_FAILURE:
      return {
        ...state, error: action.payload, isUpdating: false
      }
    default:
      return state;
  }
}
