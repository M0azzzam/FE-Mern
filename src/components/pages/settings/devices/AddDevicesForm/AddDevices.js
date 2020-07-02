import React from 'react';
import {
  Segment,
  Grid,
  Icon,
  Container,
  Button,
  Form,
  Select,
  Input,
  Checkbox,
  Sticky
} from 'semantic-ui-react';
import DropzoneComponent from 'react-dropzone-component';

const AddDevices = props => {
  const {
    sidePanelContext,
    djsConfig,
    componentConfig,
    eventHandlers,
    handleInputChange,
    handleTriggers,
    handleSelectGroups,
    manufacturerOptions,
    colorOptions,
    data,
    save,
    IS_UPDATING,
    manufacturersLoading
  } = props.data || {};

  return (
    <Container fluid style={{ height: '100vh', overflow: 'auto', padding: 0 }}>
      <Sticky>
        <Segment color='blue' raised className='radiusless borderless'>
          <Grid>
            <Grid.Row className='paddingless marginless'>
              <Grid.Column width={16} className='paddingless'>
                <Container style={{ lineHeight: '36px', width: '100%' }}>{IS_UPDATING ? 'Update Device' : 'Add A New Device'}</Container>
                <div className='sidebar-action-buttons'>
                  <Button positive className='radiusless' onClick={() => save(data)}><Icon name='save' /> Save</Button>
                  <Button negative className='radiusless marginless' onClick={() => sidePanelContext.hide()}><Icon name='cancel' /> Close</Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Sticky>
      <Segment loading={manufacturersLoading} basic className='marginless radiusless borderless'>
        <Form>
          <Form.Group>
            <Form.Field
              id='form-input-control-device-name'
              control={Input}
              label='Device'
              required
              width={8}
              name='name'
              value={data.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Select}
              options={manufacturerOptions}
              label={{ children: 'Manufacturer', htmlFor: 'form-select-control-manufacturer' }}
              placeholder='Manufacturer'
              search
              searchInput={{ id: 'form-select-control-manufacturer' }}
              required
              value={data.manufacturer}
              name='manufacturer'
              onChange={(...params) => handleSelectGroups(params)}
            />
            <Form.Field
              control={Select}
              options={colorOptions}
              label={{ children: 'Colors', htmlFor: 'form-select-control-colors' }}
              placeholder='Select Some options'
              search
              searchInput={{ id: 'form-select-control-colors' }}
              value={data.colors}
              name='colors'
              multiple
              onChange={(...params) => handleSelectGroups(params)}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-onSite'
              control={Input}
              label='On Site Repair Additional Price'
              defaultValue='0.0'
            />
            <Form.Field
              id='form-input-control-onPickUp'
              control={Input}
              label='Pick Up Repair Additional Price'
              defaultValue='0.0'
            />
          </Form.Group>
          <Form.Group>
            <Form.Field width={4}>
              <label>Show on POS</label>
            </Form.Field>
            <Form.Field width={4}>
              <Checkbox name='onPOS' checked={data.triggers.onPOS} onChange={(event, data) => handleTriggers(data)} />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={4}>
              <label>Show on Widget</label>
            </Form.Field>
            <Form.Field width={4}>
              <Checkbox name='onWidget' checked={data.triggers.onWidget} onChange={(event, data) => handleTriggers(data)} />
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
        </Form>
      </Segment>
    </Container>
  )
}

export default AddDevices;
