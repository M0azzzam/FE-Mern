import React from 'react';
import {
  Container,
  Sticky,
  Segment,
  Grid,
  Button,
  Icon,
  Form,
  Input,
  Select,
  TextArea,
  Checkbox
} from 'semantic-ui-react';

const AddInventoryForm = props => {

  const {
    sidePanelContext,
    handleInputChange,
    handleSelectGroup,
    handleCheckBox,
    save,
    IS_UPDATING,
    isUpdating,
    inventoryOptions,
    stockData,
    data,
    errors
  } = props.data || {};

  return (
    <Container fluid className='c-side-panel-container'>
      <Sticky>
        <Segment raised className='radiusless borderless'>
          <Grid>
            <Grid.Row className='marginless c-side-panel-header'>
              <Grid.Column width={16} className='paddingless'>
                <Container style={{ lineHeight: '36px', width: '100%' }} className='c-side-panel-heading'>{IS_UPDATING ? 'Update' : 'Add'} {data.type}</Container>
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
          <Form.Field
            control={Select}
            options={inventoryOptions}
            label={{ children: 'Type', htmlFor: 'form-select-control-type' }}
            placeholder='Select Type'
            search
            searchInput={{ id: 'form-select-control-type' }}
            name='type'
            disabled={IS_UPDATING}
            onChange={(...params) => handleSelectGroup(params)}
            value={data.type}
            width={16}
          />
          <Form.Field
            control={Input}
            label='Name'
            name='name'
            onChange={(e) => handleInputChange(e, false)}
            value={data.name}
            required
            error={errors.name}
            width={16}
          />
          <Form.Field
            control={TextArea}
            label='Description'
            name='description'
            onChange={(e) => handleInputChange(e, false)}
            value={data.description}
            width={16}
          />
          {data.type === 'Product' && (
            <>
              <Form.Field
                control={Input}
                name='unitCost'
                label='Unit Cost'
                onChange={handleInputChange}
                value={stockData.unitCost}
                width={16}
              />
              <Form.Field
                control={Input}
                name='quantity'
                label='Quantity'
                onChange={handleInputChange}
                value={stockData.quantity}
                width={16}
              />
            </>
          )}
          <Form.Field width={16}>
            <Checkbox label='Tax Exempt' name='taxExempt' onChange={(event, data) => handleCheckBox(data)} checked={data.taxExempt} />
          </Form.Field>
        </Form>
      </Segment>
      <div className='c-sticky-footer'>
        <Segment raised className='radiusless borderless c-side-panel-footer'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}></div>
            <div >
              <Button color={IS_UPDATING ? 'blue' : 'green'} onClick={save}>{IS_UPDATING ? 'Update' : 'Create'} {data.type} </Button>
              <Button basic onClick={() => sidePanelContext.hide()}>Cancel</Button>
            </div>
          </div>
        </Segment>
      </div>
    </Container>
  )
}

export default AddInventoryForm;
