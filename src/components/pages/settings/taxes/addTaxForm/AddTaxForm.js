import React from 'react';
import {
  Segment,
  Grid,
  Container,
  Button,
  Icon,
  Form,
  Input,
  Select,
  Checkbox,
  Sticky
} from 'semantic-ui-react';

const AddTaxForm = props => {

  const {
    sidePanelContext,
    handleInputChange,
    handleSelectGroup,
    handleCheckbox,
    save,
    data,
    IS_UPDATING,
    isUpdating,
    unitOptions
  } = props.data || {};

  return (
    <Container fluid className='c-side-panel-container'>
      <Sticky>
        <Segment raised className='radiusless borderless'>
          <Grid>
            <Grid.Row className='marginless c-side-panel-header'>
              <Grid.Column width={16} className='paddingless'>
                <Container style={{ lineHeight: '36px', width: '100%' }} className='c-side-panel-heading'>{IS_UPDATING ? 'Update' : 'Add'} Tax</Container>
                <div className='sidebar-action-buttons'>
                  <Icon size='large' className='c-side-panel-close-btn' fitted onClick={() => sidePanelContext.hide()}>&times;</Icon>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Sticky>
      <Segment loading={isUpdating} basic className='marginless radiusless borderless'>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-name'
              control={Input}
              label='Tax Class'
              onChange={handleInputChange}
              name='name'
              value={data.name}
              width={8}
              required
            />
            <Form.Field
              id='form-input-control-value'
              control={Input}
              label='Percentage'
              onChange={handleInputChange}
              name='value'
              value={data.value}
              width={8}
              required
            />
          </Form.Group>
          <Form.Group
            style={{ display: 'none' }}
          >
            <Form.Field
              control={Select}
              options={unitOptions}
              label={{ children: 'Unit', htmlFor: 'form-select-control-unit' }}
              placeholder='Select Unit'
              search
              searchInput={{ id: 'form-select-control-unit' }}
              name='unit'
              onChange={(...params) => handleSelectGroup(params)}
              value={data.unit}
              width={8}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <Checkbox label='Mark as default' name='default' onChange={(event, data) => handleCheckbox(data)} checked={data.default} />
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
      <div className='c-sticky-footer'>
        <Segment raised className='radiusless borderless c-side-panel-footer'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }} />
            <div >
              <Button color={IS_UPDATING ? 'blue' : 'green'} onClick={save}>{IS_UPDATING ? 'Update' : 'Create'} Tax </Button>
              <Button basic onClick={() => sidePanelContext.hide()}>Cancel</Button>
            </div>
          </div>
        </Segment>
      </div>
    </Container>
  )
}

export default AddTaxForm;
