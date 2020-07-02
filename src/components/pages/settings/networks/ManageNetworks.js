import React from 'react'
import { Segment, Breadcrumb, Button, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ManageNetworks = props => {

  const { handleAddItem } = props.data || {};

  return (
    <>
      <Segment basic style={{ background: 'rgba(0, 0, 0, .03)' }}>
        <h3>Manage Networks</h3>
        <Breadcrumb>
          <Breadcrumb.Section as={Link} to='/'>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section as={Link} to='/settings/store/general_settings'>Settings</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Network</Breadcrumb.Section>
        </Breadcrumb>
      </Segment>

      <Segment basic style={{ background: 'rgba(0, 0, 0, 0.03)' }}>
        <Button primary>
          Search Filter &nbsp; &nbsp;
          <Icon name='arrow circle down' />
        </Button>
        <div style={{ float: 'right' }}>
          <Button positive onClick={handleAddItem}>
            <Icon name='add circle' />
            Add Item
          </Button>
          <Dropdown
            trigger={<span><Icon name='settings' />Action &nbsp;</span>}
            button={true}
            icon='arrow circle down'
            iconposition='right'
            className='icon'
            basic
            direction='left'
          >
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/settings/manufacturer' text='Manage Manufacturer' />
              <Dropdown.Item as={Link} to='/settings/product/categories' text='Manage Product Categories' />
              <Dropdown.Item as={Link} to='/settings/product/categories' text='Manage Product Conditions' />
              <Dropdown.Item as={Link} text='Trade In Sale Status' />
              <Dropdown.Divider />
              <Dropdown.Item text='Delete Selected Items' />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Segment>
    </>
  )
}

export default ManageNetworks;
