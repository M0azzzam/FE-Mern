import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Icon, Form, Grid, Container, Accordion } from 'semantic-ui-react';
import SidePanelContext from '../../extension/SidePanelContext';
import { employeesActions } from '../../../store/actions/settings/employees';
import { createEmployee, updateEmployee } from '../../../services/employees';
import Heading from '../../extension/Heading';
import Toast from '../../extension/Toast';
import CountrySelect from '../../extension/CountrySelect';

const AddNewRoleSidebar = props => {
  const sidePanelContext = useContext(SidePanelContext);
  const { roles = [] } = props;
  const allRoles = roles.map((role) => ({ text: role.name, value: role._id }));
  const toUpdateFields = { id: props.data._id || '' }
  const [data, setData] = useState({
    ...(props.data.IS_UPDATING && toUpdateFields),
    name: props.data.name || '',
    email: props.data.email || '',
    password: props.data.password || '',
    confirmPassword: props.data.password || '',
    defaultStore: props.data.store || '',
    role: (props.data.role && props.data.role._id) ? props.data.role._id : '',
    accessPin: props.data.accessPin || '',
    country: props.data.country || '',
    phone: props.data.phone || '',
    address: props.data.address || '',
    zip: props.data.zip || '',
    city: props.data.city || ''
  });
  const [optionalSection, setOptionalSection] = useState(false);

  const [stores, setStores] = useState([
    { value: '5d47de53d985a40070d00e3a', text: 'Starbucks' } // temporary value
  ])

  const handleOptionalSection = () => {
    setOptionalSection(!optionalSection)
  }

  const onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value })
  }

  const onSelectChange = (e, params) => {
    const name = params.name;
    const value = params.value;
    setData({ ...data, [name]: value })
  }

  useEffect(() => {
    props.dispatch(employeesActions.getRoles());
  }, [])

  const save = async () => {
    try {
      const { confirmPassword, ...rest } = data;
      const optionalFields = ['country', 'zip', 'city', 'address', 'phone', 'id'];
      if (props.data.IS_UPDATING) optionalFields.push('password', 'confirmPassword');
      for (const prop in rest) {
        if (optionalFields.includes(prop)) continue;
        if (!rest[prop]) return Toast('Missing Information', 'All fields are required in order to create employee.', 'danger');
      }
      if (!props.data.IS_UPDATING) {
        if (!confirmPassword || confirmPassword !== rest.password) {
          return Toast('Passwords do not match', 'Please type correct password in both fields.', 'danger');
        }
      }

      let result = {};

      if (props.data.IS_UPDATING) {
        result = await updateEmployee(rest);
      } else {
        result = await createEmployee(rest);
      }
      sidePanelContext.hide();
      props.dispatch(employeesActions.getEmployees());
      if (props.data.IS_UPDATING) {
        Toast('Update Employee', `Employee ${result.data.data.name} has been updated.`, 'success');
      } else {
        Toast('Create New Employee', `New employee ${result.data.data.name} has been added.`, 'success');
      }
    } catch (err) {
      console.log('Error::CreateRole', err.response);
      if (err.response && err.response.data && err.response.data.reason === 'EMAIL_ALREADY_EXISTS') {
        return Toast('Email already exists.', 'Please make sure you provide correct email address.', 'danger');
      }
      Toast('Create New Employee', 'New employee could not be added. Please retry!', 'danger')
    }
  }

  return (
    <div>
      <Segment loading={props.isUpdating} color='blue' raised className='radiusless borderless'>
        <Grid>
          <Grid.Row className='paddingless marginless'>
            <Grid.Column width={16} className='paddingless'>
              <Container style={{ lineHeight: '36px', width: '100%' }}>{props.data.IS_UPDATING ? 'Update Employee' : 'Add New Employee'}</Container>
              <div className='sidebar-action-buttons'>
                <Button positive className='radiusless' onClick={save}><Icon name='save' /> Save</Button>
                <Button negative className='radiusless marginless' onClick={() => sidePanelContext.hide()}><Icon name='cancel' /> Close</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment basic className='marginless radiusless borderless'>
        <Form>
          <Heading as='h3' style={{ marginBottom: '20px' }}>Basic Information</Heading>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Full Name</label>
              <input placeholder="Enter employee's full name" value={data.name} name='name' onChange={onInputChange} />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input placeholder="Enter employee's email address" value={data.email} name='email' onChange={onInputChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Password</label>
              <input placeholder="Enter employee's password" type="password" value={data.password} name='password' onChange={onInputChange} />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input placeholder="Enter employee's password" type="password" value={data.confirmPassword} name='confirmPassword' onChange={onInputChange} />
            </Form.Field>
          </Form.Group>
          <Heading as='h3' style={{ marginBottom: '20px' }}>Roles &amp; Access</Heading>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Default Store</label>
              <Form.Select search fluid name='defaultStore' value={data.store} options={stores} onChange={onSelectChange} />
            </Form.Field>
            <Form.Field>
              <label>Role</label>
              <Form.Select search fluid name='role' value={data.role} options={allRoles} onChange={onSelectChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field width='8'>
              <label>Access Pin</label>
              <input placeholder="Enter employee's access pin" value={data.accessPin} name='accessPin' onChange={onInputChange} />
            </Form.Field>
          </Form.Group>

          <Accordion>
            <Accordion.Title active={optionalSection} index={0} onClick={handleOptionalSection}>
              <Icon name='dropdown' />
              Optional Fields (<small>click to open</small>)
          </Accordion.Title>
            <Accordion.Content active={optionalSection}>
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
            </Accordion.Content>
          </Accordion>
        </Form>
      </Segment>
    </div>
  );
}

const mapStateToProps = state => ({
  roles: state.employees.roles.data
})

export default connect(mapStateToProps)(AddNewRoleSidebar);
