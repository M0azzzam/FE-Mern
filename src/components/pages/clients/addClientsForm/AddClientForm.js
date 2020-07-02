import React from 'react';
import {
  Container,
  Sticky,
  Segment,
  Grid,
  Button,
  Icon,
  Form,
  Input,
  Checkbox,
  Select,
} from 'semantic-ui-react';
import CountrySelect from '../../../extension/CountrySelect';

const AddClientForm = props => {

  const {
    IS_UPDATING,
    save,
    sidePanelContext,
    handleBillingAddress,
    handleInputChange,
    phonesList,
    handleAddAnotherPhone,
    handleRemovePhone,
    handlePhoneOption,
    handlePhoneInputChange,
    handleSelectGroup,
    handleNumberVerification,
    handleCompanyName,
    handleBillingInput,
    titleOptions,
    phoneOptions,
    taxOptions,
    isUpdating,
    data,
    propertyData,
    billingData,
    errors,
    validationErrors
  } = props.data || {};

  return (
    <Container fluid className='c-side-panel-container'>
      <Sticky>
        <Segment raised className='radiusless borderless'>
          <Grid>
            <Grid.Row className='marginless c-side-panel-header'>
              <Grid.Column width={16} className='paddingless'>
                <Container style={{ lineHeight: '36px', width: '100%' }} className='c-side-panel-heading'>{IS_UPDATING ? 'Update' : 'Add'} Customer</Container>
                <div className='sidebar-action-buttons'>
                  <Icon size='large' className='c-side-panel-close-btn' fitted onClick={() => sidePanelContext.hide()} compact >&times;</Icon>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Sticky>
      <Segment loading={isUpdating} basic className='marginless radiusless borderless'>
        <div style={{ marginBottom: 50 }}>
          <Form>
            <Grid columns={1}>
              <Grid.Column className='paddingless'>
                <div style={{ padding: '12px' }}>
                  <Form.Group>
                    <Form.Field
                      control={Select}
                      options={titleOptions}
                      label={{ children: 'Title', htmlFor: 'form-select-control-title' }}
                      search
                      searchInput={{ id: 'form-select-control-title' }}
                      name='title'
                      onChange={(...params) => handleSelectGroup(params)}
                      value={data.title}
                      error={validationErrors.title}
                      width={3}
                      style={{ minWidth: 'auto' }}
                    />
                    <Form.Field
                      control={Input}
                      label='First Name'
                      name='firstName'
                      onChange={(e) => handleInputChange(e, null)}
                      value={data.firstName}
                      error={validationErrors.firstName}
                      required
                      width={6}
                    />
                    <Form.Field
                      control={Input}
                      label='Last Name'
                      name='lastName'
                      onChange={(e) => handleInputChange(e, null)}
                      value={data.lastName}
                      error={validationErrors.lastName}
                      required
                      width={7}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Field
                      control={Input}
                      label='Company Name'
                      name='company'
                      onChange={(e) => handleInputChange(e, null)}
                      value={data.company}
                      width={9}
                    />
                    <Form.Field
                      control={Input}
                      label='Email Address'
                      name='email'
                      onChange={(e) => handleInputChange(e, null)}
                      value={data.email}
                      width={7}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Checkbox className='smallLabel' label='Use company name as the primary name' style={{ marginLeft: 8, color: 'gray' }} onChange={(event, data) => handleCompanyName(data)} checked={data && data.companyNameAsPrimary} />
                  </Form.Group>
                  {(phonesList && phonesList.length > 0) && (
                    phonesList.map((phone, index) => (
                      <Form.Group key={index}>
                        <Form.Field
                          control={Select}
                          options={phoneOptions}
                          label={{ children: 'Type', htmlFor: 'form-select-control-type' }}
                          search
                          searchInput={{ id: 'form-select-control-type' }}
                          name='type'
                          onChange={(...params) => handlePhoneOption(params, index)}
                          value={phone.selectedOption}
                          width={3}
                          style={{ minWidth: 'auto' }}
                        />
                        <Form.Field
                          control={Input}
                          label='Phone Number'
                          name='phone'
                          placeholder='+92 303 8786543'
                          error={errors.numbers[index]}
                          onBlur={(e) => handleNumberVerification(e, index)}
                          onChange={(e) => handlePhoneInputChange(e, index)}
                          value={phone.phone}
                          width={5}
                        />
                        {phonesList.length > 1 && index > 0 && (
                          <Form.Field style={{ display: 'flex', alignItems: 'flex-end', padding: '0px' }} width={1}>
                            <Button className='c-form-btn' icon='trash' negative size='medium' onClick={() => handleRemovePhone(index)} />
                          </Form.Field>
                        )}
                        {index === 0 && (
                          <Form.Field style={{ display: 'flex', alignItems: 'flex-end', padding: '0px' }} width={1}>
                            <Button className='c-form-btn' icon='add' positive size='medium' onClick={handleAddAnotherPhone} />
                          </Form.Field>
                        )}
                        {index === 0 && (
                          <Form.Field
                            control={Select}
                            options={[]}
                            label={{ children: 'Source', htmlFor: 'form-select-control-source' }}
                            search
                            searchInput={{ id: 'form-select-control-source' }}
                            name='source'
                            onChange={(...params) => handleSelectGroup(params)}
                            value={data.source}
                            error={validationErrors.source}
                            width={7}
                            style={{ minWidth: 'auto' }}
                          />
                        )}
                      </Form.Group>
                    ))
                  )}
                  <Form.Group>
                    <Form.Field
                      control={Select}
                      options={taxOptions}
                      label={{ children: 'Tax Class', htmlFor: 'form-select-control-tax' }}
                      placeholder='Select Tax Class'
                      search
                      searchInput={{ id: 'form-select-control-tax' }}
                      name='tax'
                      onChange={(...params) => handleSelectGroup(params)}
                      value={data.tax}
                      width={9}
                    />
                    <Form.Field width={7}>
                      <label>Automated Notifications</label>
                      <Form.Group>
                        <Form.Field>
                          <Checkbox className='smallLabel' label='Visit reminder sent for upcoming visits' />
                          <Checkbox className='smallLabel' label='Job follow-up emails when you close a job' />
                        </Form.Field>
                      </Form.Group>
                    </Form.Field>
                  </Form.Group>
                </div>
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column className='paddingless'>
                <div className='c-side-panel-section c-side-panel-heading'>
                  Service Address
                </div>
                <div style={{ padding: '12px' }}>
                  <Form.Group>
                    <Form.Field
                      control={Input}
                      label='Street Address'
                      name='street1'
                      onChange={(e) => handleInputChange(e, true)}
                      value={propertyData.street1}
                      width={9}
                    />
                    <Form.Field
                      control={Input}
                      label='Apt / Suite / Floor #'
                      name='street2'
                      onChange={(e) => handleInputChange(e, true)}
                      value={propertyData.street2}
                      width={7}
                    />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field
                      control={Input}
                      label='City'
                      name='city'
                      onChange={(e) => handleInputChange(e, true)}
                      value={propertyData.city}
                    />
                    <Form.Field
                      control={Input}
                      label='State'
                      name='state'
                      onChange={(e) => handleInputChange(e, true)}
                      value={propertyData.state}
                    />
                    <Form.Field
                      control={Input}
                      label='Zip Code'
                      name='zipCode'
                      onChange={(e) => handleInputChange(e, true)}
                      value={propertyData.zipCode}
                    />
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <CountrySelect value={propertyData.country} name='country' onChange={(...params) => handleSelectGroup(params)} />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group style={{ display: 'flex' }}>
                    <Form.Field width={9} style={{ flex: '1' }}>
                      <Checkbox className='smallLabel' label='Billing address is the same as property address' onChange={(event, data) => handleBillingAddress(data)} checked={data && data.billingAndPropertyAddressSame} />
                    </Form.Field>
                    <Form.Field>
                      <Button positive compact onClick={() => sidePanelContext.hide()}><Icon name='add' />Add Custom Field</Button>
                    </Form.Field>
                  </Form.Group>
                  {(data && !data.billingAndPropertyAddressSame) && (
                    <>
                      <Form.Group>
                        <Form.Field
                          control={Input}
                          label='Street Address'
                          name='street1'
                          onChange={handleBillingInput}
                          value={billingData.street1}
                          width={9}
                        />
                        <Form.Field
                          control={Input}
                          label='Apt / Suite / Floor #'
                          name='street2'
                          onChange={handleBillingInput}
                          value={billingData.street2}
                          width={7}
                        />
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Field
                          control={Input}
                          label='City'
                          name='city'
                          onChange={handleBillingInput}
                          value={billingData.city}
                        />
                        <Form.Field
                          control={Input}
                          label='State'
                          name='state'
                          onChange={handleBillingInput}
                          value={billingData.state}
                        />
                        <Form.Field
                          control={Input}
                          label='Zip Code'
                          name='zipCode'
                          onChange={handleBillingInput}
                          value={billingData.zipCode}
                        />
                      </Form.Group>
                      <Form.Group widths='equal'>
                        <Form.Field>
                          <CountrySelect value={billingData.country} name='country' onChange={(...params) => handleSelectGroup(params, true)} />
                        </Form.Field>
                      </Form.Group>
                    </>
                  )}
                </div>
              </Grid.Column>
            </Grid>
          </Form>
        </div>
      </Segment>
      <div className='c-sticky-footer'>
        <Segment raised className='radiusless borderless c-side-panel-footer'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }} />
            <div>
              <Button color={IS_UPDATING ? 'blue' : 'green'} onClick={save}>{IS_UPDATING ? 'Update' : 'Create'} Customer</Button>
              <Button basic onClick={() => { }}>Create and add another</Button>
              <Button basic onClick={() => sidePanelContext.hide()}>Cancel</Button>
            </div>
          </div>
        </Segment>
      </div>
    </Container>
  )
}

export default AddClientForm;
