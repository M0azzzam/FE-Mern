import React from 'react';
import {
  Segment,
  Grid,
  Icon,
  Container,
  Button,
  Form,
  Checkbox,
  Sticky
} from 'semantic-ui-react';
import DropzoneComponent from 'react-dropzone-component';

const AddManufacturer = props => {
  const {
    sidePanelContext,
    djsConfig,
    componentConfig,
    eventHandlers,
    onInputChange,
    handleTrigger,
    save,
    data,
    isUpdating
  } = props.data || {};

  return (
    <Container fluid style={{ height: '100vh', overflow: 'auto', padding: 0 }}>
      <Sticky>
        <Segment color='blue' raised className='radiusless borderless'>
          <Grid>
            <Grid.Row className='paddingless marginless'>
              <Grid.Column width={16} className='paddingless'>
                <Container style={{ lineHeight: '36px', width: '100%' }}>{isUpdating ? 'Update Manufacturer' : 'Create Manufacturer'}</Container>
                <div className='sidebar-action-buttons'>
                  <Button positive className='radiusless' onClick={() => save(data)} ><Icon name='save' /> Save</Button>
                  <Button negative className='radiusless marginless' onClick={() => sidePanelContext.hide()}><Icon name='cancel' /> Close</Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Sticky>

      <Segment basic className='marginless radiusless borderless'>
        <Form>
          <Form.Group>
            <Form.Field width={8} required>
              <label>Manufacturer Name</label>
              <input name='name' value={data.name} onChange={onInputChange} />
            </Form.Field>
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
          <Form.Group>
            <Form.Field width={4}>
              <label>Show On POS</label>
            </Form.Field>
            <Form.Field style={{ margin: 2 }}>
              <Checkbox name='onPOS' checked={data.triggers.onPOS} onChange={(event, data) => handleTrigger(data)} />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={4}>
              <label>Show On Widget</label>
            </Form.Field>
            <Form.Field style={{ margin: 2 }}>
              <Checkbox name='onWidget' checked={data.triggers.onWidget} onChange={(event, data) => handleTrigger(data)} />
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    </Container>
  )
}

export default AddManufacturer;
