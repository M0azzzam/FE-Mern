import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import AddVendorForm from './AddVendorForm';
import SidePanelContext from '../../../../extension/SidePanelContext';
import { vendorsActions } from '../../../../../store/actions/settings/vendors';
import Toast from '../../../../extension/Toast';

const AddVendorFormContainer = props => {

  const sidePanelContext = useContext(SidePanelContext);
  const { dispatch, isUpdating } = props;
  const { meta, gridApi, IS_UPDATING } = props.data || {};
  const [data, setData] = useState({
    name: IS_UPDATING ? props.data.name : '',
    vendorCode: IS_UPDATING ? props.data.vendorCode : '',
    email: IS_UPDATING ? props.data.email : '',
    website: IS_UPDATING ? props.data.website : '',
    phone: IS_UPDATING ? props.data.phone : '',
    mobile: IS_UPDATING ? props.data.mobile : '',
    address: IS_UPDATING ? props.data.address : '',
    postCode: IS_UPDATING ? props.data.postCode : '',
    doubleTax: IS_UPDATING ? props.data.doubleTax : false
  });

  const doubleTaxOptions = [
    {
      key: '1',
      value: false,
      text: 'No'
    },
    {
      key: '2',
      value: true,
      text: 'Yes'
    }
  ]

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleDoubleTax = (newData) => {
    setData({
      ...data,
      [newData[1].name]: newData[1].value
    })
  }

  const save = async () => {
    try {

      const { email, phone, website, mobile, address, postCode, doubleTax, ...rest } = data;

      for (const prop in rest) {
        if (!rest[prop]) return Toast('Missing Information', 'Please fill in required fields.', 'danger');
      }

      var emailRegularExpression = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (email && !emailRegularExpression.test(email.toLowerCase())) {
        return Toast('Email Validation', 'Please enter a valid email.', 'danger')
      }

      if (IS_UPDATING) {
        const { _id: id } = props.data;

        await dispatch(vendorsActions.updateVendor({ id, ...data }));
        sidePanelContext.hide();
        Toast('Update Vendor', `Vendor ${data.name} updated successfully`, 'success');

        await dispatch(vendorsActions.getVendors(meta));
        gridApi.redrawRows();
      } else {
        await dispatch(vendorsActions.createVendor(data));
        Toast('Create Vendor', `Vendor ${data.name} created successfully`, 'success');

        sidePanelContext.hide();
        dispatch(vendorsActions.getVendors(meta));
      }
    } catch (err) {
      let message, title;

      message = IS_UPDATING ? 'Vendor could not be updated. Please retry!' : 'Vendor could not be created successfully. Please retry!';
      if (err.response && err.response.data && err.response.data.reason) {
        message = err.response.data.reason
      }

      title = IS_UPDATING ? 'Update Vendor' : 'Create Vendor';
      Toast(title, message, 'danger');
    }
  }

  return (
    <AddVendorForm data={{
      handleInputChange,
      handleDoubleTax,
      sidePanelContext,
      save,
      data,
      IS_UPDATING,
      isUpdating,
      doubleTaxOptions
    }} />
  )
}

const mapStateToProps = state => ({
  isUpdating: state.vendors.isUpdating
});

export default connect(mapStateToProps)(AddVendorFormContainer);
