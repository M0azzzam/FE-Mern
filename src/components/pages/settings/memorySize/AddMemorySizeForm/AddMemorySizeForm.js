import React from 'react';
import { Segment, Grid, Container, Button, Icon, Form, Input } from 'semantic-ui-react';

const AddMemorySizeForm = props => {

  const { sidePanelContext } = props.data || {};

  return (
    <>
      <Segment color='blue' raised className='radiusless borderless'>
        <Grid>
          <Grid.Row className='paddingless marginless'>
            <Grid.Column width={16} className='paddingless'>
              <Container style={{ lineHeight: '36px', width: '100%' }}>Create Device Memory Size</Container>
              <div className='sidebar-action-buttons'>
                <Button positive className='radiusless'><Icon name='save' /> Save</Button>
                <Button negative className='radiusless marginless' onClick={() => sidePanelContext.hide()}><Icon name='cancel' /> Close</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment basic className='marginless radiusless borderless'>
        <Form>
          <Form.Group>
            <Form.Field
              control={Input}
              label='Size'
              width={8}
              required
            />
          </Form.Group>
        </Form>
      </Segment>
    </>
  )
}

export default AddMemorySizeForm;
