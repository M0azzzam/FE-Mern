import React, { useContext, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import ManagePhysicalLocations from './ManagePhysicalLocations';
import SidePanelContext from '../../../extension/SidePanelContext';
import AddPhysicalLocationFormContainer from './AddPhysicalLocationForm';
import { physicalLocationsActions } from '../../../../store/actions/settings/physicalLocations';
import Toast from '../../../extension/Toast';
import { pagination } from '../../../../config/config';

const ManagePhysicalLocationsContainer = (props) => {

  const { dispatch, physicalLocations, isLoading, meta } = props;
  const sidePanelContext = useContext(SidePanelContext);
  const [disable, setDisabled] = useState(true);
  const [limit, setLimit] = useState(pagination && pagination.limit);
  const [pageOptions] = useState(pagination && pagination.list);
  const [page] = useState(1);
  const gridApiRef = useRef();

  useEffect(() => {
    dispatch(physicalLocationsActions.getPhysicalLocations({ page, limit }));
  }, [])

  const handleAddItem = () => {
    sidePanelContext.setData({ Component: AddPhysicalLocationFormContainer, data: { meta }, sidebarConfig: { width: 500 } })
  }

  const handleUpdateItem = ({ data, meta }) => {
    let gridApi = gridApiRef.current.api;
    sidePanelContext.setData({ Component: AddPhysicalLocationFormContainer, data: { ...data, IS_UPDATING: true, meta, gridApi }, sidebarConfig: { width: 500 } })
  }

  const handleDeleteItem = async ({ data, meta }) => {
    const item = [data._id];
    try {
      await dispatch(physicalLocationsActions.deletePhysicalLocation(item));

      Toast('Delete Physical Location', `Physical Location ${data.name} deleted successfully`, 'success');
      dispatch(physicalLocationsActions.getPhysicalLocations(meta));
    } catch (err) {
      Toast('Delete Physical Location', `Physical Location ${data.name} could not be deleted. Please retry!`, 'danger');
    }
  }

  const handleDeleteSelectedItems = async () => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    try {
      await dispatch(physicalLocationsActions.deletePhysicalLocation(rowIds));

      Toast('Delete Physical Locations', 'Physical Locations deleted successfully.', 'success');
      dispatch(physicalLocationsActions.getPhysicalLocations(meta));
    } catch (err) {
      Toast('Delete Physical Locations', 'Physical Locations could not be deleted successfully. Please retry!', 'danger');
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
      dispatch(physicalLocationsActions.getPhysicalLocations({ page: value, limit }));
      e.target.value = '';
    } else if (e.keyCode === 13) {
      e.target.value = '';
    }
  }

  const handleOnPaginationChange = data => {
    dispatch(physicalLocationsActions.getPhysicalLocations({ page: data[1].activePage, limit }));
  }

  const handleItemsPerPage = data => {
    setLimit(data.value);
    dispatch(physicalLocationsActions.getPhysicalLocations({ page: 1, limit: data.value }));
  }

  return (
    <ManagePhysicalLocations ref={gridApiRef} data={{
      handleAddItem,
      handleUpdateItem,
      handleDeleteItem,
      handleDeleteSelectedItems,
      handleButtonsSelection,
      handleKeyUp,
      handleOnPaginationChange,
      handleItemsPerPage,
      pageOptions,
      physicalLocations,
      isLoading,
      meta,
      disable
    }} />
  )
}

const mapStateToProps = state => ({
  physicalLocations: state.physicalLocations.data,
  isLoading: state.physicalLocations.isLoading,
  meta: state.physicalLocations.meta
})

export default connect(mapStateToProps)(ManagePhysicalLocationsContainer);
