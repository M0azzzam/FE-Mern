import React from 'react';
import {
  Container,
  Segment,
  Sticky,
  Grid,
  Button,
  Icon
} from 'semantic-ui-react';

const AddTradeInForm = props => {

  const { sidePanelContext } = props.data || {};

  return (
    <Container fluid style={{ height: '100vh', overflow: 'auto', padding: 0 }}>
      <Sticky>
        <Segment color='blue' raised className='radiusless borderless'>
          <Grid>
            <Grid.Row className='paddingless marginless'>
              <Grid.Column width={16} className='paddingless'>
                <Container style={{ lineHeight: '36px', width: '100%' }}>Add Trade In Purchase</Container>
                <div className='sidebar-action-buttons'>
                  <Button positive className='radiusless' onClick={() => { }} ><Icon name='save' /> Save</Button>
                  <Button negative className='radiusless marginless' onClick={() => sidePanelContext.hide()}><Icon name='cancel' /> Close</Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Sticky>
      <Segment basic className='marginless radiusless borderless'>
      </Segment>
    </Container>
  )
}

export default AddTradeInForm;
