import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { Segment, Breadcrumb, Button, Icon, Popup } from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import Toast from '../../extension/Toast';
import { employeesActions } from '../../../store/actions/settings/employees';
import { deleteRole } from '../../../services/employees';
import SidePanelContext from '../../extension/SidePanelContext';
import EditRoleSidebar from './EditRoleSidebar';
import AddNewRoleSidebar from './AddNewRoleSidebar';

const ManageRoles = (props) => {
  const sidePanelContext = useContext(SidePanelContext)
  const { dispatch } = props;

  useEffect(() => {
    dispatch(employeesActions.getRoles());
  }, [dispatch])

  const handleEditRole = (data) => {
    sidePanelContext.setData({ Component: EditRoleSidebar, data, sidebarConfig: { width: 500 } })
  }

  const handleAddNewRole = (data = {}) => {
    sidePanelContext.setData({ Component: AddNewRoleSidebar, data, sidebarConfig: { width: 500 } })
  }

  const handleDeleteRole = async (data) => {
    try {
      const result = await deleteRole({ id: data._id });
      dispatch(employeesActions.getRoles());
      Toast(
        'Delete Role',
        `${result.data.data.name} role has been deleted.`,
        'success'
      );
    } catch (err) {
      console.log('Error::DeleteRole', err);
    }
  }

  const columnDefs = [
    { headerName: 'Roles', field: 'name' },
    { headerName: 'Is Super', field: 'isSuper', cellRendererFramework: (params) => params.data.isSuper ? 'Yes' : 'No' },
    {
      headerName: 'Actions', field: '', cellRendererFramework: (params) => (
        <>
          <button onClick={() => handleEditRole(params.data)}><Icon name='pencil' /></button>
          <Popup
            trigger={
              <button ><Icon name='trash' color='red' /></button>
            }
            content={<Button onClick={() => handleDeleteRole(params.data)} color='red' content='Confirm delete' />}
            on='click'
            position='top right'
          />
        </>
      )
    },
  ]

  return (
    <>
      <Segment basic className='customPrimaryBG' clearing>
        <h3>Manage Roles</h3>
        <Breadcrumb>
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section link>Employees</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Manage Roles</Breadcrumb.Section>
        </Breadcrumb>
        <div style={{ float: 'right' }}>
          <Button positive onClick={handleAddNewRole}><Icon name='add' /> Add New Role</Button>
        </div>
      </Segment>

      <Segment basic className='customPrimaryBG' clearing>
        <div
          className="ag-theme-balham"
          style={{
            height: 'calc(100vh - 150px)'
          }}
        >
          <AgGridReact
            // domLayout='autoHeight'
            onFirstDataRendered={(event) => {
              event.api.sizeColumnsToFit();
            }}
            columnDefs={columnDefs}
            rowData={props.roles}
          />
        </div>
      </Segment>
    </>
  );
}

const mapStateToProps = state => ({
  roles: state.employees.roles.data
})

export default connect(mapStateToProps)(ManageRoles);
