import React from 'react';
import { Segment, Breadcrumb, Button, Icon, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ManageServices = props => {
  const { handleAddProduct } = props.data || {};

  return (
    <>
      <Segment basic className='customPrimaryBG'>
        <Breadcrumb>
          <Breadcrumb.Section as={Link} to={'/app'}>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section as={Link} to={'/app/repairs'}>Manage Services</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Repairs</Breadcrumb.Section>
        </Breadcrumb>
      </Segment>

      <Segment basic className='customPrimaryBG'>
        <Button primary onClick={() => { }}>
          Search Filter &nbsp; &nbsp;
          <Icon name='arrow circle down' />
        </Button>
        <div style={{ float: 'right' }}>
          <Button primary>
            <Icon name='download' />
            Import/Export &nbsp; &nbsp;
            <Icon name='arrow circle down' />
          </Button>
          <Button positive onClick={handleAddProduct}>
            <Icon name='add circle' />
            Product
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
              <Dropdown.Item text='Delete Selected Items' />
              <Dropdown.Item text='Remove from this store only' />
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to='/settings/manufacturer' text='Manage Manufacturer' />
              <Dropdown.Item as={Link} to='/settings/devices' text='Manage Devices' />
              <Dropdown.Item text='Manage Task Type' />
              <Dropdown.Item text='Manage Repair Categories' />
              <Dropdown.Divider />
              <Dropdown.Item text='FAQ' />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Segment>
    </>
  )
}

export default ManageServices;
