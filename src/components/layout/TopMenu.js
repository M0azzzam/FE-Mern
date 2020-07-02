import React from 'react';
import {
  Icon,
  Input,
  Menu,
  Dropdown,
} from 'semantic-ui-react';
import { actionCreators as sideAction } from "../../store/reducers/SideMenu";
import { actionCreators as searchAction } from "../../store/reducers/SearchStore";
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/actions/users';
import TextIcon from '../extension/TextIcon';

const TopMenu = props => {

  const doSearch = (event) => {
    props.actions.search(event.target.value);
  }

  const handleLogout = () => {
    props.dispatch(userActions.logout());
  }

  return (
    <Menu fixed="top" className="top-menu">
      <Menu.Item className={props.smallMenu ? "logo-space-menu-item" : "logo-space-menu-item-collapsed"}>
        <b style={{ fontSize: '18px' }}>
          {props.smallMenu ? (
            <i>SD</i>
          ) : (
              <i>ServiceDesk</i>
            )}
        </b>
      </Menu.Item>

      <Menu.Item
        className="no-border"
        onClick={props.actions.toggleSideMenu}
      >
        <Icon name="bars" />
      </Menu.Item>

      <Menu.Item className="no-border drop-left-padding">
        <Input
          className="icon top-bar-search"
          transparent
          icon="search"
          iconPosition="left"
          placeholder="Search for something..."
          onChange={doSearch.bind(this)}
        />
      </Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown item text='' icon='ellipsis horizontal'>
          <Dropdown.Menu className='c-dropdown-items'>
            <Dropdown.Header>SETTINGS</Dropdown.Header>
            <Dropdown.Item as={Link} to='/app/settings/store/general_settings'>
              <TextIcon name='cog' color='blue' >Settings</TextIcon>
            </Dropdown.Item>
            <Dropdown.Header>SUPPORT</Dropdown.Header>
            <Dropdown.Item>
              <TextIcon name='comments outline' color='orange' >Help Center</TextIcon>
            </Dropdown.Item>
            <Dropdown.Item>
              <TextIcon name='graduation' color='purple' >Knowledgebase</TextIcon>
            </Dropdown.Item>
            <Dropdown.Item>
              <TextIcon name='crosshairs' color='green' >Terms Of Services</TextIcon>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>
              <TextIcon name='sign-out' color='red' >Logout</TextIcon>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
}

export default connect(
  state => state.sideMenu,
  dispatch => {
    return {
      actions: bindActionCreators({ ...sideAction, ...searchAction }, dispatch),
      dispatch
    }
  }
)(TopMenu);
