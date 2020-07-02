import React, { useContext } from 'react';
import SidePanelContext from '../../../../extension/SidePanelContext';
import AddTradeInForm from './AddTradeInForm';

const AddTradeInFormContainer = props => {

  const sidePanelContext = useContext(SidePanelContext);

  return (
    <AddTradeInForm data={{
      sidePanelContext
    }} />
  )
}

export default AddTradeInFormContainer;
