import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Sidebar } from 'semantic-ui-react';
import SideMenu from "../layout/SideMenu";
import TopMenu from "../layout/TopMenu";
import SidePanelContext from '../extension/SidePanelContext';


const defaultSidebarConfig = {
  width: 960,
  background: '#fff'
}

const Layout = props => {

  const [showSidebar, setShowSidebar] = useState(false);
  const [SidebarData, setSidebarData] = useState({});

  const sidebarConfig = { ...defaultSidebarConfig, ...SidebarData.sidebarConfig };

  const handleSidebarData = (data) => {
    setSidebarData(data);
    setShowSidebar(true);
  }

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  }

  return (
    <SidePanelContext.Provider value={{ show: setShowSidebar, setData: handleSidebarData, hide: handleCloseSidebar }}>
      <Sidebar.Pushable>
        <Sidebar
          as='div'
          animation='overlay'
          icon='labeled'
          direction='right'
          // onHide={() => setShowSidebar(false)}
          onHidden={() => {
            typeof SidebarData.data.cancelCallback === 'function' && SidebarData.data.cancelCallback();
            setSidebarData({});
          }}
          visible={showSidebar}
          style={sidebarConfig}
        >
          {SidebarData.Component ? <SidebarData.Component data={SidebarData.data} /> : null}
        </Sidebar>
        <Sidebar.Pusher dimmed={showSidebar}>
          <div className="custom-grid">
            <div className="menu">
              <TopMenu />
            </div>
            <div className="main-content">
              <SideMenu>
                <div style={{ maxHeight: 'calc(100vh - 56px)', height: 'calc(100vh - 56px)' }}>
                  {props.children}
                </div>
              </SideMenu>
            </div>
          </div>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </SidePanelContext.Provider>
  )
};

Layout.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired
}

export default Layout;
