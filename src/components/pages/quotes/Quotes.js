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
  Checkbox,
  Modal,
  List,
  Search,
  Input
} from 'semantic-ui-react';
import TextIcon from '../../extension/TextIcon';
import Header from '../../extension/Heading';
import moment from 'moment';
import debounce from 'lodash/debounce';
import { processQuoteDetails, stringifyAddress, stringifyPhone, stringifyClientName } from '../../../utils/quotes';
import difference from 'lodash/difference';
import { DateRange } from 'react-date-range';

const Quotes = props => {

  const {
    handleEditQuote,
    handleViewQuote,
    handleDeleteQuote,
    handleDeleteQuotes,
    handleOnPaginationChange,
    handleItemsPerPage,
    handleClientModal,
    handlePropertyModal,
    handleAddCustomer,
    handleProperty,
    handleSearchClients,
    handleFilterChange,
    handleStatusChange,
    handleSort,
    handleSelectAll,
    handleSelect,
    handleCalendarFilter,
    handleDateChange,
    quotes,
    clients,
    isLoading,
    clientsLoading,
    meta,
    selectedClient,
    pageOptions,
    statusOptions,
    showClientModal,
    showPropertyModal,
    customerSearchRef,
    searchParams,
    setShowStatus,
    showStatus,
    sortParams,
    showStatusText,
    statusColors,
    selectedQuotes,
    quotesIds = [],
    activeFilter,
    formatDateRange
  } = props.data || {};

  return (
    <div>
      <Segment basic attached className='c-breadcrumb-section'>
        <Breadcrumb style={{ flex: 1, lineHeight: '36px' }}>
          <Breadcrumb.Section as={Link} to='/app/dashboard'>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Quote Listing</Breadcrumb.Section>
        </Breadcrumb>
        <div>
          <Button positive onClick={() => handleClientModal(true)}><Icon name='add' />Add Quote</Button>
          <Dropdown as={Button} primary text='More Actions'>
            <Dropdown.Menu direction='left' className='c-dropdown-items'>
              <Dropdown.Item>
                <TextIcon name='upload' color='blue' >Import Quotes</TextIcon>
              </Dropdown.Item>
              <Dropdown.Item>
                <TextIcon name='download' color='red' >Export Quotes</TextIcon>
              </Dropdown.Item>
              <Dropdown.Item onClick={handleDeleteQuotes}>
                <TextIcon name='trash' color='red'>Delete Selected</TextIcon>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Segment>
      <Segment basic attached className='c-search-section'>
        <Form>
          <Form.Group style={{ display: 'flex' }}>
            <Form.Field width={3}>
              <label className='c-black-label'>Customer</label>
              <Search
                ref={customerSearchRef}
                onSearchChange={debounce(handleSearchClients, 500, {
                  leading: false
                })}
                fluid
                onResultSelect={(e, data) => {
                  const event = { ...e };
                  handleFilterChange(event, data)
                }}
                placeholder="Search Customer"
                loading={clientsLoading}
                resultRenderer={(r) => {
                  if (!r._id) return ''
                  return (
                    <div key={r._id}>
                      <div><b>{stringifyClientName(r)}</b></div>
                    </div>
                  )
                }}
                minCharacters={0}
                results={clients}
                name='customerId'
                className='c-hover'
              />
            </Form.Field>
            <Form.Input
              width={3}
              fluid
              label='Quote #'
              placeholder='Please Type'
              className='c-black-label c-hover'
              onChange={debounce(handleFilterChange, 500, {
                leading: false
              })}
              name='text'
            />
            <Form.Field
              width={3}
              control={Select}
              options={statusOptions}
              label={{ children: 'Quote Status', htmlFor: 'form-select-control-status' }}
              placeholder='Please Select'
              search
              searchInput={{ id: 'form-select-control-status' }}
              name='status'
              className='c-black-label c-hover'
              onChange={debounce(handleFilterChange, 500, {
                leading: false
              })}
            />
            <Form.Field width={3}>
              <label className='c-black-label' style={{ paddingLeft: '0' }}>Date</label>
              <Popup on='click' basic trigger={<Input style={{ paddingLeft: '0px !important' }} icon='calendar alternate outline' className='c-hover' width={16} readOnly value={formatDateRange(searchParams.dateFrom, searchParams.dateTo)} />}>
                <div style={{ width: 560 }}>
                  <DateRange onChange={handleDateChange} startDate={searchParams.dateFrom && moment(searchParams.dateFrom)} endDate={searchParams.dateTo && moment(searchParams.dateTo)} className='PreviewArea' linkedCalendars={true} direction='horizontal' />
                </div>
              </Popup>
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
      <Segment loading={isLoading} basic className='marginless radiusless borderless' style={{ padding: 16 }}>
        <Segment attached style={{ backgroundColor: '#f9fafa', borderRadius: '10px 10px 0px 0px', display: 'flex' }}>
          <Header as='h3' style={{ alignSelf: 'center', flex: 1 }}>Quotes</Header>
          <div style={{ alignSelf: 'center' }}>
            <Label size='small' onClick={() => handleCalendarFilter('TODAY')} color={activeFilter === 'TODAY' ? 'blue' : ''} className='c-calendar-filter'>TODAY</Label>
            <Label size='small' onClick={() => handleCalendarFilter('YESTERDAY')} color={activeFilter === 'YESTERDAY' ? 'blue' : ''} className='c-calendar-filter'>YESTERDAY</Label>
            <Label size='small' onClick={() => handleCalendarFilter('THIS WEEK')} color={activeFilter === 'THIS WEEK' ? 'blue' : ''} className='c-calendar-filter'>THIS WEEK</Label>
            <Label size='small' onClick={() => handleCalendarFilter('THIS MONTH')} color={activeFilter === 'THIS MONTH' ? 'blue' : ''} className='c-calendar-filter'>THIS MONTH</Label>
            <Label size='small' onClick={() => handleCalendarFilter('LAST MONTH')} color={activeFilter === 'LAST MONTH' ? 'blue' : ''} className='c-calendar-filter'>LAST MONTH</Label>
            <Label size='small' onClick={() => handleCalendarFilter('THIS YEAR')} color={activeFilter === 'THIS YEAR' ? 'blue' : ''} className='c-calendar-filter'>THIS YEAR</Label>
            <Label size='small' onClick={() => handleCalendarFilter('ALL')} color={activeFilter === 'ALL' ? 'blue' : ''} className='c-calendar-filter'>ALL</Label>
          </div>
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
                <Checkbox onChange={handleSelectAll} checked={difference(quotesIds, selectedQuotes).length === 0 && quotesIds.length > 0 ? true : false} />
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => handleSort('estimateId')} className='c-sortable'>
                Quote # <Icon name={sortParams && !sortParams.estimateId ? 'sort' : (sortParams.estimateId === 'asc' ? 'caret down' : 'caret up')} />
              </Table.HeaderCell>
              <Table.HeaderCell className='c-sortable'>
                Customer Name <Icon name='sort' />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Service Address
              </Table.HeaderCell>
              <Table.HeaderCell onClick={() => handleSort('createdAt')} className='c-sortable'>
                Created Date <Icon name={sortParams && !sortParams.createdAt ? 'sort' : (sortParams.createdAt === 'asc' ? 'caret down' : 'caret up')} />
              </Table.HeaderCell>
              <Table.HeaderCell>
                Amount
              </Table.HeaderCell>
              <Table.HeaderCell>
                Status
              </Table.HeaderCell>
              <Table.HeaderCell>
                Actions
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {quotes.map(quote => {
              const name = quote.client && stringifyClientName(quote.client);
              const mobile = quote.client && stringifyPhone(quote.client);
              const email = quote.client && quote.client.email;
              return (
                <Table.Row key={quote._id}>
                  <Table.Cell>
                    <Checkbox checked={selectedQuotes.includes(quote._id)} onChange={() => handleSelect(quote._id)} />
                  </Table.Cell>
                  <Table.Cell>
                    <a onClick={() => handleViewQuote(quote._id)} style={{ cursor: 'pointer' }}>{quote.estimateId}</a>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon size='small' style={{ marginRight: 8, color: 'grey' }} name='user' />
                    {name}
                    {mobile && (
                      <p className='marginless'><Icon size='small' style={{ marginRight: 8, color: 'grey' }} name='phone' /> {mobile}</p>
                    )}
                    {email && (
                      <p><Icon size='small' style={{ marginRight: 8, color: 'grey' }} name='mail' />{email}</p>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Icon name='home' style={{ marginRight: 8 }} />
                    <a href={'https://www.google.com/maps/search/' + `${stringifyAddress(quote.propertyAddress)}`} target='_blank'>
                      {stringifyAddress(quote.propertyAddress)}
                    </a>
                  </Table.Cell>
                  <Table.Cell>{moment(quote.createdAt).format('LL')}</Table.Cell>
                  <Table.Cell>
                    ${processQuoteDetails(quote).gTotal}
                  </Table.Cell>
                  <Table.Cell>
                    {showStatus === quote._id ? (
                      <Select
                        options={statusOptions}
                        search
                        searchInput={{ id: 'form-select-control-status' }}
                        name='status'
                        style={{ width: 50 }}
                        className='c-dropdown-status'
                        onChange={(e, data) => {
                          handleStatusChange(e, data, quote._id)
                          setShowStatus(null)
                        }}
                        value={quote.status}
                      />
                    ) : (
                        <Label color={statusColors[quote.status.toLowerCase()]} onDoubleClick={() => setShowStatus(quote._id)}>{showStatusText(quote.status)}</Label>
                      )}
                  </Table.Cell>
                  <Table.Cell>
                    <Button icon='eye' compact size='mini' className='c-primary-btn' onClick={() => handleViewQuote(quote._id)} />
                    <Button icon='edit' compact size='mini' primary onClick={() => handleEditQuote(quote._id)} />
                    <Popup
                      trigger={
                        <Button size='mini' compact icon='trash' name='trash' negative></Button>
                      }
                      content={<Button onClick={() => handleDeleteQuote(quote)} negative compact content='Confirm delete' />}
                      on='click'
                      position='bottom right'
                    />
                    <Dropdown icon='ellipsis horizontal' style={{ padding: '.4em' }} size='large' pointing='top right' className='icon c-dropdown-list' scrolling button basic compact inline>
                      <Dropdown.Menu direction='left' className='c-dropdown-items' style={{ padding: 8 }}>
                        <Dropdown.Item>
                          View Quote
                        </Dropdown.Item>
                        <Dropdown.Item>
                          Edit Quote
                        </Dropdown.Item>
                        <Dropdown.Item>
                          Duplicate
                        </Dropdown.Item>
                        <Dropdown.Divider style={{ content: '', border: '1px dashed #dedede' }} />
                        <Dropdown.Item>
                          Convert To Job
                        </Dropdown.Item>
                        <Dropdown.Item>
                          Convert To Invoice
                        </Dropdown.Item>
                        <Dropdown.Item>
                          Request Deposit
                        </Dropdown.Item>
                        <Dropdown.Divider style={{ content: '', border: '1px dashed #dedede' }} />
                        <Dropdown.Item>
                          Export To PDF
                        </Dropdown.Item>
                        <Dropdown.Item>
                          Print
                        </Dropdown.Item>
                        <Dropdown.Item>
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
      <Modal
        open={showClientModal}
        size='small'
        centered={false}
      >
        <Modal.Header className='c-modal-header'>
          Select Client or Create Client
          <div style={{ flex: 1 }} />
          <Icon name='close' style={{ cursor: 'pointer' }} color='red' onClick={() => handleClientModal(false)} />
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Segment basic attached className='' style={{ display: 'flex', border: 'none', borderBottom: '1px solid #dedede' }}>
              <Form.Input style={{ width: 250 }} placeholder='Search Clients' onChange={debounce(handleSearchClients, 500, {
                leading: false
              })} />
              <div style={{ flex: 1 }} />
              <Button positive onClick={handleAddCustomer}><Icon name='add' />Create New</Button>
            </Segment>
            <Segment basic attached className='borderless'>
              <List divided verticalAlign='middle'>
                {!clientsLoading && clients && (
                  clients.map(client => {
                    return (
                      <List.Item key={client._id} onClick={() => {
                        handlePropertyModal(true, client);
                      }} style={{ padding: 8 }}>
                        <Icon name='user outline' size='large' />
                        <List.Content>
                          <List.Header as='a'>{stringifyClientName(client)}</List.Header>
                          {client.email && (
                            <p className='marginless' style={{ fontSize: 12 }}>
                              {client.email}
                            </p>
                          )}
                          <p className='marginless' style={{ fontSize: 12 }}>
                            1 Property
                          </p>
                        </List.Content>
                      </List.Item>
                    )
                  })
                )}
              </List>
            </Segment>
          </Modal.Description>
        </Modal.Content>
      </Modal>
      <Modal
        open={showPropertyModal}
        size='small'
        centered={false}
      >
        <Modal.Header>Select Property</Modal.Header>
        <Modal.Content>
          <List divided verticalAlign='middle'>
            <List.Item onClick={handleProperty} style={{ padding: 8 }}>
              <Icon name='map marker alternate' size='large' />
              <List.Content style={{ cursor: 'pointer', fontSize: 12 }}>
                <p className='marginless'>
                  {stringifyAddress(selectedClient && selectedClient.propertyDetails)}
                </p>
              </List.Content>
            </List.Item>
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => handlePropertyModal(false)}><Icon name='close' />Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default Quotes;
