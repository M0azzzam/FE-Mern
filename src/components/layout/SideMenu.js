import React from 'react';
import clsx from 'clsx';
import { Menu, Dropdown, Popup } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import TextIcon from "../extension/TextIcon";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../../store/reducers/SideMenu";

const navItems = [
  {
    title: 'Dashboard',
    to: '/app/dashboard',
    icon: 'dashboard'
  },
  {
    title: 'Calendar',
    icon: 'calendar',
    to: '/app/calendar',
    items: [
      {
        title: 'Month',
        to: '/app/calendar/month',
        icon: 'dot circle outline'
      },
      {
        title: 'Week',
        to: '/app/calendar/week',
        icon: 'dot circle outline'
      },
      {
        title: 'Grid',
        to: '/app/calendar/grid',
        icon: 'dot circle outline'
      },
      {
        title: 'Map',
        to: '/app/calendar/map',
        icon: 'dot circle outline'
      }
    ]
  },
  {
    title: 'Clients',
    icon: 'user',
    to: '/app/clients',
    items: [
      {
        title: 'People',
        to: '/app/clients/people',
        icon: 'dot circle outline'
      },
      {
        title: 'Properties',
        to: '/app/clients/properties',
        icon: 'dot circle outline'
      }
    ]
  },
  {
    title: 'Work',
    icon: 'job',
    to: '/app/work',
    items: [
      {
        title: 'Overview',
        to: '/app/work/overview',
        icon: 'dot circle outline'
      },
      {
        title: 'Leads',
        to: '/app/work/leads',
        icon: 'dot circle outline'
      },
      {
        title: 'Quotes',
        to: '/app/work/quotes',
        icon: 'dot circle outline'
      },
      {
        title: 'Jobs',
        to: '/app/work/jobs',
        icon: 'dot circle outline'
      },
      {
        title: 'Invoices',
        to: '/app/work/invoices',
        icon: 'dot circle outline'
      }
    ]
  },
  {
    title: 'Reports',
    to: '/app/reports',
    icon: 'graph'
  },
  {
    title: 'Time Sheet',
    to: '/app/timesheet',
    icon: 'clock'
  },
  {
    title: 'Settings',
    to: '/app/settings',
    icon: 'settings'
  }
]

const SideMenu = (props) => {
  const isActiveRoute = (name) => props.pathname.indexOf(name) > -1;

  const MenuItems = ({ navItems }) => {
    return navItems.map((item, i) => {
      const hasSubItems = item.items && item.items.length;
      const isActive = isActiveRoute(item.to)
      if (hasSubItems) {
        return <Popup
          content={item.title}
          key={item.title}
          position='right center'
          inverted
          size='mini'
          basic
          trigger={<Dropdown item className={clsx('c-menu-item c-dropdown', { "c-active": isActive })} icon={
            <TextIcon hideText={props.smallMenu} image={true} name={item.icon}>
              {item.title}
            </TextIcon>
          } onClick={(e) => e.preventDefault()} style={{ width: '100% !important' }}>
            <Dropdown.Menu className=' c-dropdown-items'>
              {item.items.map((t, j) => {
                return <Dropdown.Item
                  key={t.title}
                  className={clsx('c-menu-item', { "c-active": isActive })}
                  icon={t.icon}
                  text={t.title}
                  as={Link}
                  to={t.to}
                  name={t.title}

                  active={isActiveRoute(t.to)}>
                </Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>} />
      } else {
        return (
          <Popup
            content={item.title}
            key={item.title}
            position='right center'
            inverted
            size='mini'
            basic
            trigger={
              <Menu.Item className={clsx('c-menu-item', { "c-active": isActive })} as={Link} to={item.to} name={item.title}>
                <TextIcon hideText={props.smallMenu} name={item.icon} image={true} size='small'>
                  {item.title}
                </TextIcon>
              </Menu.Item>}
          />
        )
      }
    })
  }

  const getMenu = () => {
    return (
      <Menu fixed='left' borderless className={(props.smallMenu ? 'small-side' : '') + ' side'} style={{ backgroundColor: '#2B3E51', color: '#fff' }} vertical>
        {<MenuItems navItems={navItems} />}
      </Menu>
    )
  }

  return (
    <div className='parent'>
      <div className={(props.smallMenu ? 'small-side ' : '') + 'side'}>
        {getMenu()}
      </div>
      <div className={(props.smallMenu ? 'small-content ' : '') + 'custom-content'}>
        {props.children}
      </div>
    </div>
  )

}

export default connect(
  state => ({
    smallMenu: state.sideMenu.smallMenu,
    pathname: state.router.location.pathname
  }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(SideMenu);
