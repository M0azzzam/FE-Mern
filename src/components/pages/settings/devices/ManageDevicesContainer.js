import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ManageDevices from './ManageDevices';
import SidePanelContext from '../../../extension/SidePanelContext';
import AddDevicesContainer from './AddDevicesForm';
import { devicesActions } from '../../../../store/actions/settings/devices';
import Toast from '../../../extension/Toast';

const ManageDevicesContainer = (props) => {

  const { dispatch, devices, meta, isLoading } = props || {};
  const sidePanelContext = useContext(SidePanelContext);
  const [disable, setDisabled] = useState(true);
  const [limit, setLimit] = useState(25);
  const [page] = useState(1);

  const pageOptions = [
    {
      value: 25,
      text: 25,
      key: 25
    },
    {
      value: 50,
      text: 50,
      key: 50
    },
    {
      value: 100,
      text: 100,
      key: 100
    }
  ];

  useEffect(() => {
    dispatch(devicesActions.getDevices({ page, limit }));
  }, []);

  const handleAddItem = () => {
    sidePanelContext.setData({ Component: AddDevicesContainer, data: { meta }, sidebarConfig: { width: 500 } })
  }

  const handleUpdateItem = ({ meta, data, api: gridApi }) => {
    sidePanelContext.setData({ Component: AddDevicesContainer, data: { ...data, IS_UPDATING: true, meta, gridApi }, sidebarConfig: { width: 500, direction: 'top' } })
  }

  const handleDeleteItem = async ({ data, meta }) => {
    const item = [data._id];
    try {
      await dispatch(devicesActions.deleteDevice(item));

      Toast('Delete Device', `Device ${data.name} deleted successfully`, 'success');
      dispatch(devicesActions.getDevices(meta));
    } catch (err) {
      Toast('Delete Device', `Device ${data.name} could not be deleted. Please retry!`, 'danger');
    }
  }

  const handleDeleteSelectedItems = async (gridApiRef) => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    try {
      await dispatch(devicesActions.deleteDevice(rowIds));

      Toast('Delete Device', 'Devices deleted successfully.', 'success');
      dispatch(devicesActions.getDevices(meta));
    } catch (err) {
      Toast('Delete Device', 'Devices could not be deleted successfully. Please retry!', 'danger');
    }
  }

  const handleButtonsSelection = (gridApiRef) => {
    if (gridApiRef.current.api.getSelectedRows().length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const handleDisableSelectedOnPos = async (gridApiRef) => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    const data = {
      id: rowIds,
      triggers: {
        onPOS: false
      }
    }
    try {
      await dispatch(devicesActions.updateDevicesTriggers(data));

      Toast('Device Triggers', 'Devices triggers updated successfully', 'success');
      dispatch(devicesActions.getDevices(meta));
    } catch (err) {
      Toast('Device Triggers', 'Devices triggers could not be updated. Please retry', 'danger');
    }
  }

  const handleShowSelectedOnPos = async (gridApiRef) => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    const data = {
      id: rowIds,
      triggers: {
        onPOS: true
      }
    }
    try {
      await dispatch(devicesActions.updateDevicesTriggers(data));

      Toast('Device Triggers', 'Devices triggers updated successfully', 'success');
      dispatch(devicesActions.getDevices(meta));
    } catch (err) {
      Toast('Device Triggers', 'Devices triggers could not be updated. Please retry', 'danger');
    }
  }

  const handleDisableSelectedOnWidget = async (gridApiRef) => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    const data = {
      id: rowIds,
      triggers: {
        onWidget: false
      }
    }
    try {
      await dispatch(devicesActions.updateDevicesTriggers(data));

      Toast('Device Triggers', 'Devices triggers updated successfully', 'success');
      dispatch(devicesActions.getDevices(meta));
    } catch (err) {
      Toast('Device Triggers', 'Devices triggers could not be updated. Please retry', 'danger');
    }
  }

  const handleShowSelectedOnWidget = async (gridApiRef) => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    const data = {
      id: rowIds,
      triggers: {
        onWidget: true
      }
    }
    try {
      await dispatch(devicesActions.updateDevicesTriggers(data));

      Toast('Device Triggers', 'Devices triggers updated successfully', 'success');
      dispatch(devicesActions.getDevices(meta));
    } catch (err) {
      Toast('Device Triggers', 'Devices triggers could not be updated. Please retry', 'danger');
    }
  }

  const handleKeyUp = (e) => {
    let value = parseInt(e.target.value)
    if (e.keyCode === 13 && value <= meta.totalPages && value !== meta.page) {
      dispatch(devicesActions.getDevices({ page: value, limit }));
      e.target.value = '';
    } else if (e.keyCode === 13) {
      e.target.value = '';
    }
  }

  const handleOnPaginationChange = (data) => {
    dispatch(devicesActions.getDevices({ page: data[1].activePage, limit }));
  }

  const handleItemsPerPage = data => {
    setLimit(data.value);
    dispatch(devicesActions.getDevices({ page: 1, limit: data.value }))
  }

  const getCommaSeparatedData = (params) => {
    if (params && params.data && params.data.colors) {
      const { colors } = params.data;
      return colors.map(color => color.name).join(', ');
    }

    return '';
  }

  return (
    <ManageDevices data={{
      handleAddItem,
      handleUpdateItem,
      handleDeleteItem,
      handleDeleteSelectedItems,
      handleButtonsSelection,
      handleDisableSelectedOnPos,
      handleShowSelectedOnPos,
      handleDisableSelectedOnWidget,
      handleShowSelectedOnWidget,
      handleKeyUp,
      handleOnPaginationChange,
      handleItemsPerPage,
      getCommaSeparatedData,
      devices,
      meta,
      disable,
      pageOptions,
      isLoading
    }} />
  )
}

const mapStateToProps = state => ({
  devices: state.devices.data,
  meta: state.devices.meta,
  isLoading: state.devices.isLoading
})

export default connect(mapStateToProps)(ManageDevicesContainer);
