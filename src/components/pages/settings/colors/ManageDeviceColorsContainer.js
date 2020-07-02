import React, { useContext, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import ManageDeviceColors from './ManageDeviceColors';
import SidePanelContext from '../../../extension/SidePanelContext';
import AddColorFormContainer from './AddColorForm';
import { colorsActions } from '../../../../store/actions/settings/colors';
import Toast from '../../../extension/Toast';

const ManageDeviceColorsContainer = props => {
  const { colors, meta, isLoading, dispatch } = props;
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
    dispatch(colorsActions.getColors({ page, limit }));
  }, [])

  const handleAddItem = () => {
    sidePanelContext.setData({ Component: AddColorFormContainer, data: { meta }, sidebarConfig: { width: 500 } })
  }

  const handleUpdateItem = ({ data, meta }) => {
    let gridApi = gridApiRef.current.api;
    sidePanelContext.setData({ Component: AddColorFormContainer, data: { ...data, IS_UPDATING: true, meta, gridApi }, sidebarConfig: { width: 500 } })
  }

  const handleDeleteItem = async ({ data, meta }) => {
    const item = [data._id];
    try {
      await dispatch(colorsActions.deleteColor(item));

      Toast('Delete Colors', `Colors ${data.name} deleted successfully`, 'success');
      dispatch(colorsActions.getColors(meta));
    } catch (err) {
      Toast('Delete Colors', `Colors ${data.name} could not be deleted. Please retry!`, 'danger');
    }
  }

  const handleDeleteSelectedItems = async () => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    try {
      await dispatch(colorsActions.deleteColor(rowIds));

      Toast('Delete Colors', 'Colors deleted successfully.', 'success');
      dispatch(colorsActions.getColors(meta));
    } catch (err) {
      Toast('Delete Colors', 'Colors could not be deleted successfully. Please retry!', 'danger');
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
      dispatch(colorsActions.getColors({ page: value, limit }));
      e.target.value = '';
    } else if (e.keyCode === 13) {
      e.target.value = '';
    }
  }

  const handleOnPaginationChange = data => {
    dispatch(colorsActions.getColors({ page: data[1].activePage, limit }));
  }

  const handleItemsPerPage = data => {
    setLimit(data.value);
    dispatch(colorsActions.getColors({ page: 1, limit: data.value }));
  }

  return (
    <ManageDeviceColors ref={gridApiRef} data={{
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
      colors,
      meta,
      isLoading
    }} />
  )
}

const mapStateToProps = state => ({
  colors: state.colors.data,
  isLoading: state.colors.isLoading,
  meta: state.colors.meta
})

export default connect(mapStateToProps)(ManageDeviceColorsContainer);
