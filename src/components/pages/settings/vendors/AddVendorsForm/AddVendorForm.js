import React from 'react';
import { Segment, Grid, Container, Button, Icon, Form, Input, Sticky, Select } from 'semantic-ui-react';

const AddVendorForm = props => {

  const {
    handleInputChange,
    handleDoubleTax,
    sidePanelContext,
    save,
    data,
    IS_UPDATING,
    isUpdating,
    doubleTaxOptions
  } = props.data || {};

  return (
    <Container fluid style={{ height: '100vh', overflow: 'auto', padding: 0 }}>
      <Sticky>
        <Segment color='blue' raised className='radiusless borderless'>
          <Grid>
            <Grid.Row className='paddingless marginless'>
              <Grid.Column width={16} className='paddingless'>
                <Container style={{ lineHeight: '36px', width: '100%' }}>{IS_UPDATING ? 'Update Vendor' : 'Add A New Vendor'}</Container>
                <div className='sidebar-action-buttons'>
                  <Button positive className='radiusless' onClick={save} ><Icon name='save' /> Save</Button>
                  <Button negative className='radiusless marginless' onClick={() => sidePanelContext.hide()}><Icon name='cancel' /> Close</Button>
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
              control={Input}
              label='Name'
              name='name'
              value={data.name}
              onChange={handleInputChange}
              required
            />
            <Form.Field
              control={Input}
              label='Vendor Code'
              name='vendorCode'
              value={data.vendorCode}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Email'
              name='email'
              type='email'
              value={data.email}
              onChange={handleInputChange}
            />
            <Form.Field
              control={Input}
              label='Phone'
              name='phone'
              value={data.phone}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Mobile'
              name='mobile'
              value={data.mobile}
              onChange={handleInputChange}
            />
            <Form.Field
              control={Input}
              label='Website'
              name='website'
              value={data.website}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Form.TextArea label='Address' name='address' value={data.address} onChange={handleInputChange} />
            </Form.Field>
            <Form.Field
              control={Input}
              label='Postcode'
              name='postCode'
              value={data.postCode}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              control={Select}
              options={doubleTaxOptions}
              label={{ children: 'Double Tax', htmlFor: 'form-select-control-double-tax' }}
              search
              searchInput={{ id: 'form-select-control-double-tax' }}
              name='doubleTax'
              value={data.doubleTax}
              onChange={(...params) => handleDoubleTax(params)}
              width={8}
            />
          </Form.Group>
        </Form>
      </Segment>
    </Container>
  )
}

export default AddVendorForm;
