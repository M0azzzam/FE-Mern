import React from 'react';
import { Segment, Grid, Container, Button, Icon, Tab } from 'semantic-ui-react';
import ProductInfo from './subComponents/ProductInfo';
import PricesInfo from './subComponents/PricesInfo';
import TriggerInfo from './subComponents/TriggerInfo';

const AddRepairForm = (props) => {
  const { sidePanelContext, componentConfig, eventHandlers, djsConfig, handleCommission, commission } = props.data || {};

  const tabs = [
    { menuItem: 'Product Info', render: () => <Tab.Pane attached={false}><ProductInfo data={{ componentConfig, eventHandlers, djsConfig }} /></Tab.Pane> },
    { menuItem: 'Prices', render: () => <Tab.Pane attached={false}><PricesInfo data={{ handleCommission, commission }} /></Tab.Pane> },
    { menuItem: 'Trigger', render: () => <Tab.Pane attached={false}><TriggerInfo /></Tab.Pane> }
  ];

  return (
    <>
      <Segment color='blue' raised className='radiusless borderless'>
        <Grid>
          <Grid.Row className='paddingless marginless'>
            <Grid.Column width={16} className='paddingless'>
              <Container style={{ lineHeight: '36px', width: '100%' }}>Add Repair Details</Container>
              <div className='sidebar-action-buttons'>
                <Button positive className='radiusless'><Icon name='save' /> Save</Button>
                <Button negative className='radiusless marginless' onClick={() => sidePanelContext.hide()}><Icon name='cancel' /> Close</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment basic className='marginless radiusless borderless'>
        <Tab menu={{ secondary: true, pointing: true, color: 'blue' }} panes={tabs} />
      </Segment>
    </>
  )
}

export default AddRepairForm;
