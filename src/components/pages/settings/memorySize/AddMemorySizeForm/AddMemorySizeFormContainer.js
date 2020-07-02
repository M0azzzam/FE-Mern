import React, { useContext } from 'react';
import AddMemorySizeForm from './AddMemorySizeForm';
import SidePanelContext from '../../../../extension/SidePanelContext';

const AddMemorySizeFormContainer = () => {

  const sidePanelContext = useContext(SidePanelContext);

  return (
    <AddMemorySizeForm data={{
      sidePanelContext
    }} />
  )
}

export default AddMemorySizeFormContainer;
