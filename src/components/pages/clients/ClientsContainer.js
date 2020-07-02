import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Clients from './Clients';
import SidePanelContext from '../../extension/SidePanelContext';
import AddClientFormContainer from './addClientsForm';
import { clientActions } from '../../../store/actions/settings/clients';
import Toast from '../../extension/Toast';
import { pagination } from '../../../config/config';

const ClientsContainer = props => {

  const { dispatch, clients, isLoading, meta } = props;
  const sidePanelContext = useContext(SidePanelContext);
  const [limit, setLimit] = useState(pagination && pagination.limit);
  const [pageOptions] = useState(pagination && pagination.list);
  const [page] = useState(1);

  useEffect(() => {
    dispatch(clientActions.getClients({ page, limit }));
  }, [])

  const handleAddClient = () => {
    sidePanelContext.setData({ Component: AddClientFormContainer, data: {}, sidebarConfig: { width: 700 } });
  }

  const handleUpdateClient = (data) => {
    sidePanelContext.setData({ Component: AddClientFormContainer, data: { ...data, IS_UPDATING: true, meta }, sidebarConfig: { width: 700 } });
  }

  const handleDeleteClient = async (data) => {
    const client = [data._id];
    try {
      await dispatch(clientActions.deleteClient(client));

      Toast('Delete Client', `Client ${data.firstName} deleted successfully`, 'success');
      dispatch(clientActions.getClients(meta));
    } catch (err) {
      Toast('Delete Client', `Client ${data.firstName} could not be deleted. Please retry!`, 'danger');
    }
  }

  const handleKeyUp = (e) => {
    let value = parseInt(e.target.value)
    if (e.keyCode === 13 && value <= meta.totalPages && value !== meta.page) {
      dispatch(clientActions.getClients({ page: value, limit }));
      e.target.value = '';
    } else if (e.keyCode === 13) {
      e.target.value = '';
    }
  }

  const handleOnPaginationChange = data => {
    dispatch(clientActions.getClients({ page: data[1].activePage, limit }));
  }

  const handleItemsPerPage = data => {
    setLimit(data.value);
    dispatch(clientActions.getClients({ page: 1, limit: data.value }));
  }

  return (
    <Clients data={{
      handleAddClient,
      handleUpdateClient,
      handleDeleteClient,
      handleKeyUp,
      handleOnPaginationChange,
      handleItemsPerPage,
      clients,
      isLoading,
      pageOptions,
      meta
    }} />
  )
}

const mapStateToProps = state => ({
  clients: state.clients.data,
  isLoading: state.clients.isLoading,
  meta: state.clients.meta
})

export default connect(mapStateToProps)(ClientsContainer);
