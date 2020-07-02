import React, { useContext, useRef } from 'react';
import SidePanelContext from '../../../extension/SidePanelContext';
import AccessoriesParts from './AccessoriesParts';
import AddAccessoriesPartsFormContainer from './addAccessoriesPartsForm';

const AccessoriesPartsContainer = props => {

  const sidePanelContext = useContext(SidePanelContext);
  const gridApiRef = useRef();

  const handleAddItem = () => {
    sidePanelContext.setData({ Component: AddAccessoriesPartsFormContainer, data: {}, sidebarConfig: { width: 960 } });
  }

  return (
    <AccessoriesParts ref={gridApiRef} data={{
      handleAddItem
    }} />
  )
}

export default AccessoriesPartsContainer;
