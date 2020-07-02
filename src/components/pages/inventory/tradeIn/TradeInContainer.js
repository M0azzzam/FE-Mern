import React, { useContext } from 'react';
import SidePanelContext from '../../../extension/SidePanelContext';
import TradeIn from './TradeIn';
import AddTradeInFormContainer from './addTradeInForm';

const TradeInContainer = props => {

  const sidePanelContext = useContext(SidePanelContext);

  const handleAddPurchase = () => {
    sidePanelContext.setData({ Component: AddTradeInFormContainer, data: {}, sidebarConfig: { width: 960 } });
  }

  return (
    <TradeIn data={{
      handleAddPurchase
    }} />
  )
}

export default TradeInContainer;
