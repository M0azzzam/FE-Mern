import React from 'react';
import {
  Segment,
  Breadcrumb,
  Button,
  Icon,
  Form,
  Pagination,
  Input,
  Dropdown,
  Popup
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { pageInfo, documentsInfo } from '../../../../utils/agGrid';

const AccessoriesParts = React.forwardRef((props, gridApiRef) => {

  const {
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleButtonsSelection,
    handleKeyUp,
    handleOnPaginationChange,
    handleItemsPerPage,
    accessoriesParts,
    isLoading,
    meta,
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
      <Segment basic className='customPrimaryBG'>
        <Breadcrumb>
          <Breadcrumb.Section as={Link} to={'/app'}>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section as={Link} to={'/app/inventory/accessories'}>Manage Inventory</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Accessories &amp; Parts</Breadcrumb.Section>
        </Breadcrumb>
        <div style={{ float: 'right' }}>
          <Button primary>
            <Icon name='download' />
            Import/Export &nbsp; &nbsp;
            <Icon name='arrow circle down' />
          </Button>
          <Button positive onClick={handleAddItem}>
            <Icon name='add circle' />
            Product
          </Button>
          <Button basic>
            <Icon name='settings' />
            Action &nbsp; &nbsp;
            <Icon name='arrow circle down' />
          </Button>
        </div>
      </Segment>
      <Segment basic className='customPrimaryBG' style={{ height: '100%' }}>
        <div
          className="ag-theme-balham"
          style={{
            height: 'calc(100vh - 190px)'
          }}
        >
          <AgGridReact
            ref={gridApiRef}
            columnDefs={columnDefs}
            rowData={accessoriesParts || []}
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
              // options={pageOptions || []}
              // defaultValue={pageOptions[0].value}
              button={true}
              onChange={(event, data) => handleItemsPerPage(data)}
            />
            <div>
              <Pagination
                size='mini'
                defaultActivePage={1}
                // activePage={meta.page}
                // totalPages={meta.totalPages || 1}
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
    </>
  )
})

export default AccessoriesParts;
