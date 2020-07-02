import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { Segment, Breadcrumb, Button, Icon, Popup } from 'semantic-ui-react';
import { employeesActions } from '../../../store/actions/settings/employees';
import SidePanelContext from '../../extension/SidePanelContext';
import { AgGridReact } from 'ag-grid-react';
import AddNewEmployeeSidebar from './AddNewEmployeeSidebar';
import * as employeesService from '../../../services/employees';
import Toast from '../../extension/Toast';

const ManageEmployees = (props) => {

  const { dispatch } = props;
  const sidePanelContext = useContext(SidePanelContext);

  useEffect(() => {
    dispatch(employeesActions.getEmployees());
  }, [])

  const handleDeleteEmployee = async (data) => {
    try {
      const { _id: id } = data;
      await employeesService.deleteEmployee({ id });
      props.dispatch(employeesActions.getEmployees());
      Toast('Employee deleted', `Employee '${data.name}' has been deleted`, 'success');
    } catch (err) {
      console.log('Error:DeleteEmployee', err.response);
      Toast('Something went wrong', `Employee '${data.name}' could not be deleted`, 'danger');
    }
  }

  const columnDefs = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
    { headerName: 'Role', field: 'role.name' },
    { headerName: 'Store', field: 'store' },
    {
      headerName: 'Actions', field: '', pinned: 'right', cellRendererFramework: (params) => (
        <>
          <button onClick={() => handleUpdateEmployee(params.data)}><Icon name='pencil' /></button>
          <Popup
            trigger={
              <button ><Icon name='trash' color='red' /></button>
            }
            content={<Button onClick={() => handleDeleteEmployee(params.data)} color='red' content='Confirm delete' />}
            on='click'
            position='bottom right'
          />
        </>
      ),
      width: 100
    },
  ]

  const handleCreateNewEmployee = () => {
    sidePanelContext.setData({ Component: AddNewEmployeeSidebar, data: {}, sidebarConfig: { width: 960 } })
  }

  const handleUpdateEmployee = (data) => {
    sidePanelContext.setData({ Component: AddNewEmployeeSidebar, data: { ...data, IS_UPDATING: true }, sidebarConfig: { width: 960 } })
  }

  return (
    <>
      <Segment basic className='customPrimaryBG' clearing>
        <h3>Manage Employees</h3>
        <Breadcrumb>
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section link>Employees</Breadcrumb.Section>
          <Breadcrumb.Divider>/</Breadcrumb.Divider>
          <Breadcrumb.Section active>Manage Employees</Breadcrumb.Section>
        </Breadcrumb>
        <div style={{ float: 'right' }}>
          <Button positive onClick={handleCreateNewEmployee}><Icon name='add' /> Add New Employee</Button>
        </div>
      </Segment>

      <Segment basic style={{ background: 'rgba(0, 0, 0, .03)', height: '100%' }} clearing>
        <div
          className="ag-theme-balham"
          style={{
            height: 'calc(100vh - 150px)'
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={props.employees}
          />
        </div>
      </Segment>
    </>
  );
}

const mapStateToProps = state => ({
  employees: state.employees.employees.data
})

export default connect(mapStateToProps)(ManageEmployees);
