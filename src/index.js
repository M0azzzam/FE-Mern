import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import configureStore from './store/configureStore';
import App from './components/layout/App';
import registerServiceWroker from './components/common/registerServiceWorker';
import history from './history';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'semantic-ui-css/semantic.min.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';
import './styles/index.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getUserProfile } from './services/users'
import { userConstants } from './store/actions/users'
import { checkAuth } from './utils/auth';
import { objectifyPermissions } from './utils/helpers';

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = window.initialReduxState;
const store = configureStore(history, initialState);

const getAuthenticatedUser = async () => {
  try {
    store.dispatch({ type: userConstants.LOGIN_REQUEST });
    const result = await getUserProfile();
    const user = result.data.data;
    if (user.role) {
      user.role.permissions = objectifyPermissions(user.role.permissions);
    }
    store.dispatch({ type: userConstants.LOGIN_SUCCESS, payload: user });
  } catch (err) {
    console.log('Error:LoadAuthenticateUserProfile', err.response || err);
    store.dispatch({ type: userConstants.LOGIN_FAILURE, payload: err.message });
    history.replace('/login')
  }
}

const authToken = checkAuth();
if (authToken) {
  getAuthenticatedUser();
}

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ReactNotification />
      <App />
    </ConnectedRouter>
  </Provider>,
  rootElement);

registerServiceWroker();
