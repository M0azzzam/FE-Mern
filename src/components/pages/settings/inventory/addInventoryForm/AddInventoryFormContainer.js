import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import AddInventoryForm from './AddInventoryForm';
import SidePanelContext from '../../../../extension/SidePanelContext';
import { inventoryActions } from '../../../../../store/actions/settings/inventory';
import Toast from '../../../../extension/Toast';

const AddInventoryFormContainer = props => {

  const sidePanelContext = useContext(SidePanelContext);
  const { dispatch, isUpdating } = props;
  const { meta, IS_UPDATING, ...rest } = props.data || {};
  const [data, setData] = useState({
    name: IS_UPDATING ? rest && rest.name : '',
    description: IS_UPDATING ? rest && rest.description : '',
    type: IS_UPDATING ? rest && rest.type : 'Service',
    taxExempt: IS_UPDATING ? rest && rest.taxExempt : false
  });
  const [stockData, setStockData] = useState({
    unitCost: IS_UPDATING ? rest && rest.inventoryStock && rest.inventoryStock.unitCost : 0,
    quantity: IS_UPDATING ? rest && rest.inventoryStock && rest.inventoryStock.quantity : 0,
    reOrderLevel: IS_UPDATING ? rest && rest.inventoryStock && rest.inventoryStock.reOrderLevel : 0
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, stock = false) => {
    if (stock) {
      setStockData({
        ...stockData,
        [e.target.name]: e.target.value
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value
      });
    }
  }

  const handleSelectGroup = (newData) => {
    setData({
      ...data,
      [newData[1].name]: newData[1].value
    });
  }

  const handleCheckBox = (newData) => {
    setData({
      ...data,
      [newData.name]: newData.checked
    });
  }

  const validateRequiredFields = () => {
    const requiredFields = ['name'];
    const combinedData = { ...data, ...stockData };
    let errs = {};
    requiredFields.forEach(f => {
      if (!combinedData[f]) {
        errs = { ...errs, [f]: true }
      } else {
        delete errs[f];
      }
    })
    setErrors(errs);
    return Boolean(Object.keys(errs).length);
  }

  const save = async () => {
    try {
      if (validateRequiredFields()) return;

      if (IS_UPDATING) {
        const { _id: id } = rest;

        await dispatch(inventoryActions.updateInventory({
          id, ...data, inventoryStock: {
            ...stockData
          }
        }));
        sidePanelContext.hide();
        Toast('Update Inventory', `Inventory ${data.name} updated successfully`, 'success');

        await dispatch(inventoryActions.getInventory(meta));
      } else {
        await dispatch(inventoryActions.createInventory({
          ...data,
          inventoryStock: {
            ...stockData
          }
        }));
        Toast('Create Inventory', `Inventory ${data.name} created successfully`, 'success');

        sidePanelContext.hide();
        dispatch(inventoryActions.getInventory(meta));
      }
    } catch (err) {
      let message, title;

      message = IS_UPDATING ? 'Inventory could not be updated. Please retry!' : 'Inventory could not be created successfully. Please retry!';
      if (err.response && err.response.data && err.response.data.reason) {
        message = err.response.data.reason
      }

      title = IS_UPDATING ? 'Update Inventory' : 'Create Inventory';
      Toast(title, message, 'danger');
    }
  }

  const inventoryOptions = [
    {
      key: 'Service',
      value: 'Service',
      text: 'Service'
    },
    {
      key: 'Product',
      value: 'Product',
      text: 'Product'
    }
  ];

  return (
    <AddInventoryForm data={{
      sidePanelContext,
      handleInputChange,
      handleSelectGroup,
      handleCheckBox,
      save,
      IS_UPDATING,
      isUpdating,
      inventoryOptions,
      stockData,
      data,
      errors
    }} />
  )
}

const mapStateToProps = state => ({
  isUpdating: state.inventory.isUpdating
})

export default connect(mapStateToProps)(AddInventoryFormContainer);
