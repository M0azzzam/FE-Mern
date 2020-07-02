import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import Layout from '../layout/Layout';
import SettingsLayout from '../layout/SettingsLayout';
import Home from '../pages/Home';
import AuthRoute from '../extension/AuthRoute';
import NotFound from '../pages/NotFound';
import Signup from '../pages/signup/Singup';
import Login from '../pages/login/Login';
import Onboarding from '../pages/onboarding/Onboarding';
import StoreConfiguration from '../pages/onboarding/StoreConfiguration';
import PendingApproval from '../pages/onboarding/PendingApproval';
import ManageEmployees from '../pages/settings/ManageEmployees';
import ManageRoles from '../pages/settings/ManageRoles';
import UpdateUserProfile from '../pages/settings/UpdateUserProfile';
import UpdateUserPassword from '../pages/settings/UpdateUserPassword';
import StoreGeneralSettings from '../pages/settings/store/StoreGeneralSettings';
import ManageStores from '../pages/settings/store/ManageStores';
import AccessoriesPartsContainer from '../pages/inventory/accessoriesParts';
import TradeInContainer from '../pages/inventory/tradeIn';
import ManageManufacturerContainer from '../pages/settings/manufacturer';
import ManageDevicesContainer from '../pages/settings/devices';
import ManageProductCategoriesContainer from '../pages/settings/productCategories';
import ManageServicesContainer from '../pages/inventory/services';
import ManageRepairCategoriesContainer from '../pages/settings/repairCategories';
import InventorySettingsContainer from '../pages/settings/inventory';
import PointOfSaleSettingsContainer from '../pages/settings/pointOfSale';
import ManageDeviceColorsContainer from '../pages/settings/colors';
import ManagePhysicalLocationsContainer from '../pages/settings/physicalLocations';
import ManageMemorySizeContainer from '../pages/settings/memorySize';
import ManageNetworksContainer from '../pages/settings/networks';
import ManageVendorsContainer from '../pages/settings/vendors';
import ClientsContainer from '../pages/clients';
import ManageTaxesContainer from '../pages/settings/taxes';
import QuotesContainer from '../pages/quotes';
import AddQuoteFormContainer from '../pages/quotes/addQuoteForm';
import AddJobFormContainer from '../pages/jobs/addJobForm';
import ViewQuoteContainer from '../pages/quotes/viewQuote';
import JobsContainer from "../pages/jobs/JobsContainer";

const SettingsWrap = ({ match }) => (
  <Switch>
    <Route exact path='/app/settings' render={() => <Redirect to={`${match.url}/store/general_settings`} />} />
    <Route exact path={`${match.url}/employees`} component={ManageEmployees} />
    <Route exact path={`${match.url}/employees/manage_roles`} component={ManageRoles} />
    <Route exact path={`${match.url}/profile/edit`} component={UpdateUserProfile} />
    <Route exact path={`${match.url}/profile/update_password`} component={UpdateUserPassword} />
    <Route exact path={`${match.url}/store/general_settings`} component={StoreGeneralSettings} />
    <Route exact path={`${match.url}/store/manage_stores`} component={ManageStores} />
    <Route exact path={`${match.url}/manufacturer`} component={ManageManufacturerContainer} />
    <Route exact path={`${match.url}/devices`} component={ManageDevicesContainer} />
    <Route exact path={`${match.url}/product/categories`} component={ManageProductCategoriesContainer} />
    <Route exact path={`${match.url}/inventory`} component={InventorySettingsContainer} />
    <Route exact path={`${match.url}/pos`} component={PointOfSaleSettingsContainer} />
    <Route exact path={`${match.url}/device/colors`} component={ManageDeviceColorsContainer} />
    <Route exact path={`${match.url}/physical_locations`} component={ManagePhysicalLocationsContainer} />
    <Route exact path={`${match.url}/device/memory_size`} component={ManageMemorySizeContainer} />
    <Route exact path={`${match.url}/networks`} component={ManageNetworksContainer} />
    <Route exact path={`${match.url}/vendors`} component={ManageVendorsContainer} />
    <Route exact path={`${match.url}/repair/categories`} component={ManageRepairCategoriesContainer} />
    <Route exact path={`${match.url}/taxes`} component={ManageTaxesContainer} />
    <Route render={() => <NotFound />} />
  </Switch>
)

const AppWrap = ({ match }) => (
  <Switch>
    <Route exact path='/app' render={() => <Redirect to={`${match.url}/dashboard`} />} />
    <Route path={`${match.url}/dashboard`} component={Home} />
    <Route path={`${match.url}/manage_invoices`} render={() => <h1>Manage Invoice</h1>} />
    <Route path={`${match.url}/inventory/accessories`} component={AccessoriesPartsContainer} />
    <Route path={`${match.url}/inventory/trade_in`} component={TradeInContainer} />
    <Route path={`${match.url}/repairs`} component={ManageServicesContainer} />
    <Route path={`${match.url}/clients/people`} component={ClientsContainer} />
    <Route exact path={`${match.url}/work/quotes`} component={QuotesContainer} />
    <Route exact path={`${match.url}/work/quotes/view/:id`} component={ViewQuoteContainer} />
    <Route exact path={`${match.url}/work/quotes/add`} component={() => <AddQuoteFormContainer />} />
    <Route path={`${match.url}/work/quotes/edit/:id`} component={() => <AddQuoteFormContainer IS_UPDATING={true} />} />
    <Route exact path={`${match.url}/work/jobs`} component={JobsContainer} />
    <Route exact path={`${match.url}/work/jobs/add`} component={() => <AddJobFormContainer />} />
    <AuthRoute path={`${match.url}/settings`} component={SettingsWrap} layout={SettingsLayout} />
    <Route render={() => <NotFound />} />
  </Switch>
)

let firstRender = true;

const AppIndex = (props) => {
  if (props.user.signingIn && firstRender) {
    firstRender = false;
    return '';
  }

  return (
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route exact path='/' render={() => <Redirect to='/app/dashboard' />} />
      <Route exact path='/onboarding/pending_approval' component={PendingApproval} />
      <Route exact path='/onboarding/store_configuration' component={StoreConfiguration} />
      <AuthRoute path='/onboarding' component={Onboarding} />
      <AuthRoute path='/app' component={AppWrap} layout={Layout} />
      <Route render={() => <NotFound />} />
    </Switch>
  )
};

export default connect(state => ({
  user: state.authentication
}))(AppIndex);
