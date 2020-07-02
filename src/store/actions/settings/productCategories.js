import * as productCategoriesServices from '../../../services/productCategories';

export const productCategoriesConstants = {
  GET_PRODUCT_CATEGORIES_REQUEST: 'GET_PRODUCT_CATEGORIES_REQUEST',
  GET_PRODUCT_CATEGORIES_SUCCESS: 'GET_PRODUCT_CATEGORIES_SUCCESS',
  GET_PRODUCT_CATEGORIES_FAILURE: 'GET_PRODUCT_CATEGORIES_FAILURE',

  CREATE_PRODUCT_CATEGORIES_REQUEST: 'CREATE_PRODUCT_CATEGORIES_REQUEST',
  CREATE_PRODUCT_CATEGORIES_SUCCESS: 'CREATE_PRODUCT_CATEGORIES_SUCCESS',
  CREATE_PRODUCT_CATEGORIES_FAILURE: 'CREATE_PRODUCT_CATEGORIES_FAILURE',

  UPDATE_PRODUCT_CATEGORIES_REQUEST: 'UPDATE_PRODUCT_CATEGORIES_REQUEST',
  UPDATE_PRODUCT_CATEGORIES_SUCCESS: 'UPDATE_PRODUCT_CATEGORIES_SUCCESS',
  UPDATE_PRODUCT_CATEGORIES_FAILURE: 'UPDATE_PRODUCT_CATEGORIES_FAILURE',

  DELETE_PRODUCT_CATEGORIES_REQUEST: 'DELETE_PRODUCT_CATEGORIES_REQUEST',
  DELETE_PRODUCT_CATEGORIES_SUCCESS: 'DELETE_PRODUCT_CATEGORIES_SUCCESS',
  DELETE_PRODUCT_CATEGORIES_FAILURE: 'DELETE_PRODUCT_CATEGORIES_FAILURE',
}

export const productCategoriesActions = {
  getProductCategories,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory
};

function getProductCategories(data) {
  const { limit, page } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await productCategoriesServices.getProductCategories({ params: { limit, page } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: productCategoriesConstants.GET_PRODUCT_CATEGORIES_REQUEST }
  }

  function success(data) {
    return { type: productCategoriesConstants.GET_PRODUCT_CATEGORIES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: productCategoriesConstants.GET_PRODUCT_CATEGORIES_FAILURE, payload: error }
  }
}

function createProductCategory(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await productCategoriesServices.createProductCategory(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: productCategoriesConstants.CREATE_PRODUCT_CATEGORIES_REQUEST }
  }

  function success(data) {
    return { type: productCategoriesConstants.CREATE_PRODUCT_CATEGORIES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: productCategoriesConstants.CREATE_PRODUCT_CATEGORIES_FAILURE, payload: error }
  }
}

function updateProductCategory(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await productCategoriesServices.updateProductCategory(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: productCategoriesConstants.UPDATE_PRODUCT_CATEGORIES_REQUEST }
  }

  function success(data) {
    return { type: productCategoriesConstants.UPDATE_PRODUCT_CATEGORIES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: productCategoriesConstants.UPDATE_PRODUCT_CATEGORIES_FAILURE, payload: error }
  }
}

function deleteProductCategory(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await productCategoriesServices.deleteProductCategory({ id: data });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: productCategoriesConstants.DELETE_PRODUCT_CATEGORIES_REQUEST }
  }

  function success(data) {
    return { type: productCategoriesConstants.DELETE_PRODUCT_CATEGORIES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: productCategoriesConstants.DELETE_PRODUCT_CATEGORIES_FAILURE, payload: error }
  }
}
