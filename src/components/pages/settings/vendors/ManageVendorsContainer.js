import React, { useRef, useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SidePanelContext from '../../../extension/SidePanelContext';
import ManageVendors from './ManageVendors';
import AddVendorFormContainer from './AddVendorsForm';
import { vendorsActions } from '../../../../store/actions/settings/vendors';
import Toast from '../../../extension/Toast';

const ManageVendorsContainer = (props) => {

  const { dispatch, vendors, isLoading, meta } = props;
  const sidePanelContext = useContext(SidePanelContext);
  const [disable, setDisabled] = useState(true);
  const [limit, setLimit] = useState(25);
  const [page] = useState(1);
  const gridApiRef = useRef();

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
    dispatch(vendorsActions.getVendors({ page, limit }));
  }, [])

  const handleAddItem = () => {
    sidePanelContext.setData({ Component: AddVendorFormContainer, data: { meta }, sidebarConfig: { width: 500 } })
  }

  const handleUpdateItem = ({ data, meta }) => {
    let gridApi = gridApiRef.current.api;
    sidePanelContext.setData({ Component: AddVendorFormContainer, data: { ...data, IS_UPDATING: true, meta, gridApi }, sidebarConfig: { width: 500 } })
  }

  const handleDeleteItem = async ({ data, meta }) => {
    const item = [data._id];
    try {
      await dispatch(vendorsActions.deleteVendor(item));

      Toast('Delete Vendor', `Vendor ${data.name} deleted successfully`, 'success');
      dispatch(vendorsActions.getVendors(meta));
    } catch (err) {
      Toast('Delete Vendor', `Vendor ${data.name} could not be deleted. Please retry!`, 'danger');
    }
  }

  const handleDeleteSelectedItems = async () => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    try {
      await dispatch(vendorsActions.deleteVendor(rowIds));

      Toast('Delete Vendors', 'Vendors deleted successfully.', 'success');
      dispatch(vendorsActions.getVendors(meta));
    } catch (err) {
      Toast('Delete Vendors', 'Vendors could not be deleted successfully. Please retry!', 'danger');
    }
  }

  const handleButtonsSelection = () => {
    if (gridApiRef.current.api.getSelectedRows().length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  const handleKeyUp = (e) => {
    let value = parseInt(e.target.value)
    if (e.keyCode === 13 && value <= meta.totalPages && value !== meta.page) {
      dispatch(vendorsActions.getVendors({ page: value, limit }));
      e.target.value = '';
    } else if (e.keyCode === 13) {
      e.target.value = '';
    }
  }

  const handleOnPaginationChange = data => {
    dispatch(vendorsActions.getVendors({ page: data[1].activePage, limit }));
  }

  const handleItemsPerPage = data => {
    setLimit(data.value);
    dispatch(vendorsActions.getVendors({ page: 1, limit: data.value }));
  }

  return (
    <ManageVendors ref={gridApiRef} data={{
      handleAddItem,
      handleUpdateItem,
      handleDeleteItem,
      handleDeleteSelectedItems,
      handleButtonsSelection,
      handleKeyUp,
      handleOnPaginationChange,
      handleItemsPerPage,
      pageOptions,
      disable,
      vendors,
      isLoading,
      meta
    }} />
  )
}

const mapStateToProps = state => ({
  vendors: state.vendors.data,
  isLoading: state.vendors.isLoading,
  meta: state.vendors.meta
})

export default connect(mapStateToProps)(ManageVendorsContainer);
