import React, { useContext } from 'react';
import ManageServices from './ManageServices';
import SidePanelContext from '../../../extension/SidePanelContext';
import AddRepairFormContainer from './AddRepairForm';

const ManageServicesContainer = () => {
  const sidePanelContext = useContext(SidePanelContext);

  const handleAddProduct = () => {
    sidePanelContext.setData({ Component: AddRepairFormContainer, data: {}, sidebarConfig: { width: 960 } });
  }

  return (
    <ManageServices data={{
      handleAddProduct
    }} />
  )
}

export default ManageServicesContainer;
