import React, { useContext } from 'react';
import ManageNetworks from './ManageNetworks';
import AddNetworksContainerForm from './AddNetworkForm';
import SidePanelContext from '../../../extension/SidePanelContext';

const ManageNetworksContainer = () => {

  const sidePanelContext = useContext(SidePanelContext);

  const handleAddItem = () => {
    sidePanelContext.setData({ Component: AddNetworksContainerForm, data: {}, sidebarConfig: { width: 500 } })
  }

  return (
    <ManageNetworks data={{
      handleAddItem
    }} />
  )
}

export default ManageNetworksContainer;
