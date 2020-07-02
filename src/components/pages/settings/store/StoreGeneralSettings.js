import React, { useState, useEffect } from 'react';
import { Segment, Breadcrumb, Button, Icon, Divider, Form, Sticky } from 'semantic-ui-react';
import { getCurrentStore, updateCurrentStore } from '../../../../services/stores';
import Toast from '../../../extension/Toast';
import Heading from '../../../extension/Heading';
import CountrySelect from '../../../extension/CountrySelect';
import currencies from '../../../values/currencies';
import { TimeInput } from 'semantic-ui-calendar-react';
import timezones from '../../../values/timezones';

const timeForamtOptions = [{
  value: '12',
  text: '12 Hours'
}, {
  value: '24',
  text: '24 Hours'
}];

const priceFormatOptoins = [{
  value: 'comma',
  text: 'Comma'
}, {
  value: 'decimal',
  text: 'Decimal'
}];

const StoreGeneralSettings = props => {
  const [isLoading, setLoading] = useState(false);

  const [store, setStore] = useState({
    name: '',
    alternateName: '',
    email: '',
    startTime: '',
    endTime: '',
    city: '',
    address: '',
    website: '',
    postCode: '',
    phone: '',
    mobile: '',
    registrationNumber: '',
    country: '',
    language: '',
    defaultAddress: '',
    defaultCurrency: '',
    priceFormat: '',
    timeFormat: ''
  });

  const CurrencySelectInput = React.memo(memoProps => {
    const { options, ...rest } = memoProps;
    const values = options.map(c => ({ text: c.name, value: c.code }))
    return <Form.Select fluid search options={values} {...rest} />
  });

  const fetchCurrentStore = async () => {
    try {
      setLoading(true);
      const result = await getCurrentStore();
      setStore(result.data.data || {});
      setLoading(false);
    } catch (err) {
      console.log('Error::FetchCurrentStore', err.response)
      Toast(
        'Error while fetching store',
        'Store data could not be fetched.',
        'danger'
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCurrentStore();
  }, []);

  const onInputChange = (e) => {
    setStore({ ...store, [e.target.name]: e.target.value })
  }

  const onSelectChange = (e, params) => {
    const name = params.name;
    const value = params.value;
    setStore({ ...store, [name]: value })
  }

  const updateStoreInformation = async () => {
    try {
      const { _id: id, ...rest } = store;
      await updateCurrentStore({ id, ...rest });
      Toast(
        'Store inforamtion updated',
        'Store information has been saved successfully.',
        'success'
      )
    } catch (err) {
      console.log('Error::UpdateCurrentStore', err)
      Toast(
        'Error while saving data',
        'Store information could not be saved. Please retry!',
        'danger'
      )
    }
  }


  return (
    <>
      <Sticky>
        <Segment basic className='customPrimaryBG customPrimaryShadow'>
          <h3>General Settings</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Breadcrumb style={{ flex: 1, minWidth: '500px' }}>
              <Breadcrumb.Section link>Home</Breadcrumb.Section>
              <Breadcrumb.Divider>/</Breadcrumb.Divider>
              <Breadcrumb.Section link>Settings</Breadcrumb.Section>
              <Breadcrumb.Divider>/</Breadcrumb.Divider>
              <Breadcrumb.Section link>Stores</Breadcrumb.Section>
              <Breadcrumb.Divider>/</Breadcrumb.Divider>
              <Breadcrumb.Section active>General Settings</Breadcrumb.Section>
            </Breadcrumb>
            <div>
              <Button primary onClick={updateStoreInformation}><Icon name='save' /> Update</Button>
            </div>
          </div>
        </Segment>
      </Sticky>

      <Segment basic className='customPrimaryBG' loading={isLoading}>
        <Form>
          <Heading as='h4'>Basic Information</Heading>
          <Divider />
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Store Name *</label>
              <input placeholder="Enter full name" value={store.name} name='name' onChange={onInputChange} />
            </Form.Field>
            <Form.Field>
              <label>Alternate Name</label>
              <input placeholder="Enter full name" value={store.alternateName} name='alternateName' onChange={onInputChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Email *</label>
              <input placeholder="Enter email address" value={store.email} name='email' onChange={onInputChange} />
            </Form.Field>
            <Form.Field></Form.Field>
          </Form.Group>
          <Heading as='h4'>Contact Information</Heading>
          <Divider />
          <Form.Field>
            <Form.Input label='Store Address *' value={store.address} name='address' onChange={onInputChange} placeholder='What is your store location?' />
          </Form.Field>
          <Form.Group widths='equal'>
            <Form.Input fluid label='City *' value={store.city} name='city' onChange={onInputChange} placeholder='City name' />
            <Form.Input fluid label='Post Code *' value={store.postCode} name='postCode' onChange={onInputChange} placeholder='Postal code' />
          </Form.Group>
          <Form.Group widths='equal'>
            <CountrySelect value={store.country} name='country' onChange={onSelectChange} />
            <Form.Input fluid label='Website' value={store.website} name='website' onChange={onInputChange} placeholder='Enter your website url...' />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Phone *' value={store.phone} name='phone' onChange={onInputChange} placeholder='Enter your phone number...' />
            <Form.Input fluid label='Mobile' value={store.mobile} name='mobile' onChange={onInputChange} placeholder='Enter your mobile number...' />
          </Form.Group>
          <Heading as='h4'>Other Information</Heading>
          <Divider />
          <Form.Group widths='equal'>
            <Form.Select search fluid label='Time Zone' value={store.timeZone} name='timeZone' options={timezones} onChange={onSelectChange} placeholder='Time Zone' />
            <Form.Input fluid label='Registration Number' value={store.registrationNumber} name='registrationNumber' onChange={onInputChange} placeholder='Registraton Number' />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Language' value={store.language} name='language' onChange={onInputChange} placeholder='Language' />
            <TimeInput fluid label='Start Time' id='startTime' timeFormat='AMPM' closable disableMinute clearable value={store.startTime} name='startTime' popupPosition='top right' animation={'0'} onChange={onSelectChange} placeholder='Start Time' />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Select fluid label='Time Format' options={timeForamtOptions} name='timeFormat' value={store.timeFormat} onChange={onSelectChange} />
            <TimeInput fluid label='End Time' id='endTime' timeFormat='AMPM' closable disableMinute clearable value={store.endTime} name='endTime' popupPosition='top right' animation={'0'} onChange={onSelectChange} placeholder='End Time' />
          </Form.Group>
          <Form.Group widths='equal'>
            <CurrencySelectInput label='Default Currency' value={store.defaultCurrency} options={currencies} name='defaultCurrency' onChange={onSelectChange} />
            <Form.Input fluid label='Default Address' value={store.defaultAddress} name='defaultAddress' onChange={onInputChange} placeholder='Default Address' />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Select fluid label='Price Format' options={priceFormatOptoins} name='priceFormat' value={store.priceFormat} onChange={onSelectChange} />
          </Form.Group>
        </Form>
      </Segment>
    </>
  );
}

export default StoreGeneralSettings;
