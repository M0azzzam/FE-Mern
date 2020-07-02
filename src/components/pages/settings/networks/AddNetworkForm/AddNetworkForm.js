import React from 'react';
import {
  Segment,
  Grid,
  Icon,
  Container,
  Button,
  Form,
  Input,
} from 'semantic-ui-react';
import DropzoneComponent from 'react-dropzone-component';

const AddNetworkForm = props => {
  const {
    sidePanelContext,
    djsConfig,
    componentConfig,
    eventHandlers
  } = props.data || {};

  return (
    <>
      <Segment color='blue' raised className='radiusless borderless'>
        <Grid>
          <Grid.Row className='paddingless marginless'>
            <Grid.Column width={16} className='paddingless'>
              <Container style={{ lineHeight: '36px', width: '100%' }}>Add a new Network</Container>
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
              id='form-input-control-network'
              control={Input}
              label='Network'
              width={8}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Field width={8}>
              <label>Upload Picture (2MB)</label>
              <DropzoneComponent config={componentConfig}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    </>
  )
}

export default AddNetworkForm;
