import React from 'react';
import {
  Segment,
  Breadcrumb,
  Button,
  Icon,
  Sticky,
  Dropdown,
  Table,
  Popup,
  Pagination,
  Checkbox,
  Select,
  Form,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import TextIcon from '../../../extension/TextIcon';
import Header from '../../../extension/Heading';
import productImage from '../../../../assets/icons/product.svg';
import serviceImage from '../../../../assets/icons/service.svg';
import difference from 'lodash/difference';

const ManageInventory = (props) => {

  const {
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleDeleteItems,
    handleOnPaginationChange,
    handleItemsPerPage,
    handleSelect,
    handleSelectAll,
    selectedInventoryItems,
    inventoryIds,
    inventory,
    isLoading,
    pageOptions,
    meta
  } = props.data || {};

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Sticky>
        <Segment basic attached className='c-breadcrumb-section'>
          <Breadcrumb style={{ flex: 1, lineHeight: '36px' }}>
            <Breadcrumb.Section as={Link} to='/app/dashboard'>Home</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section as={Link} to='/app/dashboard'>Settings</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section active>Inventory</Breadcrumb.Section>
          </Breadcrumb>
          <div>
            <Button positive onClick={handleAddItem}><Icon name='add' />Add Item</Button>
            <Dropdown as={Button} primary text='More Actions'>
              <Dropdown.Menu direction='left' className='c-dropdown-items'>
                <Dropdown.Item>
                  <TextIcon name='upload' color='blue' >Import Inventory</TextIcon>
                </Dropdown.Item>
                <Dropdown.Item>
                  <TextIcon name='download' color='red' >Export Inventory</TextIcon>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleDeleteItems}>
                  <TextIcon name='trash' color='red' >Delete Selected</TextIcon>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Segment>
      </Sticky>
      <Segment basic attached className='c-search-section'>
        <Form>
          <Form.Group style={{ display: 'flex' }}>
            <Form.Input width={3} fluid label='Item' className='c-black-label' placeholder='Search by Item' />
            <Form.Field
              width={3}
              control={Select}
              options={[]}
              label={{ children: 'Type', htmlFor: 'form-select-control-type' }}
              placeholder='Please Select'
              search
              searchInput={{ id: 'form-select-control-type' }}
              className='c-black-label'
              name='type'
            />
          </Form.Group>
        </Form>
      </Segment>
      <Segment loading={isLoading} basic className='marginless radiusless borderless' style={{ padding: 16 }}>
        <Segment attached style={{ backgroundColor: '#f9fafa', borderRadius: '10px 10px 0px 0px', display: 'flex' }}>
          <Header as='h3' style={{ alignSelf: 'center', flex: '1' }}>Inventory</Header>
          <Dropdown
            compact
            inline
            options={pageOptions}
            defaultValue={pageOptions && pageOptions.length > 0 && pageOptions[0].value}
            button={true}
            onChange={(event, data) => handleItemsPerPage(data)}
            className='c-pagination-dropdown'
          />
        </Segment>
        <Table attached compact structured unstackable className='c-table'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Checkbox onChange={handleSelectAll} checked={difference(inventoryIds, selectedInventoryItems).length === 0 && inventoryIds.length > 0 ? true : false} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Type
              </Table.HeaderCell>
              <Table.HeaderCell>
                Name
              </Table.HeaderCell>
              <Table.HeaderCell>
                Description
              </Table.HeaderCell>
              <Table.HeaderCell>
                Tax Exempt
              </Table.HeaderCell>
              <Table.HeaderCell>
                Quantity
              </Table.HeaderCell>
              <Table.HeaderCell>
                Unit Cost
              </Table.HeaderCell>
              <Table.HeaderCell>
                Actions
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {inventory.map(item => (
              <Table.Row key={item._id}>
                <Table.Cell>
                  <Checkbox checked={selectedInventoryItems.includes(item._id)} onChange={() => handleSelect(item._id)} />
                </Table.Cell>
                <Table.Cell>
                  <img src={item.type === 'Product' ? productImage : serviceImage} style={{ height: 25, width: 25 }} alt={item.type} />
                </Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.taxExempt ? <Icon name='check' color='green' /> : <Icon name='close' color='red' />}</Table.Cell>
                <Table.Cell>{item.type === 'Product' ? item.inventoryStock && item.inventoryStock.quantity : '---'}</Table.Cell>
                <Table.Cell>{item.type === 'Product' ? item.inventoryStock && parseFloat(item.inventoryStock.unitCost).toFixed(2) : '---'}</Table.Cell>
                <Table.Cell>
                  <Button icon='edit' compact size='mini' primary onClick={() => handleUpdateItem(item)} />
                  <Popup
                    trigger={
                      <Button size='mini' compact icon='trash' name='trash' negative></Button>
                    }
                    content={<Button onClick={() => handleDeleteItem(item)} negative compact content='Confirm delete' />}
                    on='click'
                    position='bottom right'
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className='paginationMain'>
          <Pagination
            size='mini'
            activePage={(meta && meta.page) ? meta.page : 1}
            totalPages={(meta && meta.totalPages) ? meta.totalPages : 1}
            siblingRange={1}
            firstItem={null}
            lastItem={null}
            ellipsisItem={null}
            boundaryRange={0}
            onPageChange={(...data) => handleOnPaginationChange(data)}
          />
        </div>
      </Segment>
    </div>
  )
}

export default ManageInventory;
