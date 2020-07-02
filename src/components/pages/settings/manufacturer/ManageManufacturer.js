import React from 'react';
import { Segment, Breadcrumb, Button, Icon, Popup, Dropdown, Pagination, Form, Input, Sticky } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { documentsInfo, pageInfo } from '../../../../utils/agGrid'

const ManageManufacturer = props => {
  let gridApiRef = React.createRef();

  const {
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleDeleteSelectedItems,
    handleDisableSelectedOnPos,
    handleShowSelectedOnPos,
    handleDisableSelectedOnWidget,
    handleShowSelectedOnWidget,
    handleOnPaginationChange,
    handleButtonsSelection,
    handleItemsPerPage,
    handleKeyUp,
    manufacturers,
    isLoading,
    meta,
    disable,
    pageOptions
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
      headerName: 'Show On POS', field: 'triggers.onPOS', cellRendererFramework: (params) => {
        return params.data.triggers.onPOS ? <Icon name='check' color='green' /> : <Icon name='cancel' color='red' />
      }
    },
    {
      headerName: 'Show On Widget', field: 'triggers.onWidget', cellRendererFramework: (params) => {
        return params.data.triggers.onWidget ? <Icon name='check' color='green' /> : <Icon name='cancel' color='red' />
      }
    },
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
          <h3>Manage Manufacturers</h3>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Home</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section as={Link} to='/app/inventory/accessories'>Inventory</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section active>Manufacturers</Breadcrumb.Section>
          </Breadcrumb>
        </Segment>
      </Sticky>
      <Segment basic loading={isLoading} className='customPrimaryBG'>
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
              <Dropdown.Item disabled={disable} onClick={() => handleDeleteSelectedItems(gridApiRef)} text='Delete Selected Manufacturers' />
              <Dropdown.Item disabled={disable} onClick={() => handleDisableSelectedOnPos(gridApiRef)} text='Disable Selected on POS' />
              <Dropdown.Item disabled={disable} onClick={() => handleShowSelectedOnPos(gridApiRef)} text='Show Selected on POS' />
              <Dropdown.Item disabled={disable} onClick={() => handleDisableSelectedOnWidget(gridApiRef)} text='Disable Selected on Widgets' />
              <Dropdown.Item disabled={disable} onClick={() => handleShowSelectedOnWidget(gridApiRef)} text='Show Selected on Widgets' />
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
              rowData={manufacturers || []}
              rowSelection='multiple'
              suppressRowClickSelection={true}
              onRowSelected={() => handleButtonsSelection(gridApiRef)}
              getRowNodeId={(data) => data._id}
              deltaRowDataMode={true}
            />
          </div>
          <div className='paginationMain'>
            <div className='paginationChild'>
              <p className='marginLessBottom marginLeft paginationTextColor'>Go to page</p>
              <Form.Field
                style={{ width: '50px', height: 30, marginLeft: 5 }}
                control={Input}
                name='goToPage'
                onKeyUp={handleKeyUp}
              />
              <p className='marginLessBottom marginLeft paginationTextColor'>Items per page</p>
              <Dropdown
                style={{ marginLeft: 5, height: 30 }}
                compact
                inline
                options={pageOptions}
                defaultValue={pageOptions[0].value}
                button={true}
                onChange={(event, data) => handleItemsPerPage(data)}
              />
              <div>
                <Pagination
                  size='mini'
                  defaultActivePage={1}
                  activePage={meta.page}
                  totalPages={meta.totalPages || 1}
                  siblingRange={1}
                  firstItem={null}
                  lastItem={null}
                  ellipsisItem={null}
                  boundaryRange={0}
                  onPageChange={(...data) => handleOnPaginationChange(data)}
                />
              </div>
              <p className='marginLessBottom marginLeft paginationTextColor'>{pageInfo(meta)}</p>
              <p className='marginLessBottom marginLeft paginationTextColor'>&lt;{documentsInfo(meta)}&gt;</p>
            </div>
          </div>
        </Segment>
      </Segment>
    </>
  );
}

export default ManageManufacturer;
