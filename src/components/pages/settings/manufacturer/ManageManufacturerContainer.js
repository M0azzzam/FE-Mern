import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ManageManufacturer from './ManageManufacturer';
import SidePanelContext from '../../../extension/SidePanelContext';
import AddManufacturerContainer from './AddManufacturerForm';
import { manufacturersActions } from '../../../../store/actions/settings/manufacturers';

const ManageManufacturerContainer = (props) => {

  const { dispatch, manufacturers, isLoading, meta } = props || {};
  const sidePanelContext = useContext(SidePanelContext);
  const [disable, setDisabled] = useState(true);
  const [limit, setLimit] = useState(25);
  const [page] = useState(1);

  const pageOptions = [
    {
      value: 25,
      text: 25
    },
    {
      value: 50,
      text: 50
    },
    {
      value: 100,
      text: 100
    }
  ];

  useEffect(() => {
    dispatch(manufacturersActions.getManufacturers({ page, limit }))
  }, [])

  const handleKeyUp = (e) => {
    let value = parseInt(e.target.value)
    if (e.keyCode === 13 && value <= meta.totalPages && value !== meta.page) {
      dispatch(manufacturersActions.getManufacturers({ page: value, limit }));
      e.target.value = '';
    } else if (e.keyCode === 13) {
      e.target.value = '';
    }
  }

  const handleAddItem = () => {
    sidePanelContext.setData({ Component: AddManufacturerContainer, data: { meta }, sidebarConfig: { width: 500 } })
  }

  const handleUpdateItem = ({ data, meta, api: gridApi }) => {
    sidePanelContext.setData({ Component: AddManufacturerContainer, data: { ...data, meta, gridApi, IS_UPDATING: true }, sidebarConfig: { width: 500 } })
  }

  const handleDeleteItem = async ({ data, meta }) => {
    await dispatch(manufacturersActions.deleteManufacturer(data));
    dispatch(manufacturersActions.getManufacturers(meta));
  }

  const handleDeleteSelectedItems = async (gridApiRef) => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    await dispatch(manufacturersActions.deleteManufacturer(rowIds));
    dispatch(manufacturersActions.getManufacturers(meta));
  }

  const handleDisableSelectedOnPos = async (gridApiRef) => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    const data = {
      id: rowIds,
      triggers: {
        onPOS: false
      }
    }
    await dispatch(manufacturersActions.updateManufacturersTriggers(data));
    dispatch(manufacturersActions.getManufacturers(meta));
  }

  const handleShowSelectedOnPos = async (gridApiRef) => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    const data = {
      id: rowIds,
      triggers: {
        onPOS: true
      }
    }
    await dispatch(manufacturersActions.updateManufacturersTriggers(data));
    dispatch(manufacturersActions.getManufacturers(meta));
  }

  const handleDisableSelectedOnWidget = async (gridApiRef) => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    const data = {
      id: rowIds,
      triggers: {
        onWidget: false
      }
    }
    await dispatch(manufacturersActions.updateManufacturersTriggers(data));
    dispatch(manufacturersActions.getManufacturers(meta));
  }

  const handleShowSelectedOnWidget = async (gridApiRef) => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    const data = {
      id: rowIds,
      triggers: {
        onWidget: true
      }
    }
    await dispatch(manufacturersActions.updateManufacturersTriggers(data));
    dispatch(manufacturersActions.getManufacturers(meta));
  }

  const handleButtonsSelection = (gridApiRef) => {
    if (gridApiRef.current.api.getSelectedRows().length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const handleOnPaginationChange = (data) => {
    dispatch(manufacturersActions.getManufacturers({ page: data[1].activePage, limit }));
  }

  const handleItemsPerPage = data => {
    setLimit(data.value);
    dispatch(manufacturersActions.getManufacturers({ page: 1, limit: data.value }))
  }

  return (
    <ManageManufacturer data={{
      handleAddItem,
      handleUpdateItem,
      handleDeleteItem,
      handleDeleteSelectedItems,
      handleDisableSelectedOnPos,
      handleShowSelectedOnPos,
      handleDisableSelectedOnWidget,
      handleShowSelectedOnWidget,
      handleOnPaginationChange,
      handleButtonsSelection,
      handleItemsPerPage,
      handleKeyUp,
      manufacturers,
      isLoading,
      meta,
      disable,
      pageOptions
    }}
    />
  );
}

const mapStateToProps = state => ({
  manufacturers: state.manufacturers.data,
  meta: state.manufacturers.meta,
  isLoading: state.manufacturers.isLoading
})

export default connect(mapStateToProps)(ManageManufacturerContainer);
