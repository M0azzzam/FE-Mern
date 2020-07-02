import React, { useState, useEffect } from 'react';
import { Segment, Breadcrumb, Button, Icon, Form, Input } from 'semantic-ui-react';
import Heading from '../../extension/Heading';
import CountrySelect from '../../extension/CountrySelect';
import { getUserProfile, updateUserProfile } from '../../../services/users';
import Toast from '../../extension/Toast';
import { debounce } from 'lodash';

const UpdateUserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [passwordVisibile, setPasswordVisibile] = useState(false);
  const [data, setData] = useState({
    name: '',
    business: '',
    email: '',
    accessPin: '',
    language: '',
    phone: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  })
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const getProfileData = async () => {
    const result = await getUserProfile();
    const {
      name,
      business,
      email,
      accessPin,
      language,
      phone,
      mobile,
      address,
      city,
      state,
      zip,
      country,
    } = result.data.data;
    setData({
      name,
      business,
      email,
      accessPin,
      language,
      phone,
      mobile,
      address,
      city,
      state,
      zip,
      country
    });
    setLoading(false);
  }

  const handleUpdateUserProfile = async () => {
    try {
      setLoading(true);
      await updateUserProfile(data);
      setLoading(false);
      Toast('User Profile Updated', 'Profile has been updated successfully.', 'success');
    } catch (err) {
      console.log('Error:UpdateUserProfile', err.response);
      Toast('User Profile Updated', 'Profile could not be saved. Please retry!', 'danger')
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  const onSelectChange = (e, params) => {
    const name = params.name;
    const value = params.value;
    setData({ ...data, [name]: value })
  }

  return (
    <>
      <Segment basic className='customPrimaryBG'>
        <h3>Update Profile</h3>
        <Breadcrumb>
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section link>Settings</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Update Profile</Breadcrumb.Section>
        </Breadcrumb>
        <div style={{ float: 'right' }}>
          <Button positive onClick={debounce(handleUpdateUserProfile, 500, { leading: false, trailing: true })}><Icon name='save' /> Save</Button>
        </div>
      </Segment>

      <Segment basic loading={loading} className='customPrimaryBG'>
        <Form>
          <Heading as='h3' style={{ marginBottom: '20px' }}>Basic Information</Heading>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Full Name</label>
              <input placeholder="Enter full name" value={data.name} name='name' onChange={onInputChange} />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input placeholder="Enter email address" value={data.email} name='email' onChange={onInputChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width='8'>
              <label>Access Pin</label>
              <Input iconPosition='right'>
                <Icon name={passwordVisibile ? 'eye' : 'eye slash'} />
                <input placeholder="Enter access pin" type={passwordVisibile ? 'text' : 'password'} value={data.accessPin} name='accessPin' onChange={onInputChange} />
              </Input>
            </Form.Field>
          </Form.Group>
          <Form.Field width='2'>
            <Button size='mini' onClick={() => setPasswordVisibile(!passwordVisibile)}>{passwordVisibile ? 'Hide' : 'Show'}</Button>
          </Form.Field>

          <Heading as='h3' style={{ marginBottom: '20px' }}>Contact Details</Heading>

          <Form.Group widths='equal'>
            <Form.Field>
              <label>Phone</label>
              <input placeholder="Enter phone number" value={data.phone} name='phone' onChange={onInputChange} />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input placeholder="Enter city name" value={data.city} name='city' onChange={onInputChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Address</label>
              <input placeholder="Enter address" value={data.address} name='address' onChange={onInputChange} />
            </Form.Field>
            <Form.Field>
              <label>Zip</label>
              <input placeholder="Enter zip" value={data.zip} name='zip' onChange={onInputChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <CountrySelect onChange={onSelectChange} value={data.country} width='8' name='country' />
          </Form.Group>
        </Form>
      </Segment>
    </>
  );
}

export default UpdateUserProfile;
