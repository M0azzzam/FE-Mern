import React from 'react';
import { Link } from 'react-router-dom';
import {
  Segment,
  Breadcrumb,
  Grid,
  Form,
  Label,
  Button,
  Icon,
  Dropdown,
  Table,
  Accordion,
  TextArea,
  Input
} from 'semantic-ui-react';
import moment from 'moment';
import Header from '../../../extension/Heading';
import DropzoneComponent from 'react-dropzone-component';
import { lineItemTotal, stringifyClientName, stringifyAddress } from '../../../../utils/quotes';
import quotePdf from '../../../../utils/quotePdf';

const ViewQuote = props => {

  const {
    djsConfig,
    componentConfig,
    eventHandlers,
    showAccordian,
    setAccordian,
    quote = {},
    isLoading,
    getTaxDetails,
    subTotal,
    grandTotal,
    taxTotal,
    discountTotal,
    depositsTotal,
    amountDue,
    handleEditQuote,
    showStatusText,
    statusColors
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
        <div style={{ display: 'flex' }}>
          <Header as='h3' style={{ marginRight: 8 }}>
            Quotes # <a>{quote.estimateId}</a>
          </Header>
          <Label color={statusColors[quote.status && quote.status.toLowerCase()]}>{showStatusText(quote.status)}</Label>
        </div>
        <div style={{ display: 'flex', marginTop: 8 }}>
          <Button primary compact onClick={handleEditQuote}> <Icon name='edit' />Edit</Button>
          <Button primary compact onClick={() => quotePdf('print', quote)}> <Icon name='print' />Print</Button>
          <div style={{ flex: 1 }}></div>
          <Button primary compact> <Icon name='send' />Send<Icon name='caret down' size='small' style={{ marginLeft: 4 }} /></Button>
          <Button primary compact onClick={() => quotePdf('open', quote)}> <Icon name='file pdf' />Export To PDF</Button>
          <Dropdown as={Button} primary text='More Actions'>
            <Dropdown.Menu direction='left' className='c-dropdown-items'>
              <Dropdown.Item>
                <p name='upload' color='blue' >Import Quotes</p>
              </Dropdown.Item>
              <Dropdown.Item>
                <p name='download' color='red' >Export Quotes</p>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Segment>
      <Segment basic attached className='c-search-section'>
        <Grid columns={4}>
          <Grid.Row>
            <Grid.Column>
              <Header as='h3' style={{ marginBottom: 8 }} className='c-primary-color'>Customer Details</Header>
              {quote.client && quote.client._id && (
                <>
                  <p className='c-primary-color'>
                    {stringifyClientName(quote.client)}
                  </p>
                  {quote.client.billingAddress && (
                    <a href={'https://www.google.com/maps/search/' + `${stringifyAddress(quote.client.billingAddress)}`} target='_blank'>{stringifyAddress(quote.client.billingAddress)}</a>
                  )}
                  {quote.client.email && (
                    <p className='c-primary-color'>
                      <a href={`mailto:${quote.client.email}`}>{quote.client.email}</a>
                    </p>
                  )}
                </>
              )}
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' style={{ marginBottom: 8 }} className='c-primary-color'>Service Address</Header>
              {quote.propertyAddress && (
                <a href={'https://www.google.com/maps/search/' + `${stringifyAddress(quote.propertyAddress)}`} target='_blank'>{stringifyAddress(quote.propertyAddress)}</a>
              )}
            </Grid.Column>
            <Grid.Column>
              {/* <Header as='h3' style={{ marginBottom: 8 }} className='c-primary-color'>Custom Fields</Header> */}
            </Grid.Column>
            <Grid.Column>
              <Header as='h3' style={{ marginBottom: 8 }} className='c-primary-color'>Quote Details</Header>
              <Segment basic className='marginless radiusless borderless' style={{ padding: 0, backgroundColor: '#fff' }}>
                <Form>
                  <Form.Group widths='equal' className='c-sub-total-item-quote marginless'>
                    <Form.Field>
                      Quote #
                    </Form.Field>
                    <Form.Field className='c-text-right'>
                      {quote.estimateId}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal' className='c-sub-total-item-quote marginless'>
                    <Form.Field>
                      Quote Date
                    </Form.Field>
                    <Form.Field className='c-text-right'>
                      {moment(quote.issueDate).format('MMM DD, YYYY')}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal' className='c-sub-total-item-quote marginless'>
                    <Form.Field>
                      Amount
                    </Form.Field>
                    <Form.Field className='c-text-right'>
                      ${grandTotal}
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal' className='c-sub-total-item-quote marginless'>
                    <Form.Field>
                      Created by
                    </Form.Field>
                    <Form.Field className='c-text-right'>
                      Abdul Majid
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths='equal' className='c-sub-total-item-quote marginless'>
                    <Form.Field>
                      Source
                    </Form.Field>
                    <Form.Field className='c-text-right'>
                      Facebook
                    </Form.Field>
                  </Form.Group>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment basic loading={false} className='marginless radiusless borderless' style={{ padding: 16 }}>
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
            </Table.Row>
          </Table.Header>
          {quote.lineItems && quote.lineItems.length > 0 && (
            <Table.Body>
              {quote.lineItems.map((lineItem, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell>
                      {lineItem && lineItem.item && lineItem.item.name}
                    </Table.Cell>
                    <Table.Cell>
                      {lineItem && lineItem.description}
                    </Table.Cell>
                    <Table.Cell className='c-cell-qty'>
                      {lineItem && lineItem.qty}
                    </Table.Cell>
                    <Table.Cell className='c-cell-qty'>
                      ${lineItem && lineItem.unitCost}
                    </Table.Cell>
                    <Table.Cell className='c-cell-qty'>
                      ${lineItemTotal(lineItem)}
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          )}
        </Table>
        <Grid columns={1} style={{ display: 'flex' }}>
          <div style={{ flex: 1 }} />
          <Grid.Column width={6}>
            <Segment basic className='marginless radiusless c-sub-total'>
              <Form>
                <Form.Group widths='equal' className='c-sub-total-item marginless'>
                  <Form.Field>
                    <Header as='h5'>Sub Total</Header>
                  </Form.Field>
                  <Form.Field>
                    <Header as='h5' className='c-text-right'>${subTotal}</Header>
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal' className='c-sub-total-item marginless'>
                  <Form.Field>
                    <Header as='h5'>Discount</Header>
                  </Form.Field>
                  <Form.Field>
                    <Header as='h5' className='c-text-right'>${discountTotal}</Header>
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal' className='c-sub-total-item marginless'>
                  <Form.Field>
                    <Header as='h5'>{getTaxDetails()}</Header>
                  </Form.Field>
                  <Form.Field>
                    <Header as='h5' className='c-text-right'>${taxTotal}</Header>
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal' className='c-sub-total-item marginless'>
                  <Form.Field>
                    <Header as='h5'>Deposits</Header>
                  </Form.Field>
                  <Form.Field>
                    <Header as='h5' className='c-text-right'>${depositsTotal}</Header>
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal' style={{ padding: 10, backgroundColor: '#f9fafa' }} className='marginless'>
                  <Form.Field>
                    <Header as='h4'>Total</Header>
                  </Form.Field>
                  <Form.Field>
                    <Header as='h4' className='c-text-right'>${grandTotal}</Header>
                  </Form.Field>
                </Form.Group>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
        <Segment basic className='radiusless c-client-notes'>
          <Form>
            <Header as='h3'>Client Notes</Header>
            <Input width={3} fluid className='c-form-input-field-borderless' value={quote.clientMessage} disabled />
          </Form>
        </Segment>
        <Segment className='radiusless' style={{ padding: '4px 10px', boxShadow: 'none' }}>
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
                  <TextArea className='c-staff-notes' value={quote.staffMessage} disabled />
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
      </Segment>
    </div>
  )
}

export default ViewQuote;
