import React, { useContext } from 'react';
import ManageMemorySize from './ManageMemorySize';
import SidePanelContext from '../../../extension/SidePanelContext';
import AddMemorySizeFormContainer from './AddMemorySizeForm';

const ManageMemorySizeContainer = () => {

  const sidePanelContext = useContext(SidePanelContext);

  const handleAddItem = () => {
    sidePanelContext.setData({ Component: AddMemorySizeFormContainer, data: {}, sidebarConfig: { width: 500 } })
  }

  return (
    <ManageMemorySize data={{
      handleAddItem
    }}/>
  )
}

export default ManageMemorySizeContainer;
