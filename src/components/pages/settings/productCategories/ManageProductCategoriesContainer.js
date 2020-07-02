import React, { useState, useContext, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import ManageProductCategories from './ManageProductCategories';
import SidePanelContext from '../../../extension/SidePanelContext';
import AddTypeFormContainer from './AddTypeForm';
import { productCategoriesActions } from '../../../../store/actions/settings/productCategories';
import Toast from '../../../extension/Toast';

const ManageProductCategoriesContainer = (props) => {

  const { dispatch, meta, productCategories, isLoading } = props;
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
    dispatch(productCategoriesActions.getProductCategories({ limit, page: meta.page || page }));
  }, [])

  const handleAddItem = (activeStep) => {
    sidePanelContext.setData({ Component: AddTypeFormContainer, data: { activeStep, IS_UPDATING: false }, sidebarConfig: { width: 500 } })
  }

  const handleUpdateItem = ({ data, meta }) => {
    let gridApi = gridApiRef.current.api;
    sidePanelContext.setData({ Component: AddTypeFormContainer, data: { ...data, IS_UPDATING: true, meta, gridApi }, sidebarConfig: { width: 500 } })
  }

  const handleDeleteItem = async ({ data, meta }) => {
    const item = [data._id];
    try {
      await dispatch(productCategoriesActions.deleteProductCategory(item));

      Toast('Delete Product Category', `Product Category ${data.name} deleted successfully`, 'success');
      dispatch(productCategoriesActions.getProductCategories(meta));
    } catch (err) {
      Toast('Delete Product Category', `Product Category ${data.name} could not be deleted. Please retry!`, 'danger');
    }
  }

  const handleDeleteSelectedItems = async () => {
    const rowIds = gridApiRef.current.api.getSelectedRows().map(row => row._id);
    try {
      await dispatch(productCategoriesActions.deleteProductCategory(rowIds));

      Toast('Delete Product Categories', 'Product Categories deleted successfully.', 'success');
      dispatch(productCategoriesActions.getProductCategories(meta));
    } catch (err) {
      Toast('Delete Product Categories', 'Product Categories could not be deleted successfully. Please retry!', 'danger');
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
      dispatch(productCategoriesActions.getProductCategories({ page: value, limit }));
      e.target.value = '';
    } else if (e.keyCode === 13) {
      e.target.value = '';
    }
  }

  const handleOnPaginationChange = data => {
    dispatch(productCategoriesActions.getProductCategories({ page: data[1].activePage, limit }));
  }

  const handleItemsPerPage = data => {
    setLimit(data.value);
    dispatch(productCategoriesActions.getProductCategories({ page: 1, limit: data.value }));
  }

  return (
    <ManageProductCategories ref={gridApiRef} data={{
      handleAddItem,
      handleUpdateItem,
      handleDeleteItem,
      handleDeleteSelectedItems,
      handleButtonsSelection,
      handleItemsPerPage,
      handleOnPaginationChange,
      handleKeyUp,
      pageOptions,
      productCategories,
      isLoading,
      disable,
      meta,
    }} />
  )
}

const mapStateToProps = state => ({
  productCategories: state.productCategories.data,
  isLoading: state.productCategories.isLoading,
  meta: state.productCategories.meta
})

export default connect(mapStateToProps)(ManageProductCategoriesContainer);
