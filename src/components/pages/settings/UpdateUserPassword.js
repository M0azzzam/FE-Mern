import React, { useState, useEffect } from 'react';
import { Segment, Breadcrumb, Button, Icon, Form, Input } from 'semantic-ui-react';
import { updateUserPassword } from '../../../services/users';
import Toast from '../../extension/Toast';
import { debounce } from 'lodash';

const UpdateUserPassword = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisibile, setPasswordVisibile] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const [data, setData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (data.newPassword !== '' && data.confirmPassword !== '') {
      data.newPassword !== data.confirmPassword ? setPasswordMatch(false) : setPasswordMatch(true);
    }
  }, [data])

  const handleUpdatePassword = async () => {
    if (!data.oldPassword || !data.newPassword || !data.confirmPassword) {
      return Toast('Missing Information', 'Please make sure you fill in all fields.', 'danger');
    }
    try {
      setLoading(true);
      await updateUserPassword(data);
      Toast('Password Changed', 'You password has been changed.', 'success');
      setLoading(false);
      setData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordMatch(false);
    } catch (err) {
      setLoading(false);
      console.log('Error:UpdateUserPassword', err.response);
      if (err.response && err.response.data && err.response.data.reason === 'INVALID_PASSWORD') {
        return Toast('Wrong password', 'You entered an incorrect password.', 'danger');
      }
      Toast('Something went wrong', 'Your password could not be saved.', 'danger');
    }
  }


  return (
    <>
      <Segment basic className='customPrimaryBG'>
        <h3>Update Password</h3>
        <Breadcrumb>
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section link>Settings</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Update Password</Breadcrumb.Section>
        </Breadcrumb>
        <div style={{ float: 'right' }}>
          <Button positive onClick={debounce(handleUpdatePassword, 500, { leading: false, trailing: true })}><Icon name='save' /> Save</Button>
        </div>
      </Segment>

      <Segment basic loading={loading} className='customPrimaryBG'>
        <Form>
          <Form.Group>
            <Form.Field width='8'>
              <label>Old Password *</label>
              <input placeholder='Enter your current password' type={passwordVisibile ? 'text' : 'password'} value={data.oldPassword} name='oldPassword' onChange={onInputChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>New Password *</label>
              <Input iconPosition='right'>
                <Icon name='check circle' color={passwordMatch === true ? 'green' : 'red'} />
                <input placeholder='Enter your new password' type={passwordVisibile ? 'text' : 'password'} value={data.newPassword} name='newPassword' onChange={onInputChange} />
              </Input>
            </Form.Field>
            <Form.Field>
              <label>Confirm Password *</label>
              <Input iconPosition='right'  >
                <Icon name='check circle' color={passwordMatch === true ? 'green' : 'red'} />
                <input placeholder='Confirm your new password' type={passwordVisibile ? 'text' : 'password'} value={data.confirmPassword} name='confirmPassword' onChange={onInputChange} />
              </Input>
            </Form.Field>
          </Form.Group>
          <Form.Field width='2'>
            <Button size='mini' onClick={() => setPasswordVisibile(!passwordVisibile)}>{passwordVisibile ? 'Hide' : 'Show'}</Button>
          </Form.Field>
        </Form>
      </Segment>
    </>
  );
}

export default UpdateUserPassword;
