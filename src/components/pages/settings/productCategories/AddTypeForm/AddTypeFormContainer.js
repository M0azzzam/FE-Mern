import React, { useState, useContext } from 'react';
import { connect } from 'react-redux';
import AddTypeForm from './AddTypeForm';
import SidePanelContext from '../../../../extension/SidePanelContext';
import { productCategoriesActions } from '../../../../../store/actions/settings/productCategories';
import Toast from '../../../../extension/Toast';

const AddTypeFormContainer = props => {

  const { dispatch, isUpdating } = props;
  const { meta, gridApi, IS_UPDATING } = props.data || {};
  const sidePanelContext = useContext(SidePanelContext);
  const [data, setData] = useState({
    name: IS_UPDATING ? props.data.name : '',
    triggers: {
      onPOS: IS_UPDATING ? props.data.triggers.onPOS : true,
      isPart: IS_UPDATING ? props.data.triggers.isPart : false,
    },
    valuationMethod: IS_UPDATING ? props.data.valuationMethod : ''
  })

  const valuationMethod = [
    {
      value: 'LIFO',
      text: 'LIFO'
    },
    {
      value: 'FIFO',
      text: 'FIFO'
    },
    {
      value: 'WAC',
      text: 'WAC'
    }
  ]

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleTriggers = (newData) => {
    setData({
      ...data,
      triggers: {
        ...data.triggers,
        [newData.name]: newData.checked
      }
    })
  }

  const handleSelectGroups = (newData) => {
    setData({
      ...data,
      [newData[1].name]: newData[1].value
    })
  }

  const save = async () => {
    try {
      const { triggers, valuationMethod, ...rest } = data;

      for (const prop in rest) {
        if (!rest[prop]) return Toast('Missing Information', 'Please fill in required fields.', 'danger');
      }

      if (IS_UPDATING) {
        const { _id: id } = props.data;

        await dispatch(productCategoriesActions.updateProductCategory({ id, ...data }));
        sidePanelContext.hide();
        Toast('Update Product Category', `Product Category ${data.name} updated successfully`, 'success');

        await dispatch(productCategoriesActions.getProductCategories(meta));
        gridApi.redrawRows();
      } else {
        await dispatch(productCategoriesActions.createProductCategory(rest));
        Toast('Create Product Category', `Product Category ${rest.name} created successfully`, 'success');

        sidePanelContext.hide();
        dispatch(productCategoriesActions.getProductCategories(meta));
      }
    } catch (err) {
      let message, title;

      message = IS_UPDATING ? 'Product Category could not be updated, Please retry!' : 'Product Category could not be created successfully. Please retry!';
      if (err.response && err.response.data && err.response.data.reason) {
        message = err.response.data.reason
      }

      title = IS_UPDATING ? 'Update Product Category' : 'Create Product Category';
      Toast(title, message, 'danger');
    }
  }

  return (
    <AddTypeForm data={{
      handleInputChange,
      handleTriggers,
      handleSelectGroups,
      sidePanelContext,
      valuationMethod,
      save,
      IS_UPDATING,
      isUpdating,
      data
    }} />
  )
}

const mapStateToProps = state => ({
  isUpdating: state.productCategories.isUpdating
})

export default connect(mapStateToProps)(AddTypeFormContainer);
