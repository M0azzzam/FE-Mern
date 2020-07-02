import React, { useEffect, useState, useContext } from 'react';
import { Segment, Breadcrumb, Button, Icon } from 'semantic-ui-react';
import { getAllStores } from '../../../../services/stores';
import Toast from '../../../extension/Toast';
import { AgGridReact } from 'ag-grid-react';
import SidePanelContext from '../../../extension/SidePanelContext';
import UpdateStoreSettingsSidebar from './UpdateStoreSettingsSidebar';

const ManageStores = props => {
  const [isLoading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);

  const sidePanelContext = useContext(SidePanelContext)

  const fetchAllStores = async () => {
    try {
      setLoading(true);
      const result = await getAllStores();
      setStores(result.data.data);
      setLoading(false);
    } catch (err) {
      console.log('Error:FetchAllStores', err);
      Toast(
        'Error while fetching stores',
        'Store information could not be retrieved. Please retry!',
        'danger'
      );
      setLoading(false);
    }
  }

  const handleAddNewStore = () => {
    sidePanelContext.setData({ Component: UpdateStoreSettingsSidebar, data: { fetchAllStores, IS_UPDATING: false }, sidebarConfig: { width: 500 } })
  }

  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Alternate Name', field: 'alternateName' },
    { headerName: 'Address', field: 'address' },
    { headerName: 'City', field: 'city' },
    { headerName: 'Postal Code', field: 'postCode' },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Mobile', field: 'mobile' },
    { headerName: 'Website', field: 'website', width: 300 },
    {
      headerName: 'Actions', field: '', pinned: 'right', cellRendererFramework: (params) => (
        <>
          <button onClick={() => { sidePanelContext.setData({ Component: UpdateStoreSettingsSidebar, data: { ...params.data, fetchAllStores, IS_UPDATING: true }, sidebarConfig: { width: 500 } }) }}><Icon name='pencil' /></button>
        </>
      ),
      width: 150
    },
  ];

  useEffect(() => {
    fetchAllStores();
  }, [])

  return (
    <>
      <Segment basic className='customPrimaryBG'>
        <h3>Manage Stores</h3>
        <Breadcrumb>
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section link>Settings</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section link>Stores</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Manage Stores</Breadcrumb.Section>
        </Breadcrumb>
        <div style={{ float: 'right' }}>
          <Button positive onClick={handleAddNewStore}><Icon name='save' /> Add New Store</Button>
        </div>
      </Segment>

      <Segment basic className='customPrimaryBG' loading={isLoading}>
        <div
          className="ag-theme-balham"
          style={{
            height: 'calc(100vh - 150px)'
          }}
        >
          <AgGridReact
            // domLayout='autoHeight'
            onFirstDataRendered={(event) => {
              event.api.sizeColumnsToFit();
            }}
            defaultColDef={{
              resizable: true
            }}
            columnDefs={columnDefs}
            rowData={stores}
          />
        </div>
      </Segment>
    </>
  );
}

export default ManageStores;
