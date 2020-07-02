import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Icon, Form, Grid, Container } from 'semantic-ui-react';
import SidePanelContext from '../../extension/SidePanelContext';
import { employeesActions } from '../../../store/actions/settings/employees';
import { createRole } from '../../../services/employees';
import Toast from '../../extension/Toast';

const AddNewRoleSidebar = props => {
  const sidePanelContext = useContext(SidePanelContext);
  const [data, setData] = useState({ name: '' });

  const onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value })
  }


  const save = async () => {
    try {
      const result = await createRole(data);
      props.dispatch(employeesActions.getRoles());
      sidePanelContext.hide();
      Toast(
        'Create New Role',
        `New role ${result.data.data.name} has been created.`,
        'success'
      );
    } catch (err) {
      console.log('Error::CreateRole', err);
      Toast(
        'Create New Role',
        'New role could not be created. Please retry!',
        'danger'
      );
    }
  }

  return (
    <div>
      <Segment loading={props.isUpdating} color='blue' raised className='radiusless borderless'>
        <Grid>
          <Grid.Row className='paddingless marginless'>
            <Grid.Column width={16} className='paddingless'>
              <Container style={{ lineHeight: '36px', width: '100%' }}>Add New Role</Container>
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
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Role Name</label>
              <input placeholder='Enter role name' value={data.name} name='name' onChange={onInputChange} />
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    </div>
  );
}

export default connect()(AddNewRoleSidebar);
