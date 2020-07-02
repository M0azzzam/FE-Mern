import React from 'react';
import { Link } from 'react-router-dom';
import {
  Segment,
  Breadcrumb,
  Form,
  Grid,
  Select,
  Button,
  Icon,
  Table,
  Popup,
  Input,
  Accordion,
  TextArea,
  List,
  Checkbox,
  Search,
} from 'semantic-ui-react';
import Header from '../../../extension/Heading';
import { DateInput } from 'semantic-ui-calendar-react';
import DropzoneComponent from 'react-dropzone-component';
import moment from 'moment';
import debounce from 'lodash/debounce';
import { lineItemTotal } from '../../../../utils/quotes';
import clsx from 'clsx';

const AddQuoteForm = props => {

  const {
    djsConfig,
    componentConfig,
    eventHandlers,
    showAccordian,
    setAccordian,
    isQuoteNumEditing,
    setQuoteNumEditing,
    handleAddLineItem,
    handleDeleteLineItem,
    handleInputChange,
    handleLineItemInputChange,
    handleLineItemOption,
    handleDateInput,
    handleAddDiscount,
    handleDiscountType,
    handleDiscountInput,
    handleAddDeposit,
    handleTax,
    handleCreateTaxClass,
    handleShowTax,
    handleEstimateChange,
    handleDepositChange,
    handleSearchInventory,
    handleFetchNewEstimate,
    handleContinue,
    handleAddInventory,
    save,
    lineItem,
    lineItems,
    discountOptions,
    taxes,
    data,
    propertyData,
    getContactDetails,
    getTaxDetails,
    selectedClient,
    subTotal,
    grandTotal,
    discount,
    deposit,
    tax,
    quote,
    IS_UPDATING,
    lineItemSearchRef,
    inventory = [],
    inventoryLoading,
    addressesMatch,
    handleLineItemsInputChange,
    formatClientName,
    estimateError,
    errors,
  } = props.data || {};

  return (
    <div>
      <Segment basic attached className='c-breadcrumb-section'>
        <Breadcrumb style={{ flex: 1, lineHeight: '36px' }}>
          <Breadcrumb.Section as={Link} to='/app/dashboard'>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Quote</Breadcrumb.Section>
        </Breadcrumb>
      </Segment>
      <Segment basic attached className='c-search-section'>
        <Grid>
          <Grid.Column width={12}>
            <Grid.Row>
              <Header as='h3' className='c-primary-color'>Quotes #{' '}
                {isQuoteNumEditing ?
                  <Input onChange={handleEstimateChange} name='estimateId' size='mini' value={data.estimateId} onBlur={() => setQuoteNumEditing(false)} style={{ width: '80px' }} />
                  :
                  <a onClick={() => setQuoteNumEditing(true)}>{data.estimateId}</a>
                }
              </Header>
              {estimateError && (
                <>
                  <Button size='mini' onClick={handleFetchNewEstimate} compact primary>Fetch New Estimate Number</Button>
                  <Button size='mini' onClick={handleContinue} compact negative>Continue Anyway</Button>
                </>
              )}
              <Form style={{ marginTop: 16 }}>
                <Form.Group style={{ marginBottom: 0 }}>
                  <Form.Field width={16} className='paddingless'>
                    <Header as='h4' className='c-primary-color' style={{ marginLeft: '.5em', marginBottom: '.28571429rem' }}>Job Title</Header>
                    <Form.Input width={9} name='name' value={data.name} onChange={handleInputChange} placeholder='Please Type' />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form>
              <Button positive onClick={() => { }}><Icon name='add' />Add Custom Field</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment basic attached className='c-search-section'>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={12}>
              <Form style={{ marginTop: 16 }}>
                <Header as='h4' className='c-primary-color'>Customer Details</Header>
                <p className='c-primary-color' style={{ marginTop: 0 }}>
                  {formatClientName()}
                </p>
                {selectedClient._id && (
                  <Grid>
                    {IS_UPDATING ?
                      <Grid.Row>
                        <Grid.Column width={5}>
                          {quote && quote.client && quote.client.billingAddress && (
                            <a href={'https://www.google.com/maps/search/' + `${getContactDetails(quote.client.billingAddress)}`} target='_blank'>{getContactDetails(quote.client.billingAddress)}</a>
                          )}
                          {selectedClient && selectedClient.email && (
                            <p className='c-primary-color'>
                              {selectedClient.email}
                            </p>
                          )}
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <Header as='h4' className='c-primary-color'>Service Address</Header>
                          {addressesMatch(quote.client && quote.client.billingAddress, quote.propertyAddress) ? <p className='c-primary-color'>(Same as billing address)</p> : <a href={'https://www.google.com/maps/search/' + `${getContactDetails(quote.propertyAddress)}`} target='_blank'>{getContactDetails(quote.propertyAddress)}</a>}
                        </Grid.Column>
                      </Grid.Row>
                      :
                      <Grid.Row>
                        <Grid.Column width={5}>
                          <Header as='h4' className='c-primary-color'>Contact Details</Header>
                          <a href={'https://www.google.com/maps/search/' + `${getContactDetails(selectedClient.billingAddress)}`} target='_blank'>{getContactDetails(selectedClient.billingAddress)}</a>
                          {selectedClient && selectedClient.email && (
                            <p className='c-primary-color'>
                              {selectedClient.email}
                            </p>
                          )}
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <Header as='h4' className='c-primary-color'>Service Address</Header>
                          {addressesMatch((quote && quote.client && quote.client.billingAddress), propertyData) ? <p className='c-primary-color'>(Same as billing address)</p> : <a href={'https://www.google.com/maps/search/' + `${getContactDetails(propertyData)}`} target='_blank'>{getContactDetails(propertyData)}</a>}
                        </Grid.Column>
                      </Grid.Row>}
                  </Grid>
                )}
                <Form.Group style={{ marginTop: 16 }}>
                  <Form.Field width={3}>
                    <label>Quote Issue Date</label>
                    <DateInput
                      name="issueDate"
                      value={moment(data.issueDate).format('MMM DD, YYYY')}
                      iconPosition="right"
                      onChange={(...data) => handleDateInput(data)}
                      icon='calendar alternate outline'
                      closable={true}
                      animation={'none'}
                    />
                  </Form.Field>
                  <Form.Input label='P.O / S.O' width={3} value={data.poso} name='poso' onChange={handleInputChange} />
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment basic loading={false} className='marginless radiusless borderless' style={{ padding: 16 }}>
        <div className={clsx(errors && 'backgroundBlink')} style={{ marginBottom: 8, position: 'relative' }}>
          <Table compact structured unstackable className='c-table'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Product / Service
              </Table.HeaderCell>
                <Table.HeaderCell>
                  Description
              </Table.HeaderCell>
                <Table.HeaderCell>
                  QTY
              </Table.HeaderCell>
                <Table.HeaderCell>
                  Unit Price
              </Table.HeaderCell>
                <Table.HeaderCell>
                  Total
              </Table.HeaderCell>
                <Table.HeaderCell>
                  Action
              </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {lineItems.map((lItem, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      <Form.Field>
                        {lItem.name}
                      </Form.Field>
                    </Table.Cell>
                    <Table.Cell>
                      {lItem.description}
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input fluid name='qty' value={lItem.qty} onChange={(e) => handleLineItemsInputChange(e, index)} className='c-form-input-field c-form-input-qty' />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input icon='dollar' iconPosition='left' fluid name='unitCost' value={lItem.unitCost} onChange={(e) => handleLineItemsInputChange(e, index)} className='c-form-input-field c-form-input-qty' />
                    </Table.Cell>
                    <Table.Cell>
                      <Form.Input icon='dollar' iconPosition='left' fluid name='total' value={lineItemTotal(lItem)} onChange={(e) => handleLineItemsInputChange(e, index)} className='c-form-input-field c-form-input-qty' />
                    </Table.Cell>
                    <Table.Cell style={{ width: 50 }}>
                      <Button icon='trash' compact negative onClick={() => handleDeleteLineItem(index)} />
                    </Table.Cell>
                  </Table.Row>
                )
              })}
              <Table.Row>
                <Table.Cell>
                  <Form>
                    <Form.Field>
                      <Search
                        ref={lineItemSearchRef}
                        onSearchChange={debounce(handleSearchInventory, 500, {
                          leading: false
                        })}
                        fluid
                        onResultSelect={(e, data) => {
                          const event = { ...e };
                          handleLineItemOption(event, data)
                        }}
                        placeholder="Search product or service"
                        loading={inventoryLoading}
                        resultRenderer={(r) => {
                          if (!r._id) return ''
                          return (
                            <div>
                              <div><b>{r.name}</b></div>
                              <div style={{ fontSize: '10px', display: 'flex' }}>
                                <span style={{ flex: 1 }}>Type: {r.type}</span>
                                <span>{r.inventoryStock && r.inventoryStock.quantity}</span>
                              </div>
                            </div>
                          )
                        }}
                        minCharacters={0}
                        results={inventory}
                        noResultsMessage={
                          <div style={{ display: 'flex' }}>
                            <div className='c-align-self-center' style={{ flex: 1 }}>No results match</div>
                            <Button compact size='tiny' primary onClick={handleAddInventory}><Icon name='add' />Add New</Button>
                          </div>
                        }
                      />
                    </Form.Field>
                  </Form>
                </Table.Cell>
                <Table.Cell>
                  <Form.Input fluid placeholder='Please Type' name='description' value={lineItem.description} onChange={(e) => handleLineItemInputChange(e)} className='c-form-input-field' />
                </Table.Cell>
                <Table.Cell style={{ width: '110px' }}>
                  <Form.Input fluid name='qty' value={lineItem.qty} onChange={(e) => handleLineItemInputChange(e)} className='c-form-input-field c-form-input-qty' />
                </Table.Cell>
                <Table.Cell style={{ width: '110px' }}>
                  <Form.Input icon='dollar' iconPosition='left' fluid name='unitCost' value={lineItem.unitCost} onChange={(e) => handleLineItemInputChange(e)} className='c-form-input-field c-form-input-qty' />
                </Table.Cell>
                <Table.Cell>
                  <Form.Input icon='dollar' iconPosition='left' fluid name='total' value={lineItemTotal(lineItem)} onChange={(e) => handleLineItemInputChange(e)} className='c-form-input-field c-form-input-qty' />
                </Table.Cell>
                <Table.Cell style={{ width: 50 }}>
                  <Button icon='add' compact positive onClick={() => handleAddLineItem()} />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <Grid columns={1} style={{ display: 'flex' }}>
          <div style={{ flex: 1 }} />
          <Grid.Column width={6}>
            <Segment basic className='marginless radiusless c-sub-total'>
              <Form>
                <Form.Group widths='equal' className='c-sub-total-item marginless'>
                  <Form.Field>
                    <Header as='h5'>Sub Total</Header>
                  </Form.Field>
                  <Form.Field >
                    <Header as='h5' className='c-text-right'>${subTotal}</Header>
                  </Form.Field>
                </Form.Group>
                <Form.Group className='c-sub-total-item marginless' style={{ display: 'flex' }}>
                  <Form.Field className='c-align-self-center'>
                    <Header as='h5'>Discount</Header>
                  </Form.Field>
                  <div style={{ flex: '1' }} />
                  {discount ? (
                    <>
                      <Form.Field width={5}>
                        <Input name='value' value={data.discount.value} onChange={handleDiscountInput} />
                      </Form.Field>
                      <Form.Field width={3}>
                        <Select compact style={{ minWidth: 'auto' }} options={discountOptions} value={data.discount.type} name='type' onChange={(...params) => handleDiscountType(params)} />
                      </Form.Field>
                      <Form.Field>
                        <Button icon='trash' basic negative onClick={() => handleAddDiscount(false)} />
                      </Form.Field>
                    </>
                  ) : (
                      <Form.Field width={5}>
                        <Button fluid basic primary compact onClick={() => handleAddDiscount(true)}>Add Discount</Button>
                      </Form.Field>
                    )}
                </Form.Group>
                <Form.Group className='c-sub-total-item marginless' style={{ display: 'flex' }}>
                  <Form.Field className='c-align-self-center'>
                    <Header as='h5'>
                      {tax ? (
                        getTaxDetails()
                      ) : 'Tax'}
                    </Header>
                  </Form.Field>
                  <div style={{ flex: 1 }} />
                  <Form.Field className='c-text-right' width={5}>
                    {tax ? (
                      <Button icon='trash' basic negative onClick={() => handleShowTax(false)} />
                    ) : (
                        <Popup
                          trigger={
                            <Button fluid basic primary compact>Add Tax</Button>
                          }
                          content={
                            <List divided relaxed size='medium'>
                              <List.Item disabled>
                                <List.Content>
                                  <List.Header as='a'>Select Tax Rate</List.Header>
                                </List.Content>
                              </List.Item>
                              {taxes.map((tax, index) =>
                                (
                                  <List.Item key={index}>
                                    <Checkbox
                                      fitted
                                      radio
                                      label={`${tax.name} (${tax.value}${tax.unit === 'PERCENTAGE' ? '%' : '$'})`}
                                      name='tax'
                                      value={tax._id}
                                      checked={data.tax.toString() === tax._id.toString()}
                                      onChange={(event, data) => handleTax(data)}
                                    />
                                  </List.Item>
                                )
                              )}
                              <List.Item>
                                <Button compact basic icon='add' size='tiny' onClick={handleCreateTaxClass} content='Create Tax Class' />
                              </List.Item>
                            </List>
                          }
                          on='click'
                          position='left center'
                        />
                      )}
                  </Form.Field>
                </Form.Group>
                <Form.Group className='c-sub-total-item marginless' style={{ display: 'flex' }}>
                  <Form.Field className='c-align-self-center'>
                    <Header as='h5'>Deposits</Header>
                  </Form.Field>
                  <div style={{ flex: 1 }} />
                  {deposit ? (
                    <>
                      <Form.Field width={5}>
                        <Input name='deposit' value={data.deposit} onChange={handleDepositChange} />
                      </Form.Field>
                      <Form.Field>
                        <Button icon='trash' basic negative onClick={() => handleAddDeposit(false)} />
                      </Form.Field>
                    </>
                  ) : (
                      <Form.Field width={5}>
                        <Button fluid basic primary compact onClick={() => handleAddDeposit(true)}>Add Deposits</Button>
                      </Form.Field>
                    )}
                </Form.Group>
                <Form.Group widths='equal' style={{ padding: 10, backgroundColor: '#f9fafa' }} className='marginless'>
                  <Form.Field className='c-align-self-center'>
                    <Header as='h4'>Total</Header>
                  </Form.Field>
                  <Form.Field>
                    <Header className='c-text-right' as='h4'>${grandTotal}</Header>
                  </Form.Field>
                </Form.Group>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
        <Segment basic className='radiusless c-client-notes'>
          <Form>
            <Header as='h3'>Client Notes</Header>
            <Input width={3} name='clientMessage' value={data.clientMessage} onChange={handleInputChange} fluid className='c-form-input-field-borderless' placeholder='Enter notes that are visible to your customer' />
          </Form>
        </Segment>
        <Segment className='radiusless' style={{ padding: '4px 10px', boxShadow: 'none', backgroundColor: '#fefefe' }}>
          <Accordion>
            <Accordion.Title
              active={showAccordian}
              index={0}
              onClick={() => setAccordian(!showAccordian)}
              style={{ display: 'flex' }}
            >
              <span style={{ flex: 1, fontSize: '1.28rem', fontWeight: '700' }}>Staff Notes and Attachments</span>
              <Icon name={`chevron ${showAccordian ? 'up' : 'down'}`} />
            </Accordion.Title>
            <Accordion.Content active={showAccordian}>
              <Grid>
                <Grid.Column width={8}>
                  <Header as='h5' style={{ margin: '8px 2px' }}>Staff Notes</Header>
                  <TextArea name='staffMessage' onChange={handleInputChange} value={data.staffMessage} className='c-staff-notes' />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header as='h5' style={{ margin: '8px 2px' }}>Attachments</Header>
                  <Segment basic className='marginless c-attachments'>
                    <DropzoneComponent config={componentConfig}
                      eventHandlers={eventHandlers}
                      djsConfig={djsConfig}
                      className='c-dropzone'
                    />
                  </Segment>
                </Grid.Column>
              </Grid>
            </Accordion.Content>
          </Accordion>
        </Segment>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }} />
          <Button color={IS_UPDATING ? 'blue' : 'green'} onClick={() => save(false)} className='marginless'><Icon name={IS_UPDATING ? 'edit' : 'add'} />{IS_UPDATING ? 'Update' : 'Create'} Quote</Button>
        </div>
      </Segment>
    </div>
  )
}

export default AddQuoteForm;
