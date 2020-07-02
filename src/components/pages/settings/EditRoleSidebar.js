import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Icon, Form, Select, Grid, Container, Accordion } from 'semantic-ui-react';
import SidePanelContext from '../../extension/SidePanelContext';
import { employeesActions } from '../../../store/actions/settings/employees';
import { find, cloneDeep, indexOf, filter } from 'lodash';



const EditRoleSidebar = props => {
  const sidePanelContext = useContext(SidePanelContext);
  const [data, setData] = useState(cloneDeep(props.data));
  const [accordianIndex, setAccordianIndex] = useState([0]);

  const onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value })
  }

  const onCheckboxChange = (e, params) => {
    const name = params.name.split('.');
    const value = params.checked;

    let foundPermission = find(data.permissions, (d) => d.module === name[0]);
    foundPermission[name[1]] = value;

    setData({ ...data })
  }

  const onSelectChange = (e, params) => {
    const name = params.name;
    const value = params.value;
    setData({ ...data, [name]: value })
  }

  const hanldeAccordian = (e, titleProps) => {
    const { index } = titleProps;
    if (indexOf(accordianIndex, index) < 0) setAccordianIndex([...accordianIndex, index]);
    else setAccordianIndex(filter(accordianIndex, (d) => d !== index));
  }

  const handleCheckAll = (e, params) => {
    const name = params.name.split('.');
    const value = params.checked;

    let foundPermission = find(data.permissions, (d) => d.module === name[0]);
    foundPermission[name[1]] = value;

    setData({ ...data })
  }

  const save = () => {
    const { _id: id, name, isSuper, permissions } = data;
    props.dispatch(employeesActions.updateRole({ id, name, isSuper, permissions }));
    props.dispatch(employeesActions.getRoles());
  }

  return (
    <div>
      <Segment loading={props.isUpdating} color='blue' raised className='radiusless borderless'>
        <Grid>
          <Grid.Row className='paddingless marginless'>
            <Grid.Column width={16} className='paddingless'>
              <Container style={{ lineHeight: '36px', width: '100%' }}>Edit Roles &amp; Permissions</Container>
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
            <Form.Field
              control={Select}
              value={data.isSuper}
              options={[{ key: 'no', text: 'No', value: false }, { key: 'yes', text: 'Yes', value: true }]}
              label={{ children: 'Is Super', htmlFor: 'form-select-control-isSuper' }}
              placeholder='Is Super'
              searchInput={{ id: 'form-select-control-isSuper' }}
              name='isSuper'
              onChange={onSelectChange}
            />
          </Form.Group>
        </Form>
      </Segment>
      <Segment basic className='marginless radiusless borderless'>
        <p>Permissions associated with this role:</p>
        <Form>
          {data.permissions && data.permissions.map((permission, index) => {
            return <Accordion styled key={index}>
              <Accordion.Title active={indexOf(accordianIndex, index) > -1} index={index} onClick={hanldeAccordian}>
                <Icon name={indexOf(accordianIndex, index) > -1 ? 'caret down' : 'caret right'} /> {permission.module.toUpperCase()}
              </Accordion.Title>
              <Accordion.Content active={indexOf(accordianIndex, index) > -1}>
                <Form.Group>
                  <Form.Checkbox
                    toggle
                    checked={permission.access}
                    label={{ children: 'Access', htmlFor: 'form-select-control-access' }}
                    placeholder='Access'
                    name={`${permission.module}.access`}
                    onChange={onCheckboxChange}
                    className='small'
                  />
                  <Form.Checkbox
                    toggle
                    checked={permission.edit}
                    label={{ children: 'Edit', htmlFor: 'form-select-control-edit' }}
                    placeholder='Edit'
                    name={`${permission.module}.edit`}
                    onChange={onCheckboxChange}
                  />
                  <Form.Checkbox
                    toggle
                    checked={permission.delete}
                    label={{ children: 'Delete', htmlFor: 'form-select-control-delete' }}
                    placeholder='Delete'
                    name={`${permission.module}.delete`}
                    onChange={onCheckboxChange}
                  />
                </Form.Group>
              </Accordion.Content>
            </Accordion>
          })}

        </Form>
      </Segment>
    </div>
  );
}

const mapStateToProps = state => ({
  isUpdating: state.employees.roles.isUpdating
})

export default connect(mapStateToProps)(EditRoleSidebar);
