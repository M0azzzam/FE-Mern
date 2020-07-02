import React from 'react';
import {Link} from 'react-router-dom';
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
  Label,
  Header,
  Comment,
  Menu,
  Divider,
  Search
} from 'semantic-ui-react';
import {Editor} from 'react-draft-wysiwyg';
import DropzoneComponent from 'react-dropzone-component';
import debounce from "lodash/debounce";
import moment from "moment";
import {DateInput, TimeInput} from "semantic-ui-calendar-react";
import clsx from 'clsx'

const AddJobForm = props => {

  const {
    lineItems,
    lineItem,
    expenseArray,
    expense,
    data,
    handleInputChange,
    onSelectChange,
    handleLineItemsInputChange,
    handleLineItemInputChange,
    handleAddLineItem,
    handleDeleteLineItem,
    handleExpenseInputChange,
    onSelectExpenseChange,
    handleExpenseLineItemInputChange,
    onSelectExpenseLineItemChange,
    handleExpenseDateInputChange,
    handleExpenseCheckBoxChange,
    handleAddTimeTracking,
    handleAddExpense,
    schedule,
    scheduleArray,
    handleAddSchedule,
    handleScheduleInputChange,
    handleScheduleDateInput,
    date,
    reminder,
    handleReminderButtons,
    handleReminderInputChange,
    handleReminderDateTimeInput,
    onSelectReminderChange,
    handleAddReminder,
    onSelectScheduleChange,
    onSelectInternalNotesChange,
    handleInternalNotesInputChange,
    internalNotes,
    internalNotesViaOptions,
    handleAddInternalNotes,

    lineItemSearchRef,
    handleSearchInventory,
    handleLineItemOption,
    inventoryOptions,
    inventoryLoading,
    inventory,
    clientsOptions,
    employeeOptions,
    paymentTypeOptions,
    djsConfig,
    componentConfig,
    showLine_itemAccordian,
    setLine_itemAccordian,
    showScheduleVisitAccordian,
    setScheduleVisitAccordian,
    showExpenseAccordian,
    showActivityAccordian,
    setActivityAccordian,
    activeActivityMenu,
    setActiveActivityMenu,
    handleExpenseAccordian
  } = props.data || {};

  return (
    <div>
      <Segment basic attached className='c-breadcrumb-section'>
        <Breadcrumb style={{flex: 1, lineHeight: '36px'}}>
          <Breadcrumb.Section as={Link} to='/app/dashboard'>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Job</Breadcrumb.Section>
        </Breadcrumb>
      </Segment>
      <Segment basic attached className='c-job-section'>
        <Grid>
          <Grid.Row style={{paddingBottom: 0}}>
            <Grid.Column width={16}>
              <Header as='h3' className='c-primary-color'>Job #{' '}
                {false ?
                  <Input name='estimateId' size='mini' value={'1'} onBlur={() => {
                  }} style={{width: '80px'}}/>
                  :
                  <a onClick={() => {
                  }}>12</a>
                }
              </Header>
              {false && (
                <>
                  <Button size='mini' onClick={() => {
                  }} compact primary>Fetch New Estimate Number</Button>
                  <Button size='mini' onClick={() => {
                  }} compact negative>Continue Anyway</Button>
                </>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Form>
                <Form.Group>
                  <Form.Field width={16} className='paddingless'>
                    <Header as='h4' className='c-primary-color'
                            style={{marginLeft: '.5em', marginBottom: '.28571429rem'}}>
                      Customer
                      <sup className='c-required'>*</sup>
                    </Header>
                    <div style={{display: 'flex'}}>
                      <Form.Select options={clientsOptions} name='customer' value={data.customer} width={12}
                                   onChange={onSelectChange}></Form.Select>
                      <Button icon positive onClick={() => {
                        console.log(expenseArray)
                      }}><Icon name='add'/></Button>
                    </div>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={16} className='paddingless'>
                    <Header as='h4' className='c-primary-color'
                            style={{marginLeft: '.5em', marginBottom: '.28571429rem'}}>
                      Job Title
                      <sup className='c-required'>*</sup>
                    </Header>
                    <Form.Input width={12} name='title' value={data.title} onChange={handleInputChange}/>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={16} className='paddingless'>
                    <Header as='h4' className='c-primary-color'
                            style={{marginLeft: '.5em', marginBottom: '.28571429rem'}}>
                      Job Description
                      <sup className='c-required'>*</sup>
                    </Header>
                    <Form.TextArea rows={5} width={12} name='description' value={data.description}
                                   onChange={handleInputChange}/>
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
            <Grid.Column width={6}>
              <Segment style={{marginTop: '23px'}}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column><label>Job Details</label></Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={6}><label>Job Number</label></Grid.Column>
                    <Grid.Column width={2}> <label>10</label> </Grid.Column>
                    <Grid.Column width={5}><label>Change</label></Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Button positive onClick={() => {
                        console.log('testing', scheduleArray)
                      }}><Icon name='add'/>Add Custom Field</Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment className='c-segment-content' basic attached>
        <Header>
          <Icon name='calendar'/>
          <Header.Content>
            New Job Information
            <Header.Subheader>A one time job with one or more visits</Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
      <Segment basic className='marginless radiusless borderless c-segment-content'>
        <Segment className='radiusless c-accordian-segment shadowless' attached>
          <Accordion className='radiusless'>
            <Accordion.Title
              active={showLine_itemAccordian}
              index={0}
              onClick={() => setLine_itemAccordian(!showLine_itemAccordian)}
              style={{display: 'flex'}}
            >
              <span className='c-accordian-title'>Line Items</span>
              <Icon name={`chevron ${showLine_itemAccordian ? 'up' : 'down'}`}/>
            </Accordion.Title>
          </Accordion>
        </Segment>
        {showLine_itemAccordian && (
          <Segment basic attached className='marginless radiusless'>
            {expenseArray.map((expense, index) => {
              return expense.lineItem && expense.lineItem.item ? (
                <Form>
                  <Form.Group>
                    <Form.Input name="item" value={expense.lineItem.name}
                                onChange={handleLineItemsInputChange}
                                width={5} fluid label='Product/Service'/>
                    <Form.Input name="description" value={expense.lineItem.description}
                                onChange={handleLineItemsInputChange} width={5} fluid
                                label='Description'/>
                    <Form.Input name="qty" value={expense.lineItem.qty}
                                onChange={handleLineItemsInputChange}
                                width={2} className='c-form-input-field c-form-input-qty' fluid label='Qty'/>
                    <Form.Input name="unitCost" value={expense.lineItem.unitCost}
                                onChange={handleLineItemsInputChange} width={2}
                                className='c-form-input-field c-form-input-qty' fluid label='Unit Cost'
                                icon='dollar' iconPosition='left'/>
                    <Form.Input name="total" width={2} className='c-form-input-field c-form-input-qty' fluid
                                label='Total'
                                icon='dollar' iconPosition='left'/>
                    <Form.Field className='c-field-btn'>
                      <Button negative onClick={handleDeleteLineItem} positive icon><Icon
                        name='trash'/></Button>
                    </Form.Field>
                  </Form.Group>
                </Form>
              ) : false
            })}
            <Form>
              <Form.Group>
                <Form.Field width={5}>
                  <label>Product/Service</label>
                  <Search
                    ref={lineItemSearchRef}
                    onSearchChange={debounce(handleSearchInventory, 500, {
                      leading: false
                    })}
                    fluid
                    onResultSelect={(e, data) => {
                      const event = {...e};
                      handleLineItemOption(event, data)
                    }}
                    placeholder="Search product or service"
                    loading={inventoryLoading}
                    resultRenderer={(r) => {
                      if (!r._id) return ''
                      return (
                        <div>
                          <div><b>{r.name}</b></div>
                          <div style={{fontSize: '10px', display: 'flex'}}>
                            <span style={{flex: 1}}>Type: {r.type}</span>
                            <span>{r.inventoryStock && r.inventoryStock.quantity}</span>
                          </div>
                        </div>
                      )
                    }}
                    minCharacters={0}
                    results={inventory}
                    noResultsMessage={
                      <div style={{display: 'flex'}}>
                        <div className='c-align-self-center' style={{flex: 1}}>No results match</div>
                        {/*onClick={handleAddInventory}*/}
                        <Button compact size='tiny' primary><Icon name='add'/>Add
                          New</Button>
                      </div>
                    }
                  />
                </Form.Field>

                {/*<Form.Input name="item" value={lineItem.item} onChange={(e) => handleLineItemInputChange(e)} width={5}*/}
                {/*            fluid label='Product/Service'/>*/}
                <Form.Input name="description" value={lineItem.description}
                            onChange={(e) => handleLineItemInputChange(e)} width={5} fluid label='Description'/>
                <Form.Input name="qty" value={lineItem.qty} onChange={(e) => handleLineItemInputChange(e)} width={2}
                            className='c-form-input-field c-form-input-qty' fluid label='Qty'/>
                <Form.Input name="unitCost" value={lineItem.unitCost} onChange={(e) => handleLineItemInputChange(e)}
                            width={2} className='c-form-input-field c-form-input-qty' fluid label='Unit Cost'
                            icon='dollar' iconPosition='left'/>
                <Form.Input width={2} className='c-form-input-field c-form-input-qty' fluid label='Total' icon='dollar'
                            iconPosition='left'/>
                <Form.Field className='c-field-btn'>
                  <Button positive icon onClick={() => handleAddLineItem()}><Icon name='add'/></Button>
                </Form.Field>
              </Form.Group>
            </Form>
          </Segment>
        )}
        <Segment basic className='marginless paddingless radiusless borderless'>
          <Grid columns={1} className='marginless paddingless' style={{display: 'flex'}}>
            <div style={{flex: 1}}/>
            <Grid.Column width={6} className='marginless paddingless c-sub-total2'>
              <Form>
                <Form.Group widths='equal' className='c-sub-total-item marginless'>
                  <Form.Field>
                    <Header as='h5'>Sub Total</Header>
                  </Form.Field>
                  <Form.Field>
                    <Header as='h5' className='c-text-right'></Header>
                  </Form.Field>
                </Form.Group>
                <Form.Group className='c-sub-total-item marginless' style={{display: 'flex'}}>
                  <Form.Field className='c-align-self-center'>
                    <Header as='h5'>Discount</Header>
                  </Form.Field>
                  <div style={{flex: '1'}}/>
                  {'' ? (
                    <>
                      <Form.Field width={5}>
                        <Input name='value'/>
                      </Form.Field>
                      <Form.Field width={3}>
                        <Select compact style={{minWidth: 'auto'}} name='type'/>
                      </Form.Field>
                      <Form.Field>
                        <Button icon='trash' basic negative/>
                      </Form.Field>
                    </>
                  ) : (
                    <Form.Field width={5}>
                      <Button fluid basic primary compact>Add Discount</Button>
                    </Form.Field>
                  )}
                </Form.Group>
                <Form.Group className='c-sub-total-item marginless' style={{display: 'flex'}}>
                  <Form.Field className='c-align-self-center'>
                    <Header as='h5'>
                      {'Tax'}
                    </Header>
                  </Form.Field>
                  <div style={{flex: 1}}/>
                  <Form.Field className='c-text-right' width={5}>
                    {'' ? (
                      <Button icon='trash' basic negative/>
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
                            {[0, 1].map((tax, index) =>
                              (
                                <List.Item key={index}>
                                  <Checkbox
                                    fitted
                                    radio
                                    label='label'
                                    name='tax'
                                  />
                                </List.Item>
                              )
                            )}
                            <List.Item>
                              <Button compact basic icon='add' size='tiny' content='Create Tax Class'/>
                            </List.Item>
                          </List>
                        }
                        on='click'
                        position='left center'
                      />
                    )}
                  </Form.Field>
                </Form.Group>
                <Form.Group className='c-sub-total-item marginless' style={{display: 'flex'}}>
                  <Form.Field className='c-align-self-center'>
                    <Header as='h5'>Deposits</Header>
                  </Form.Field>
                  <div style={{flex: 1}}/>
                  {'' ? (
                    <>
                      <Form.Field width={5}>
                        <Input name='deposit'/>
                      </Form.Field>
                      <Form.Field>
                        <Button icon='trash' basic negative/>
                      </Form.Field>
                    </>
                  ) : (
                    <Form.Field width={5}>
                      <Button fluid basic primary compact>Add Deposits</Button>
                    </Form.Field>
                  )}
                </Form.Group>
                <Form.Group widths='equal' style={{padding: 10, backgroundColor: '#f9fafa'}} className='marginless'>
                  <Form.Field className='c-align-self-center'>
                    <Header as='h4'>Total</Header>
                  </Form.Field>
                  <Form.Field>
                    <Header className='c-text-right' as='h4'></Header>
                  </Form.Field>
                </Form.Group>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment>
      <Segment basic className='radiuless borderless marginless c-segment-content'>
        <Segment className='radiusless paddingless c-accordian-segment shadowless' attached>
          <Accordion>
            <Accordion.Title
              active={showScheduleVisitAccordian}
              index={0}
              onClick={() => setScheduleVisitAccordian(!showScheduleVisitAccordian)}
              style={{display: 'flex'}}
            >
              <span className='c-accordian-title'>Schedule A Visit</span>
              <Icon name={`chevron ${showScheduleVisitAccordian ? 'up' : 'down'}`}/>
            </Accordion.Title>
            <Accordion.Content active={showScheduleVisitAccordian}>
              <Form>
                <Form.Group>
                  <Form.Input name="title" value={schedule.title} onChange={handleScheduleInputChange} width={8} fluid
                              label='Visit Title'/>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={16}>
                    <label>Instructions</label>
                    <TextArea name="instructions" value={schedule.instructions} onChange={handleScheduleInputChange}
                              label='Instructions'/>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field width={3}>
                    <label>Start Date</label>
                    <DateInput
                      name="startDate"
                      value={date.startDate}
                      iconPosition="right"
                      onChange={(...data) => handleScheduleDateInput(data)}
                      icon='calendar alternate outline'
                      closable={true}
                      animation={'none'}
                    />
                  </Form.Field>
                  <Form.Field width={3}>
                    <label>End Date</label>
                    <DateInput
                      name="endDate"
                      value={date.endDate}
                      iconPosition="right"
                      onChange={(...data) => handleScheduleDateInput(data)}
                      icon='calendar alternate outline'
                      closable={true}
                      animation={'none'}
                    />
                  </Form.Field>
                  <Form.Field width={3}>
                    <TimeInput fluid
                               label='Start Time' id='startTime'
                               timeFormat='AMPM' closable
                               disableMinute clearable
                               value={date.startTime}
                               name='startTime' popupPosition='top right'
                               animation={'0'}
                               onChange={(...data) => handleScheduleDateInput(data)}
                               placeholder='Start Time'/>
                  </Form.Field>
                  <Form.Field width={3}>
                    <TimeInput fluid
                               label='End Time' id='startTime'
                               timeFormat='AMPM' closable
                               disableMinute clearable
                               value={date.endTime}
                               name='endTime' popupPosition='top right'
                               animation={'0'}
                               onChange={(...data) => handleScheduleDateInput(data)}
                               placeholder='Start Time'/>
                  </Form.Field>
                  <Form.Select
                    width={3}
                    fluid
                    label='Assigned To' name="assignedTo" multiple={true}
                    options={employeeOptions} value={schedule.assignedTo} onChange={onSelectScheduleChange}
                  />
                  <Form.Field className='c-field-btn'>
                    <Button icon position positive onClick={handleAddSchedule}><Icon name='add'/></Button>
                  </Form.Field>
                </Form.Group>
              </Form>
            </Accordion.Content>
          </Accordion>
        </Segment>
        <Segment basic attached className='marginless shadowless c-segment-content'>
          <Table attached compact structured unstackable className='borderless c-schedule'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Events
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Assigned To
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Actions
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {scheduleArray.map((schedule, index) => {
                return (
                  <Table.Row>
                    <Table.Cell>
                      {schedule.startDateTime}
                    </Table.Cell>
                    <Table.Cell>
                      {schedule.title}
                    </Table.Cell>
                    <Table.Cell>
                      {schedule.assignedTo}
                    </Table.Cell>
                    <Table.Cell>
                      <Button icon='bullhorn' compact size='mini' className='c-primary-btn'/>
                      <Button icon='edit' compact size='mini' primary/>
                      <Button icon='trash' compact size='mini' negative/>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
            </Table.Body>
          </Table>
        </Segment>
      </Segment>
      <Segment className='borderless shadowless marginless c-segment-content'>
        <Accordion className='radiusless c-border c-accordian-segment'>
          <Accordion.Title
            active={showExpenseAccordian === 'expenses' || showExpenseAccordian === 'time_tracking'}
            index={0}
            onClick={() => handleExpenseAccordian('')}
            style={{display: 'flex'}}
          >
            <span className='c-accordian-title-expense'>
              <span className='c-expense-flex'>
                <Label
                  basic
                  className={clsx(showExpenseAccordian !== 'expenses' && 'c-opacity ') + 'borderless c-label-expense'}
                  onClick={(e) => e.stopPropagation() || handleExpenseAccordian('expenses')}
                  style={{marginRight: 8}}
                >
                  EXPENSE
                </Label>
                {showExpenseAccordian === 'expenses' && (
                  <Icon className='c-align-center' name='caret down'/>
                )}
              </span>
              <span className='c-expense-flex'>
                <Label
                  basic
                  className={clsx(showExpenseAccordian !== 'time_tracking' && 'c-opacity ') + 'borderless c-label-expense'}
                  onClick={(e) => e.stopPropagation() || handleExpenseAccordian('time_tracking')}
                  style={{marginLeft: 8}}
                >
                  TIME TRACKING
                </Label>
                {showExpenseAccordian === 'time_tracking' && (
                  <Icon className='c-align-center' name='caret down'/>
                )}
              </span>
            </span>
            <div style={{flex: 1}}/>
            <Icon name={`chevron ${showExpenseAccordian ? 'up' : 'down'}`}/>
          </Accordion.Title>
          <Accordion.Content className='paddingless' active={showExpenseAccordian === 'expenses' || 'time_tracking'}>
            {showExpenseAccordian === 'expenses' && (
              <div>
                <Grid columns={'2'} divided stretched padded>
                  <Grid.Row className='paddingless'>
                    <Grid.Column style={{padding: '0 32px 0 0'}}>
                      <Form>
                        <Form.Group>
                          <Form.Select width={8} name="supplier" value={expense.supplier}
                                       onChange={onSelectExpenseChange}
                                       options={[]} label='Supplier'/>
                          <Form.Select name="technician" value={expense.technician}
                                       onChange={onSelectExpenseChange} options={employeeOptions}
                                       width={8}
                                       label='Employee'/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={16}>
                            <label>Description</label>
                            <TextArea value={expense.description} name="description"
                                      onChange={handleExpenseInputChange}/>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={6}>
                            <label>Date</label>
                            <DateInput
                              name="date"
                              value={moment(expense.date).format('MMM DD, YYYY')}
                              iconPosition="right"
                              onChange={(...data) => handleExpenseDateInputChange(data)}
                              icon='calendar alternate outline'
                              closable={true}
                              animation={'none'}
                            />
                          </Form.Field>
                          <Form.Input value={expense.purchaseOrder} name="purchaseOrder"
                                      onChange={handleExpenseInputChange}
                                      width={5} label='PO Number'/>
                          <Form.Input value={expense.receipt} name="receipt" width={5}
                                      onChange={handleExpenseInputChange}
                                      label='Receipt Number'/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Select value={expense.paymentType}
                                       onChange={onSelectExpenseChange}
                                       name="paymentType" width={6} label='Payment Type'
                                       options={paymentTypeOptions}
                          />
                          <Form.Input name="qty" width={5} onChange={handleExpenseInputChange}
                                      label='Quantity'/>
                          <Form.Input name="amount" width={5} onChange={handleExpenseInputChange}
                                      label='Amount'/>
                        </Form.Group>
                        <label>Expense Images</label>
                        <p style={{margin: '8px 0px'}}>Upload images of support documentation</p>
                        <Segment basic className='marginless c-attachments'>
                          <DropzoneComponent config={componentConfig}
                                             djsConfig={djsConfig}
                                             className='c-dropzone'
                          />
                        </Segment>
                      </Form>
                    </Grid.Column>
                    <Grid.Column style={{padding: '0 0 0 32px'}}>
                      <Form>
                        <Form.Group>
                          <Form.Field>
                            <label>Create Customer</label>
                            <Checkbox name="chargeToCustomer" value={expense.chargeToCustomer}
                                      onChange={handleExpenseCheckBoxChange}
                                      label='Create a charge for this expense'/>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Select
                            width={10}
                            label='Product/Service'
                            name="item"
                            value={expense.lineItem.item}
                            onChange={onSelectExpenseLineItemChange}
                            options={inventoryOptions}/>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={16}>
                            <label>Description</label>
                            <TextArea
                              name="description"
                              value={expense.lineItem.description}
                              onChange={handleExpenseLineItemInputChange}
                              n/>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={5}>
                            <Form.Input name="qty" value={expense.lineItem.qty}
                                        onChange={handleExpenseLineItemInputChange}
                                        label='Quantity'/>
                          </Form.Field>
                          <Form.Field width={5}>
                            <Form.Input name="unitCost" value={expense.lineItem.unitCost}
                                        onChange={handleExpenseLineItemInputChange} label='Price'/>
                          </Form.Field>
                        </Form.Group>
                        <div style={{display: 'flex', marginTop: '34%'}}>
                          <div style={{flex: 1}}/>
                          <Button positive onClick={handleAddExpense}><Icon name='add'/>Add Expenses</Button>
                        </div>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <br/>
                <hr/>
                <Table basic className='c-table'>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Supplier</Table.HeaderCell>
                      <Table.HeaderCell>Description</Table.HeaderCell>
                      <Table.HeaderCell>Date</Table.HeaderCell>
                      <Table.HeaderCell>Employee</Table.HeaderCell>
                      <Table.HeaderCell>P O Number</Table.HeaderCell>
                      <Table.HeaderCell>Receipt Number</Table.HeaderCell>
                      <Table.HeaderCell>QTY</Table.HeaderCell>
                      <Table.HeaderCell>Payment Type</Table.HeaderCell>
                      <Table.HeaderCell>Amount</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {expenseArray.map((expense, index) => {
                      return expense.chargeType === 'expense-against-casual-items' && !expense.chargeToCustomer ? (
                        <Table.Row>
                          <Table.Cell>{expense.supplier}</Table.Cell>
                          <Table.Cell>{expense.description}</Table.Cell>
                          <Table.Cell>date</Table.Cell>
                          <Table.Cell>{expense.technician}</Table.Cell>
                          <Table.Cell>{expense.purchaseOrder}</Table.Cell>
                          <Table.Cell>receipt</Table.Cell>
                          <Table.Cell>{expense.qty}</Table.Cell>
                          <Table.Cell>{expense.paymentType}</Table.Cell>
                          <Table.Cell>{expense.amount}</Table.Cell>
                        </Table.Row>
                      ) : false
                    })}
                  </Table.Body>
                </Table>
                <br/>
                {/*<Grid>*/}
                {/*  <Grid.Row>*/}
                {/*    <Grid.Column width={16}>*/}
                {/*      <Form>*/}
                {/*        <Form.Group>*/}
                {/*          <Form.Field width={16} className='paddingless'>*/}
                {/*            <Checkbox label={<label>Create a charge for this time cost</label>}/>*/}
                {/*          </Form.Field>*/}
                {/*        </Form.Group>*/}
                {/*      </Form>*/}
                {/*    </Grid.Column>*/}
                {/*  </Grid.Row>*/}
                {/*</Grid>*/}
              </div>)
            }
            {showExpenseAccordian === 'time_tracking' && (
              <div>
                <Form>
                  <Form.Group>
                    <Form.Select width={5} label='Technician'
                                 name="technician" value={expense.technician}
                                 onChange={onSelectExpenseChange} options={employeeOptions}
                    />
                    <Form.Field width={5}>
                      <label>Date</label>
                      <DateInput
                        name="date"
                        value={moment(expense.date).format('MMM DD, YYYY')}
                        iconPosition="right"
                        onChange={(...data) => handleExpenseDateInputChange(data)}
                        icon='calendar alternate outline'
                        closable={true}
                        animation={'none'}
                      />
                    </Form.Field>
                    <Form.Input width={5} name="description" value={expense.description}
                                onChange={handleExpenseInputChange} fluid label='Notes'/>
                    <Form.Field width={5}>
                      <TimeInput fluid
                                 label='Hours' id='Hours'
                                 timeFormat='AMPM' closable
                                 disableMinute clearable
                                 name='hours' popupPosition='top right'
                                 animation={'0'}
                                 placeholder='Hours'/>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group style={{display: 'flex'}}>
                    <Form.Select width={5} options={inventoryOptions}
                                 name="item"
                                 value={expense.lineItem.item}
                                 onChange={onSelectExpenseLineItemChange}
                                 label='Search for item'/>
                    <Form.Input width={3}
                                label='Price'
                                name="unitCost" value={expense.lineItem.unitCost}
                                onChange={handleExpenseLineItemInputChange}
                                icon='dollar' iconPosition='left'/>
                    <div style={{flex: 1}}/>
                    <Form.Field className='c-field-btn' width={2}>
                      <Button style={{marginRight: 8}} onClick={handleAddTimeTracking} fluid primary>Save</Button>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label>Charge The Customer</label>
                      <Checkbox name="chargeToCustomer" value={expense.chargeToCustomer}
                                onChange={handleExpenseCheckBoxChange}
                                label='Create a charge for this time cost'/>
                    </Form.Field>
                  </Form.Group>
                </Form>
              </div>
            )}
          </Accordion.Content>
        </Accordion>
      </Segment>
      <Segment className='borderless shadowless marginless c-segment-content'>
        <Segment className='radiusless c-accordian-segment shadowless' attached>
          <Accordion fluid>
            <Accordion.Title
              active={showActivityAccordian}
              index={0}
              onClick={() => setActivityAccordian(!showActivityAccordian)}
              style={{display: 'flex'}}
            >
              <span className='c-accordian-title'>Activity</span>
              <Icon name={`chevron ${showActivityAccordian ? 'up' : 'down'}`}/>
            </Accordion.Title>
          </Accordion>
        </Segment>
        {showActivityAccordian && (
          <Segment basic className='marginless radiusless borderless' style={{padding: 8}}>
            <Menu text size='medium' className='marginless c-menu'>
              <Menu.Item
                name='Reminder'
                active={activeActivityMenu === 'reminder'}
                onClick={() => setActiveActivityMenu('reminder')}
              />
              <Menu.Item
                name='Internal Notes'
                active={activeActivityMenu === 'internalNotes'}
                onClick={() => setActiveActivityMenu('internalNotes')}
              />
              <Menu.Item
                name='Attachment'
                active={activeActivityMenu === 'attachment'}
                onClick={() => setActiveActivityMenu('attachment')}
              />
              <Menu.Item
                name='Email/SMS'
                active={activeActivityMenu === 'email_sms'}
                onClick={() => setActiveActivityMenu('email_sms')}
              />
              <Menu.Item
                name='History'
                active={activeActivityMenu === 'history'}
                onClick={() => setActiveActivityMenu('history')}
              />
            </Menu>
            <Divider style={{margin: '0px 0px 10px 0px'}}/>
            <Form>
              {activeActivityMenu === 'reminder' && (
                <div>
                  <Button size='tiny' name="call" onClick={handleReminderButtons} className='c-circular' color='blue'>
                    <Icon name='call'/>
                    Call
                  </Button>
                  <Button name="mail" onClick={handleReminderButtons} size='tiny' className='c-circular'>
                    <Icon name='mail'/> Email
                  </Button>
                  <Button name="visit" onClick={handleReminderButtons} size='tiny' className='c-circular'>
                    <Icon name='street view'/> Visit
                  </Button>
                  <Form.Group style={{marginTop: 8}}>
                    <Form.Input label='Subject' name="subject" onChange={handleReminderInputChange} width={6}/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={2}>
                      <label>Date</label>
                      <DateInput
                        name="startDate"
                        value={date.startDate}
                        iconPosition="right"
                        onChange={(...data) => handleReminderDateTimeInput(data)}
                        icon='calendar alternate outline'
                        closable={true}
                        animation={'none'}
                      />
                    </Form.Field>
                    <Form.Field width={2}>
                      <TimeInput fluid
                                 label='Time' id='startTime'
                                 timeFormat='AMPM' closable
                                 disableMinute clearable
                                 value={date.startTime}
                                 name='startTime' popupPosition='top right'
                                 animation={'0'}
                                 onChange={(...data) => handleScheduleDateInput(data)}
                                 placeholder='Start Time'/>
                    </Form.Field>
                    <Form.Select label='Assigned To'
                                 name="assignedTo" multiple={true}
                                 options={employeeOptions} value={reminder.assignedTo} onChange={onSelectReminderChange}
                                 width={2} fluid/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label>Comments</label>
                      <TextArea name="comments" onChange={handleReminderInputChange} fluid/>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group style={{display: 'flex'}}>
                    <div style={{flex: 1}}/>
                    <Button size='small' primary onClick={handleAddReminder}>Save</Button>
                  </Form.Group>
                </div>
              )}
              {activeActivityMenu === 'internalNotes' && (
                <div>
                  <Form.Group>
                    <Form.Select name="to" value={internalNotes.to}
                                 onChange={onSelectInternalNotesChange} options={employeeOptions}
                                 width={3}
                                 label='To'/>
                    <Form.Select label='To' value={internalNotes.via}
                                 onChange={onSelectInternalNotesChange} name="via"
                                 options={internalNotesViaOptions} width={3}/>
                    <Form.Input label='Subject'
                                name="subject" value={internalNotes.subject} onChange={handleInternalNotesInputChange}
                                width={3}/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label>Comments</label>
                      <TextArea name="comments" value={internalNotes.comments} onChange={handleInternalNotesInputChange}
                                fluid/>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group style={{display: 'flex'}}>
                    <div style={{flex: 1}}/>
                    <Button size='small' onClick={handleAddInternalNotes} primary>Save</Button>
                  </Form.Group>
                </div>
              )}
              {activeActivityMenu === 'attachment' && (
                <div>
                  <Form.Group>
                    <Form.Field width={8}>
                      <DropzoneComponent config={componentConfig}
                                         djsConfig={djsConfig}
                                         className='c-dropzone'
                      />
                    </Form.Field>
                  </Form.Group>
                </div>
              )}
              {activeActivityMenu === 'email_sms' && (
                <div>
                  <Form.Group>
                    <Form.Select label='To' options={[]} width={3} fluid/>
                    <Form.Select label='Via' options={[]} width={3} fluid/>
                    <Form.Input label='Subject' fluid width={3}/>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label>Message</label>
                      <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={() => {
                        }}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group style={{display: 'flex'}}>
                    <div style={{flex: 1}}/>
                    <Button size='small' primary>Save</Button>
                  </Form.Group>
                </div>
              )}
              {activeActivityMenu === 'history' && (
                <Grid style={{paddingBottom: 32}}>
                  {[0, 1, 2].map((row, index) => {
                    return (
                      <Grid.Row className='paddingless c-history'>
                        <Comment.Group size='tiny' key={index}>
                          <Comment>
                            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
                            <Comment.Content>
                              <Comment.Metadata>
                                <div>Today at 5:42PM</div>
                              </Comment.Metadata>
                              <Comment.Text><label>Matt</label> How artistic!</Comment.Text>
                            </Comment.Content>
                          </Comment>
                        </Comment.Group>
                      </Grid.Row>
                    )
                  })}
                </Grid>
              )}
            </Form>
          </Segment>
        )}
      </Segment>
    </div>
  )
}

export default AddJobForm;
