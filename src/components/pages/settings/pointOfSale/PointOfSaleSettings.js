import React from 'react';
import { Segment, Breadcrumb, Form, Checkbox, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PointOfSaleSettings = () => {

  return (
    <>
      <Segment basic className='customPrimaryBG'>
        <h3>POS Settings</h3>
        <Breadcrumb>
          <Breadcrumb.Section as={Link} to='/'>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section as={Link} to='/settings/store/general_settings'>Settings</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>POS</Breadcrumb.Section>
        </Breadcrumb>
        <div style={{ float: 'right' }}>
          <Button primary>
            <Icon name='save' />
            Update
          </Button>
        </div>
      </Segment>

      <Segment basic className='customPrimaryBG' >
        <Form>
          <Form.Group>
            <Form.Field width={6}>
              <label>Employee should enter access pin before each sale transaction</label>
            </Form.Field>
            <Form.Field style={{ margin: 2 }}>
              <Checkbox />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={6}>
              <label>Employee should enter access pin before creating a repair ticket</label>
            </Form.Field>
            <Form.Field style={{ margin: 2 }}>
              <Checkbox />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={6}>
              <label>Enable Referred by Mandatory On Pos</label>
            </Form.Field>
            <Form.Field style={{ margin: 2 }}>
              <Checkbox />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={6}>
              <label>Enable Referred by Mandatory On CheckOut</label>
            </Form.Field>
            <Form.Field style={{ margin: 2 }}>
              <Checkbox />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={6}>
              <label>Hide Casual Tab</label>
            </Form.Field>
            <Form.Field style={{ margin: 2 }}>
              <Checkbox />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={6}>
              <label>Hide Accessories Tab</label>
            </Form.Field>
            <Form.Field style={{ margin: 2 }}>
              <Checkbox />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={6}>
              <label>Enable Invoice Note On Checkout</label>
            </Form.Field>
            <Form.Field style={{ margin: 2 }}>
              <Checkbox />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width={6}>
              <label>Hide Out of stock items from POS product listing</label>
            </Form.Field>
            <Form.Field style={{ margin: 2 }}>
              <Checkbox />
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    </>
  )
}

export default PointOfSaleSettings;
