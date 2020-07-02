import React from 'react';
import { Segment, Button, Icon, Grid, Container, Tab } from 'semantic-ui-react';
import ProductInfo from './subComponents/ProductInfo';
import StockInfo from './subComponents/StockInfo';
import PricesInfo from './subComponents/PricesInfo';

const tabs = [
  { menuItem: 'Product Info', render: () => <Tab.Pane attached={false}><ProductInfo /></Tab.Pane> },
  { menuItem: 'Stock', render: () => <Tab.Pane attached={false}><StockInfo /></Tab.Pane> },
  { menuItem: 'Prices', render: () => <Tab.Pane attached={false}><PricesInfo /></Tab.Pane> },
]

const AddAccessoriesPartsForm = props => {

  const { sidePanelContext } = props.data || {};

  return (
    <>
      <Segment color='blue' raised className='radiusless borderless'>
        <Grid>
          <Grid.Row className='paddingless marginless'>
            <Grid.Column width={16} className='paddingless'>
              <Container style={{ lineHeight: '36px', width: '100%' }}>Add Mobile, Accessories &amp; Parts Details</Container>
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
  );
}

export default AddAccessoriesPartsForm;
