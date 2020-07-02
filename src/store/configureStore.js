import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {routerMiddleware, connectRouter} from 'connected-react-router';
import * as SideMenu from "./reducers/SideMenu";
import * as SearchStore from "./reducers/SearchStore";
import registrationReducer from './reducers/registration';
import authenticationReducer from './reducers/authentication';
import employeesReducer from './reducers/settings/employees';
import manufacturersReducer from './reducers/settings/manufacturers';
import devicesReducer from './reducers/settings/devices';
import colorsReducer from './reducers/settings/colors';
import vendorsReducer from './reducers/settings/vendors';
import physicalLocationsReducer from './reducers/settings/physicalLocations';
import repairCategoriesReducer from './reducers/settings/repairCategories';
import productCategoriesReducer from './reducers/settings/productCategories';
import clientsReducer from './reducers/settings/clients';
import taxesReducer from './reducers/settings/taxes';
import inventoryReducer from './reducers/settings/inventory';
import quotesReducer from './reducers/settings/quotes';
import jobsReducer from './reducers/settings/jobs';

export default function configureStore(history, initialState) {
  const reducers = {
    sideMenu: SideMenu.reducer,
    searchStore: SearchStore.reducer,
    registration: registrationReducer,
    authentication: authenticationReducer,
    employees: employeesReducer,
    manufacturers: manufacturersReducer,
    devices: devicesReducer,
    colors: colorsReducer,
    vendors: vendorsReducer,
    physicalLocations: physicalLocationsReducer,
    repairCategories: repairCategoriesReducer,
    productCategories: productCategoriesReducer,
    clients: clientsReducer,
    taxes: taxesReducer,
    inventory: inventoryReducer,
    quotes: quotesReducer,
    jobs: jobsReducer,
  };

  const middleware = [
    thunk,
    routerMiddleware(history),
    logger
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const rootReducer = combineReducers({
    ...reducers,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
