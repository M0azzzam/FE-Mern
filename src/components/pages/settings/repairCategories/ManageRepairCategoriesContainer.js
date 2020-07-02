import React, { useState, useContext, useEffect, useRef } from 'react';
import { connect } from 'react-redux'
import ManageRepairCategories from './ManageRepairCategories';
import SidePanelContext from '../../../extension/SidePanelContext';
import AddRepairCategoryFormContainer from './AddRepairCategoryForm';
import { repairCategoriesActions } from '../../../../store/actions/settings/repairCategories';
import Toast from '../../../extension/Toast';
import { pagination } from '../../../../config/config';

const ManageRepairCategoriesContainer = (props) => {

  const { dispatch, repairCategories, isLoading, meta } = props || {};
  const [repairCategory, setRepairCategory] = useState(true);
  const sidePanelContext = useContext(SidePanelContext);
  const [disable, setDisabled] = useState(true);
  const [limit, setLimit] = useState(pagination.limit);
  const [page] = useState(pagination.defaultPage);
  const gridApiRef = useRef();
  const pageOptions = pagination.list;

  useEffect(() => {
    dispatch(repairCategoriesActions.getRepairCategories({ page, limit }));
  }, [])

  const handleRepairCategory = () => {
    setRepairCategory(!repairCategory);
  }

  const handleAddRepairCategory = () => {
    sidePanelContext.setData({ Component: AddRepairCategoryFormContainer, data: {}, sidebarConfig: { width: 700 } })
  }
  const handleUpdateItem = ({ meta, data, api: gridApi }) => {
    sidePanelContext.setData({ Component: AddRepairCategoryFormContainer, data: { ...data, IS_UPDATING: true, meta, gridApi }, sidebarConfig: { width: 700 } })
  }

  const handleDeleteItem = async ({ data, meta }) => {
    const item = [data._id];
    try {
      await dispatch(repairCategoriesActions.deleteRepairCategories(item));

      Toast('Delete Repair Category', `Repair Category ${data.name} deleted successfully`, 'success');
      dispatch(repairCategoriesActions.getRepairCategories(meta));
    } catch (err) {
      Toast('Delete Repair Categories', `Repair Categories ${data.name} could not be deleted. Please retry!`, 'danger');
    }
  }

  const handleDeleteSelectedItems = async () => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    try {
      await dispatch(repairCategoriesActions.deleteRepairCategories(rowIds));

      Toast('Delete Repair Categories', 'Repair Categories deleted successfully.', 'success');
      dispatch(repairCategoriesActions.getRepairCategories(meta));
    } catch (err) {
      Toast('Delete Repair Categories', 'Repair Categories could not be deleted successfully. Please retry!', 'danger');
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
      dispatch(repairCategoriesActions.getRepairCategories({ page: value, limit }));
      e.target.value = '';
    } else if (e.keyCode === 13) {
      e.target.value = '';
    }
  }

  const handleOnPaginationChange = data => {
    dispatch(repairCategoriesActions.getRepairCategories({ page: data[1].activePage, limit }));
  }

  const handleItemsPerPage = data => {
    setLimit(data.value);
    dispatch(repairCategoriesActions.getRepairCategories({ page: 1, limit: data.value }));
  }

  const handleMultipleTriggersOnPos = async (flag) => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    const data = {
      id: rowIds,
      triggers: {
        onPOS: flag
      }
    }
    try {
      await dispatch(repairCategoriesActions.updateRepairCategoriesTriggers(data));
      Toast('Repair Categories', 'Repair Categories triggers updated successfully', 'success');
      dispatch(repairCategoriesActions.getRepairCategories(meta));
    } catch (err) {
      Toast('Repair Categories', 'Repair Categories triggers could not be updated. Please retry', 'danger');
    }
  }

  const commaSeperatedStringManufacturers = (manufacturers = [], delimeter = ', ') => {
    let arr = [];
    arr = manufacturers.map(data => data.manufacturer.name);
    return arr.join(delimeter);
  }

  const commaSeperatedStringDevices = (manufacturers = [], delimeter = ', ') => {
    let arr = [];
    arr = manufacturers.map(data => data.devices.map(device => device.name));
    return arr.join(delimeter);
  }

  return (
    <ManageRepairCategories ref={gridApiRef} data={{
      handleRepairCategory,
      handleAddRepairCategory,
      handleUpdateItem,
      handleDeleteItem,
      handleDeleteSelectedItems,
      handleButtonsSelection,
      handleKeyUp,
      handleOnPaginationChange,
      handleItemsPerPage,
      handleMultipleTriggersOnPos,
      commaSeperatedStringManufacturers,
      commaSeperatedStringDevices,
      repairCategories,
      pageOptions,
      disable,
      meta,
      isLoading
    }} />
  )
}

const mapStateToProps = state => ({
  repairCategories: state.repairCategories.data,
  meta: state.repairCategories.meta,
  isLoading: state.repairCategories.isLoading
})
export default connect(mapStateToProps)(ManageRepairCategoriesContainer);
