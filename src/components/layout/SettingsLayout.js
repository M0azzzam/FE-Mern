import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Accordion, Grid, List, Container, Sidebar } from 'semantic-ui-react';
import SidePanelContext from '../extension/SidePanelContext';
import { connect } from 'react-redux';
import { isModuleAccessible } from '../../utils/auth';

const ProfileItems = (
  <>
    <List.Item as={Link} to='/app/settings/profile/edit' className={`accordian-menu-item-link c-settings-list-item`}>
      Update Profile
    </List.Item>
    <List.Item as={Link} to='/app/settings/profile/update_password' className='accordian-menu-item-link c-settings-list-item'>
      Update Password
    </List.Item>
  </>
)

const StoreItems = (
  <>
    <List.Item as={Link} to='/app/settings/store/general_settings' className='accordian-menu-item-link c-settings-list-item'>
      General Settings
    </List.Item>
    <List.Item as={Link} to='/app/settings/store/manage_stores' className='accordian-menu-item-link c-settings-list-item'>
      Manage Stores
    </List.Item>
    {/* <List.Item as={Link} to='' className='accordian-menu-item-link c-settings-list-item'>
      Manage Types
    </List.Item>
    <List.Item as={Link} to='' className='accordian-menu-item-link c-settings-list-item'>
      Franchise Fee Setup
    </List.Item> */}
  </>
)

const EmployeesItems = (
  <>
    <List.Item as={Link} to='/app/settings/employees' className='accordian-menu-item-link c-settings-list-item'>
      Manage Employees
    </List.Item>
    {/* <List.Item as={Link} to='/app/settings/employees/manage_employees_commission' className='accordian-menu-item-link c-settings-list-item'>
      Employees Commission
    </List.Item> */}
    <List.Item as={Link} to='/app/settings/employees/manage_roles' className='accordian-menu-item-link c-settings-list-item'>
      Manage Roles &amp; Permissions
    </List.Item>
    {/* <List.Item as={Link} to='' className='accordian-menu-item-link c-settings-list-item'>
      Manage Security Checks
    </List.Item> */}
  </>
)

const ModuleConfigurationItems = (
  <>
    {/* <List.Item as={Link} to='/app/settings/device/colors' className={`accordian-menu-item-link c-settings-list-item c-settings-list-item`}>
      Manage Device Colors
    </List.Item>
    <List.Item as={Link} to='/app/settings/device/memory_size' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Device Memory Size
    </List.Item>
    <List.Item as={Link} to='/app/settings/devices' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Devices
    </List.Item>
    <List.Item as={Link} to='/app/settings/repair/categories' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Repair Categories
    </List.Item> */}
    <List.Item as={Link} to='/app/settings/inventory' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Inventory
    </List.Item>
    {/* <List.Item as={Link} to='/app' className={'accordian-menu-item-link c-settings-list-item'}>
      Manage Invoices
    </List.Item>
    <List.Item as={Link} to='/app/settings/manufacturer' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Manufacturer
    </List.Item>
    <List.Item as={Link} to='/app/settings/networks' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Networks
    </List.Item>
    <List.Item as={Link} to='/app/settings/pos' className={'accordian-menu-item-link c-settings-list-item'}>
      Manage POS
    </List.Item>
    <List.Item as={Link} to='/app/settings/physical_locations' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Physical Locations
    </List.Item>
    <List.Item as={Link} to='/app/settings/product/categories' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Product Categories
    </List.Item>
    <List.Item as={Link} to='/app/settings/product/conditions' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Product Conditions
    </List.Item>
    <List.Item as={Link} to='/app/settings/repair/categories' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Repair Categories
    </List.Item> */}
    <List.Item as={Link} to='/app/settings/taxes' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Taxes
    </List.Item>
    {/* <List.Item as={Link} to='/app/settings/vendors' className={`accordian-menu-item-link c-settings-list-item`}>
      Manage Vendors
    </List.Item> */}
  </>
)

const defaultSidebarConfig = {
  width: 960,
  background: '#fff'
}

const SettingsLayout = (props) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [showSidebar, setShowSidebar] = useState(false);
  const [SidebarData, setSidebarData] = useState({});

  const sidebarConfig = { ...defaultSidebarConfig, ...SidebarData.sidebarConfig };

  const handleClick = (e, propsTitle) => {
    if (activeIndex === propsTitle.index) setActiveIndex(null)
    else setActiveIndex(propsTitle.index);
  }

  return (
    <Sidebar.Pushable>
      <Sidebar
        as='div'
        animation='overlay'
        icon='labeled'
        direction='right'
        // onHide={() => setShowSidebar(false)}
        onHidden={() => setSidebarData({})}
        visible={showSidebar}
        style={sidebarConfig}

      >
        {SidebarData.Component ? <SidebarData.Component data={SidebarData.data} /> : null}
      </Sidebar>
      <Sidebar.Pusher dimmed={showSidebar}>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column computer={3} tablet={16} mobile={16} className='paddingless'>
              <Accordion as={Menu} vertical fluid style={{ border: 'none', borderRadius: 0, boxShadow: 'none', borderRight: '1px solid lightgray', height: 'calc(100vh - 56px)', overflow: 'auto' }}>

                <Menu.Item className='left'>
                  <Accordion.Title
                    active={activeIndex === 0}
                    content='Your Profile'
                    index={0}
                    onClick={handleClick}
                    className='accordian-menu-item'
                  />
                  <Accordion.Content active={activeIndex === 0} content={ProfileItems} />
                </Menu.Item>

                <Menu.Item className='left'>
                  <Accordion.Title
                    active={activeIndex === 1}
                    content='Store Settings'
                    index={1}
                    onClick={handleClick}
                    className='accordian-menu-item'
                  />
                  <Accordion.Content active={activeIndex === 1} content={StoreItems} />
                </Menu.Item>

                {isModuleAccessible(props.user, 'employees') && <Menu.Item className='left'>
                  <Accordion.Title
                    active={activeIndex === 2}
                    content='Employees'
                    index={2}
                    onClick={handleClick}
                    className='accordian-menu-item'
                  />
                  <Accordion.Content active={activeIndex === 2} content={EmployeesItems} />
                </Menu.Item>}

                <Menu.Item className='left'>
                  <Accordion.Title
                    active={activeIndex === 3}
                    content='Module Configuration'
                    index={3}
                    onClick={handleClick}
                    className='accordian-menu-item'
                  />
                  <Accordion.Content active={activeIndex === 3} content={ModuleConfigurationItems} />
                </Menu.Item>

              </Accordion>
            </Grid.Column>
            <Grid.Column computer={13} tablet={16} mobile={16} className='paddingless'>
              <Container className='paddingless' style={{ height: 'calc(100vh - 56px)', width: '100%', overflowY: 'scroll' }}>
                {props.children}
              </Container>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

SettingsLayout.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired
}

export default connect(state => ({
  user: state.authentication
}))(SettingsLayout);
