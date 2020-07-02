import React from 'react';
import {
  Segment,
  Breadcrumb,
  Button,
  Icon,
  Sticky,
  Dropdown,
  Popup
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import CustomPagination from '../../../common/CustomPagination';

const ManagePhysicalLocations = React.forwardRef((props, gridApiRef) => {

  const {
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleDeleteSelectedItems,
    handleButtonsSelection,
    handleKeyUp,
    handleOnPaginationChange,
    handleItemsPerPage,
    pageOptions,
    physicalLocations,
    isLoading,
    meta,
    disable
  } = props.data || {};

  const columnDefs = [
    {
      headerName: '',
      field: '',
      width: 45,
      headerCheckboxSelection: true,
      checkboxSelection: true
    },
    { headerName: 'Name', field: 'name' },
    {
      headerName: 'Actions', field: '', pinned: 'right', cellRendererParams: { meta }, cellRendererFramework: (params) => (
        <>
          <Button size='mini' compact onClick={() => handleUpdateItem(params)}><Icon fitted name='pencil' /></Button>
          <Popup
            trigger={
              <Button size='mini' compact ><Icon fitted name='trash' color='red' /></Button>
            }
            content={<Button onClick={() => handleDeleteItem(params)} color='red' content='Confirm delete' />}
            on='click'
            position='bottom right'
          />
        </>
      ),
      width: 100
    },
  ]

  return (
    <>
      <Sticky>
        <Segment basic className='customPrimaryBG'>
          <h3>Manage Physical Locations</h3>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Home</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section as={Link} to='/settings/store/general_settings'>Settings</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section active>Physical Locations</Breadcrumb.Section>
          </Breadcrumb>
        </Segment>
      </Sticky>
      <Segment loading={isLoading} basic className='customPrimaryBG'>
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
              <Dropdown.Item as={Link} to='/settings/devices' text='Manage Devices' />
              <Dropdown.Item as={Link} to='/settings/product/categories' text='Manage Product Categories' />
              <Dropdown.Item as={Link} to='/settings/product/categories' text='Manage Product Conditions' />
              <Dropdown.Item text='Trade In Sale Status' />
              <Dropdown.Divider />
              <Dropdown.Item disabled={disable} onClick={handleDeleteSelectedItems} text='Delete Selected Locations' />
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Segment basic className='customPrimaryBG paddingless' style={{ height: '100%' }} clearing>
          <div
            className="ag-theme-balham"
            style={{
              height: 'calc(100vh - 240px)'
            }}
          >
            <AgGridReact
              ref={gridApiRef}
              columnDefs={columnDefs}
              rowData={physicalLocations || []}
              rowSelection='multiple'
              suppressRowClickSelection={true}
              onRowSelected={() => handleButtonsSelection(gridApiRef)}
              getRowNodeId={(data) => data._id}
              deltaRowDataMode={true}
            />
          </div>
          <CustomPagination data={{
            handleKeyUp,
            handleItemsPerPage,
            handleOnPaginationChange,
            meta,
            pageOptions
          }} />
        </Segment>
      </Segment>
    </>
  )
})

export default ManagePhysicalLocations;
