import * as quoteServices from '../../../services/quotes';
import history from '../../../history';

export const quoteConstants = {
  GET_QUOTES_REQUEST: 'GET_QUOTES_REQUEST',
  GET_QUOTES_SUCCESS: 'GET_QUOTES_SUCCESS',
  GET_QUOTES_FAILURE: 'GET_QUOTES_FAILURE',

  GET_QUOTE_REQUEST: 'GET_QUOTE_REQUEST',
  GET_QUOTE_SUCCESS: 'GET_QUOTE_SUCCESS',
  GET_QUOTE_FAILURE: 'GET_QUOTE_FAILURE',

  CREATE_QUOTE_REQUEST: 'CREATE_QUOTE_REQUEST',
  CREATE_QUOTE_SUCCESS: 'CREATE_QUOTE_SUCCESS',
  CREATE_QUOTE_FAILURE: 'CREATE_QUOTE_FAILURE',

  UPDATE_QUOTE_REQUEST: 'UPDATE_QUOTE_REQUEST',
  UPDATE_QUOTE_SUCCESS: 'UPDATE_QUOTE_SUCCESS',
  UPDATE_QUOTE_FAILURE: 'UPDATE_QUOTE_FAILURE',

  UPDATE_QUOTE_STATUS_REQUEST: 'UPDATE_QUOTE_STATUS_REQUEST',
  UPDATE_QUOTE_STATUS_SUCCESS: 'UPDATE_QUOTE_STATUS_SUCCESS',
  UPDATE_QUOTE_STATUS_FAILURE: 'UPDATE_QUOTE_STATUS_FAILURE',

  DELETE_QUOTES_REQUEST: 'DELETE_QUOTES_REQUEST',
  DELETE_QUOTES_SUCCESS: 'DELETE_QUOTES_SUCCESS',
  DELETE_QUOTES_FAILURE: 'DELETE_QUOTES_FAILURE',

  GET_QUOTE_ID_REQUEST: 'GET_QUOTE_ID_REQUEST',
  GET_QUOTE_ID_SUCCESS: 'GET_QUOTE_ID_SUCCESS',
  GET_QUOTE_ID_FAILURE: 'GET_QUOTE_ID_FAILURE',
}

export const quoteActions = {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  getQuoteId,
  updateQuoteStatus
};

function getQuotes(data) {
  const { limit, page, status, customerId, dateTo, dateFrom, text, sort } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await quoteServices.getQuotes({ params: { limit, page, status, customerId, dateTo, dateFrom, text, sort } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: quoteConstants.GET_QUOTES_REQUEST }
  }

  function success(data) {
    return { type: quoteConstants.GET_QUOTES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: quoteConstants.GET_QUOTES_FAILURE, payload: error }
  }
}

function getQuote(data) {
  const { id } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await quoteServices.getQuote({ params: { id } });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: quoteConstants.GET_QUOTE_REQUEST }
  }

  function success(data) {
    return { type: quoteConstants.GET_QUOTE_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: quoteConstants.GET_QUOTE_FAILURE, payload: error }
  }
}

function getQuoteId() {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await quoteServices.getQuoteId();

      dispatch(success(result.data.data.estimateId));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: quoteConstants.GET_QUOTE_ID_REQUEST }
  }

  function success(data) {
    return { type: quoteConstants.GET_QUOTE_ID_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: quoteConstants.GET_QUOTE_ID_FAILURE, payload: error }
  }
}

function createQuote(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await quoteServices.createQuote(data);

      await dispatch(success(result.data.data));

      history.push(`./view/${result.data.data._id}`)
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: quoteConstants.CREATE_QUOTE_REQUEST }
  }

  function success(data) {
    return { type: quoteConstants.CREATE_QUOTE_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: quoteConstants.CREATE_QUOTE_FAILURE, payload: error }
  }
}

function updateQuote(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await quoteServices.updateQuote(data);

      dispatch(success(result.data.data));
      history.push(`../view/${result.data.data._id}`)
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: quoteConstants.UPDATE_QUOTE_REQUEST }
  }

  function success(data) {
    return { type: quoteConstants.UPDATE_QUOTE_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: quoteConstants.UPDATE_QUOTE_FAILURE, payload: error }
  }
}

function updateQuoteStatus(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await quoteServices.updateQuoteStatus(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: quoteConstants.UPDATE_QUOTE_STATUS_REQUEST }
  }

  function success(data) {
    return { type: quoteConstants.UPDATE_QUOTE_STATUS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: quoteConstants.UPDATE_QUOTE_STATUS_FAILURE, payload: error }
  }
}

function deleteQuote(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await quoteServices.deleteQuote({ id: data });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: quoteConstants.DELETE_QUOTES_REQUEST }
  }

  function success(data) {
    return { type: quoteConstants.DELETE_QUOTES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: quoteConstants.DELETE_QUOTES_FAILURE, payload: error }
  }
}
