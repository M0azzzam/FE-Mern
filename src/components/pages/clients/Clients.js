import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Dropdown,
  Segment,
  Form,
  Table,
  Select,
  Icon,
  Breadcrumb,
  Pagination,
  Label,
  Popup,
} from 'semantic-ui-react';
import TextIcon from '../../extension/TextIcon';
import Header from '../../extension/Heading';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const Clients = props => {

  const {
    handleAddClient,
    handleUpdateClient,
    handleDeleteClient,
    handleOnPaginationChange,
    handleItemsPerPage,
    clients,
    isLoading,
    pageOptions,
    meta
  } = props.data || {};

  const getAddress = (client = {}) => {
    const { propertyDetails: pd = {} } = client;
    return `${pd.street2 || ''} ${pd.street1 ? pd.street1 + ',' : ''} ${pd.city ? pd.city + ',' : ''} ${pd.postCode || ''} ${pd.country}`
  }

  return (
    <div>
      <Segment basic attached className='c-breadcrumb-section'>
        <Breadcrumb style={{ flex: 1, lineHeight: '36px' }}>
          <Breadcrumb.Section as={Link} to='/app/dashboard'>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Customer</Breadcrumb.Section>
        </Breadcrumb>
        <div>
          <Button positive onClick={handleAddClient}><Icon name='add' />Add Customer</Button>
          <Dropdown as={Button} primary text='More Actions'>
            <Dropdown.Menu direction='left' className='c-dropdown-items'>
              <Dropdown.Item>
                <TextIcon name='upload' color='blue' >Import Clients</TextIcon>
              </Dropdown.Item>
              <Dropdown.Item>
                <TextIcon name='download' color='red' >Export Clients</TextIcon>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Segment>
      <Segment basic attached className='c-search-section'>
        <Form>
          <Form.Group style={{ display: 'flex' }}>
            <Form.Input width={3} fluid label='Name' className='c-black-label' placeholder='Please Type' />
            <Form.Input width={3} fluid label='Phone' className='c-black-label' placeholder='Please Type' />
            <Form.Field
              width={3}
              control={Select}
              options={[]}
              label={{ children: 'Criteria', htmlFor: 'form-select-control-criteria' }}
              placeholder='Please Select'
              search
              searchInput={{ id: 'form-select-control-criteria' }}
              name='criteria'
              className='c-black-label'
            />
          </Form.Group>
        </Form>
      </Segment>
      <Segment loading={isLoading} basic className='marginless radiusless borderless' style={{ padding: 16 }}>
        <Segment attached style={{ backgroundColor: '#f9fafa', borderRadius: '10px 10px 0px 0px', display: 'flex' }}>
          <Header as='h3' style={{ alignSelf: 'center', flex: 1 }}>Customers</Header>
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
        <Table attached compact sortable structured unstackable className='c-table'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                Name <Icon name='sort' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Service Address <Icon name='sort' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Company <Icon name='sort' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Email <Icon name='sort' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Phone / Mobile <Icon name='sort' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                MailChimp <Icon name='sort' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Actions
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {clients.map(client => {
              const mobile = parsePhoneNumberFromString(client.mobile[0] || '', 'PK');
              const homePhone = parsePhoneNumberFromString(client.homePhone[0] || '', 'PK');
              return (
                <Table.Row key={client._id}>
                  <Table.Cell>{(client.companyNameAsPrimary && client.company) ? client.company : <>{client.title}  {client.firstName}  {client.lastName}</>}</Table.Cell>
                  <Table.Cell>{getAddress(client)}</Table.Cell>
                  <Table.Cell>{client.company}</Table.Cell>
                  <Table.Cell>{client.email}</Table.Cell>
                  <Table.Cell>
                    <a href={`tel: ${client.mobile[0] || client.homePhone[0] || client.workPhone[0]}`}>
                      <div>{mobile && mobile.formatNational()}</div>
                      <div>{homePhone && homePhone.formatNational()}</div>
                    </a>
                  </Table.Cell>
                  <Table.Cell>
                    <Label size='tiny' color='green'>Subscribed</Label>
                  </Table.Cell>
                  <Table.Cell>
                    <Button icon='eye' compact size='mini' className='c-primary-btn' onClick={() => { }} />
                    <Button icon='edit' compact size='mini' primary onClick={() => handleUpdateClient(client)} />
                    <Popup
                      trigger={
                        <Button size='mini' compact icon='trash' name='trash' negative></Button>
                      }
                      content={<Button onClick={() => handleDeleteClient(client)} negative compact content='Confirm delete' />}
                      on='click'
                      position='bottom right'
                    />
                  </Table.Cell>
                </Table.Row>
              )
            })}
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

export default Clients;
