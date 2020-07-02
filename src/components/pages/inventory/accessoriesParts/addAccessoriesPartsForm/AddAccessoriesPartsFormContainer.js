import React, { useContext } from 'react';
import AddAccessoriesPartsForm from './AddAccessoriesPartsForm';
import SidePanelContext from '../../../../extension/SidePanelContext';

const AddAccessoriesPartsFormContainer = props => {

  const sidePanelContext = useContext(SidePanelContext);

  return (
    <AddAccessoriesPartsForm data={{
      sidePanelContext
    }} />
  )
}

export default AddAccessoriesPartsFormContainer;
