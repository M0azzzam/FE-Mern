import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import AddTaxForm from './AddTaxForm';
import SidePanelContext from '../../../../extension/SidePanelContext';
import Toast from '../../../../extension/Toast';
import { taxActions } from '../../../../../store/actions/settings/taxes';

const AddTaxFormContainer = props => {

  const sidePanelContext = useContext(SidePanelContext);
  const { dispatch, isUpdating } = props;
  const { IS_UPDATING, ...rest } = props.data || {};
  const [data, setData] = useState({
    name: IS_UPDATING ? rest && rest.name : '',
    value: IS_UPDATING ? rest && rest.value : '',
    unit: 'PERCENTAGE',
    default: IS_UPDATING ? rest && rest.default : false
  });

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleCheckbox = (newData) => {
    setData({
      ...data,
      [newData.name]: newData.checked
    });
  }

  const handleSelectGroup = (newData) => {
    setData({
      ...data,
      [newData[1].name]: newData[1].value
    });
  }

  const save = async () => {
    try {
      if (IS_UPDATING) {
        const { _id: id } = props.data;

        await dispatch(taxActions.updateTax({ id, ...data }));
        sidePanelContext.hide();
        Toast('Update Tax', `Tax ${data.name} updated successfully`, 'success');

        await dispatch(taxActions.getTaxes({ limit: 0 }));
      } else {
        await dispatch(taxActions.createTax(data));
        Toast('Create Tax', `Tax ${data.name} created successfully`, 'success');

        sidePanelContext.hide();
        dispatch(taxActions.getTaxes({ limit: 0 }));
      }
    } catch (err) {
      let message, title;

      message = IS_UPDATING ? 'Tax could not be updated. Please retry!' : 'Tax could not be created successfully. Please retry!';
      if (err.response && err.response.data && err.response.data.reason) {
        message = err.response.data.reason
      }

      title = IS_UPDATING ? 'Update Tax' : 'Create Tax';
      Toast(title, message, 'danger');
    }
  }

  const unitOptions = [
    {
      key: 'CURRENCY',
      value: 'CURRENCY',
      text: 'Flat'
    },
    {
      key: 'PERCENTAGE',
      value: 'PERCENTAGE',
      text: 'Percentage'
    }
  ]

  return (
    <AddTaxForm data={{
      sidePanelContext,
      handleInputChange,
      handleSelectGroup,
      handleCheckbox,
      save,
      data,
      IS_UPDATING,
      isUpdating,
      unitOptions
    }} />
  )
}

const mapStateToProps = state => ({
  isUpdating: state.taxes.isUpdating
})

export default connect(mapStateToProps)(AddTaxFormContainer);
