import React from 'react';
import { Segment, Grid, Container, Button, Icon, Form, Input, Checkbox, Table } from 'semantic-ui-react';
import DropzoneComponent from 'react-dropzone-component';

const AddRepairCategoryForm = props => {

  const {
    sidePanelContext,
    componentConfig,
    eventHandlers,
    djsConfig,
    manufacturerOptions,
    manufacturerDevicesLoading,
    manufacturerDevicesList,
    handleInputChange,
    handleTriggers,
    handleAddRow,
    data,
    save,
    IS_UPDATING,
    tableRowList
  } = props.data || {};


  return (
    <Container fluid style={{ height: '100vh', overflow: 'auto', padding: 0 }}>
      <Segment color='blue' raised className='radiusless borderless'>
        <Grid>
          <Grid.Row className='paddingless marginless'>
            <Grid.Column width={16} className='paddingless'>
              <Container style={{ lineHeight: '36px', width: '100%' }}>{IS_UPDATING ? 'Update' : 'Add'} Repair Category</Container>
              <div className='sidebar-action-buttons'>
                <Button positive className='radiusless' onClick={save} ><Icon name='save' /> Save</Button>
                <Button negative className='radiusless marginless' onClick={() => sidePanelContext.hide()}><Icon name='cancel' /> Close</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment loading={manufacturerDevicesLoading} basic className='marginless radiusless borderless'>
        <Form>
          <Form.Group>
            <Form.Field
              control={Input}
              label='Name'
              required
              width={8}
              name='name'
              value={data.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          {(manufacturerOptions.length === 0 && !IS_UPDATING) && (
            <Segment attached basic className='marginless radiusless borderless'>
              <span style={{ color: 'red' }}><Icon disabled circular color='red' name='info' size='small' /> Please add manufacturers from manufacturer section</span>
            </Segment>)
          }
          <Table celled compact>
            <Table.Header fullWidth>
              <Table.Row>
                <Table.HeaderCell width={6}>Manufacturer <span style={{ color: 'red' }}>*</span></Table.HeaderCell>
                <Table.HeaderCell width={7}>Devices <span style={{ color: 'red' }}>*</span></Table.HeaderCell>
                <Table.HeaderCell width={3} />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tableRowList(manufacturerDevicesList)}
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan='4'>
                  <Button
                    floated='right'
                    icon
                    labelPosition='left'
                    primary
                    size='small'
                    onClick={handleAddRow}
                    disabled={(manufacturerOptions.length > 0 && manufacturerDevicesList.length < manufacturerOptions.length) ? false : true}
                  >
                    <Icon name='add' /> Add More
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Upload Picture (2MB)</label>
              <Form.Field>
              </Form.Field>
              <DropzoneComponent config={componentConfig}
                eventHandlers={eventHandlers}
                djsConfig={djsConfig}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={4}>
              <label>Show on POS</label>
            </Form.Field>
            <Form.Field width={4} style={{ margin: 2 }}>
              <Checkbox name='onPOS' checked={data.triggers.onPOS} onChange={(event, data) => handleTriggers(data)} />
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    </Container>
  )
}
export default AddRepairCategoryForm;
