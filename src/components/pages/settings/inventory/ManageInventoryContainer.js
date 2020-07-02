import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ManageInventory from './ManageInventory';
import AddInventoryFormContainer from './addInventoryForm';
import SidePanelContext from '../../../extension/SidePanelContext';
import { inventoryActions } from '../../../../store/actions/settings/inventory';
import Toast from '../../../extension/Toast';
import { pagination } from '../../../../config/config';
import indexOf from 'lodash/indexOf';
import pull from 'lodash/pull';

const ManageInventoryContainer = (props) => {

  const { dispatch, inventory, isLoading, meta } = props;
  const sidePanelContext = useContext(SidePanelContext);
  const [selectedInventoryItems, setSelectedInventoryItems] = useState([]);
  const [limit, setLimit] = useState(pagination && pagination.limit);
  const [pageOptions] = useState(pagination && pagination.list);
  const [page] = useState(1);

  useEffect(() => {
    dispatch(inventoryActions.getInventory({ page, limit }));
  }, []);

  const handleAddItem = () => {
    sidePanelContext.setData({ Component: AddInventoryFormContainer, data: {}, sidebarConfig: { width: 500 } });
  }

  const handleUpdateItem = (data) => {
    sidePanelContext.setData({ Component: AddInventoryFormContainer, data: { ...data, IS_UPDATING: true, meta }, sidebarConfig: { width: 500 } });
  }

  const handleDeleteItem = async (data) => {
    const item = [data._id];
    try {
      await dispatch(inventoryActions.deleteInventory(item));

      Toast('Delete Inventory', `Inventory ${data.firstName} deleted successfully`, 'success');
      dispatch(inventoryActions.getInventory(meta));
    } catch (err) {
      Toast('Delete Inventory', `Inventory ${data.firstName} could not be deleted. Please retry!`, 'danger');
    }
  }

  const handleDeleteItems = async () => {
    try {
      await dispatch(inventoryActions.deleteInventory(selectedInventoryItems));

      Toast('Delete Inventories', `Inventories deleted successfully`, 'success');
      dispatch(inventoryActions.getInventory(meta));
    } catch (err) {
      Toast('Delete Inventories', `Inventories could not be deleted. Please retry!`, 'danger');
    }
  }

  const inventoryIds = inventory.map(_inventory => {
    return _inventory._id
  })

  const handleSelectAll = () => {
    setSelectedInventoryItems([
      ...inventoryIds
    ]);
  }

  const handleSelect = (id) => {
    if (indexOf(selectedInventoryItems, id) === -1) {
      setSelectedInventoryItems([
        ...selectedInventoryItems,
        id
      ]);
    } else {
      let _selectedInventoryItems = pull([...selectedInventoryItems], id);
      setSelectedInventoryItems([
        ..._selectedInventoryItems
      ]);
    }
  }

  const handleKeyUp = (e) => {
    let value = parseInt(e.target.value)
    if (e.keyCode === 13 && value <= meta.totalPages && value !== meta.page) {
      dispatch(inventoryActions.getInventory({ page: value, limit }));
      e.target.value = '';
    } else if (e.keyCode === 13) {
      e.target.value = '';
    }
  }

  const handleOnPaginationChange = data => {
    dispatch(inventoryActions.getInventory({ page: data[1].activePage, limit }));
  }

  const handleItemsPerPage = data => {
    setLimit(data.value);
    dispatch(inventoryActions.getInventory({ page: 1, limit: data.value }));
  }

  return (
    <ManageInventory data={{
      handleAddItem,
      handleUpdateItem,
      handleDeleteItem,
      handleDeleteItems,
      handleKeyUp,
      handleOnPaginationChange,
      handleItemsPerPage,
      handleSelect,
      handleSelectAll,
      selectedInventoryItems,
      inventoryIds,
      inventory,
      isLoading,
      pageOptions,
      meta
    }} />
  )
}

const mapStateToProps = state => ({
  inventory: state.inventory.data,
  meta: state.inventory.meta,
  isLoading: state.inventory.isLoading
})

export default connect(mapStateToProps)(ManageInventoryContainer);
