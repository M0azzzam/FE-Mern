import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AddClientForm from './AddClientForm';
import SidePanelContext from '../../../extension/SidePanelContext';
import { clientActions } from '../../../../store/actions/settings/clients';
import { taxActions } from '../../../../store/actions/settings/taxes';
import Toast from '../../../extension/Toast';
import { verfiyPhoneNumber } from '../../../../services/numverify';

const AddClientFormContainer = props => {

  const getPhonesArray = (phoneType, selectedOption) => {
    const phonesArray = phoneType.map((phone) => {
      return {
        selectedOption,
        phone
      }
    });
    return phonesArray;
  }

  const preparePhonesList = () => {
    let homePhoneArr = getPhonesArray(rest.homePhone, 'Home');
    let workPhoneArr = getPhonesArray(rest.workPhone, 'Work');
    let mobileArr = getPhonesArray(rest.mobile, 'Mobile');
    return [...homePhoneArr, ...workPhoneArr, ...mobileArr];
  }

  const sidePanelContext = useContext(SidePanelContext);
  const { dispatch, isUpdating, taxes, taxLoading } = props;
  const { meta, IS_UPDATING, successCallback, failureCallback, cancelCallback, ...rest } = props.data || {};
  const [phone] = useState({ selectedOption: 'Mobile', phone: '' });
  const [phonesList, setPhonesList] = useState(
    IS_UPDATING ? preparePhonesList() : [{ ...phone }]
  );
  const [propertyData, setPropertyData] = useState({
    street1: (IS_UPDATING && rest.propertyDetails && rest.propertyDetails.street1) ? rest.propertyDetails.street1 : '',
    street2: (IS_UPDATING && rest.propertyDetails && rest.propertyDetails.street2) ? rest.propertyDetails.street2 : '',
    city: (IS_UPDATING && rest.propertyDetails && rest.propertyDetails.city) ? rest.propertyDetails.city : '',
    state: (IS_UPDATING && rest.propertyDetails && rest.propertyDetails.state) ? rest.propertyDetails.state : '',
    zipCode: (IS_UPDATING && rest.propertyDetails && rest.propertyDetails.zipCode) ? rest.propertyDetails.zipCode : '',
    country: (IS_UPDATING && rest.propertyDetails && rest.propertyDetails.country) ? rest.propertyDetails.country : ''
  });
  const [data, setData] = useState({
    title: IS_UPDATING ? rest.title : 'Mr.',
    firstName: IS_UPDATING ? rest.firstName : '',
    lastName: IS_UPDATING ? rest.lastName : '',
    company: IS_UPDATING ? rest.company : '',
    email: IS_UPDATING ? rest.email : '',
    billingAndPropertyAddressSame: IS_UPDATING ? rest && rest.billingAndPropertyAddressSame : true,
    companyNameAsPrimary: IS_UPDATING ? rest && rest.companyNameAsPrimary : false,
    tax: IS_UPDATING ? rest && rest.tax && rest.tax._id : ''
  });
  const [billingData, setBillingData] = useState({
    street1: (IS_UPDATING && rest.billingAddress && rest.billingAddress.street1) ? rest.billingAddress.street1 : '',
    street2: (IS_UPDATING && rest.billingAddress && rest.billingAddress.street2) ? rest.billingAddress.street2 : '',
    city: (IS_UPDATING && rest.billingAddress && rest.billingAddress.city) ? rest.billingAddress.city : '',
    state: (IS_UPDATING && rest.billingAddress && rest.billingAddress.state) ? rest.billingAddress.state : '',
    zipCode: (IS_UPDATING && rest.billingAddress && rest.billingAddress.zipCode) ? rest.billingAddress.zipCode : '',
    country: (IS_UPDATING && rest.billingAddress && rest.billingAddress.country) ? rest.billingAddress.country : ''
  });
  const [errors, setErrors] = useState({
    numbers: {}
  });
  const [taxOptions, setTaxOptions] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  let phoneObj = {
    homePhone: [],
    workPhone: [],
    mobile: []
  };

  useEffect(() => {
    dispatch(taxActions.getTaxes({ limit: 0 }));
  }, [])

  useEffect(() => {
    if (taxes) {
      const options = taxes.map((tax) => {
        if (tax.default) {
          setData({
            ...data,
            tax: tax._id
          })
        }
        return {
          value: tax._id,
          text: tax.name + ' ' + tax.value + '%',
          key: tax._id
        }
      });
      setTaxOptions(options);
    }
  }, [taxes]);

  const handleBillingAddress = (newData) => {
    setData({
      ...data,
      billingAndPropertyAddressSame: newData.checked
    });
  }

  const handleCompanyName = (newData) => {
    setData({
      ...data,
      companyNameAsPrimary: newData.checked
    });
  }

  const handleNumberVerification = async (e, index) => {
    const target = e.target;
    if (!target.value) return;

    const result = await verfiyPhoneNumber(target.value, 'PK');
    let errs = { ...errors };

    if (!result.data.valid) errs = { ...errors, numbers: { ...errors.numbers, [index]: true } }
    else delete errs.numbers[index];
    setErrors(errs);
  }

  const handleInputChange = (e, property = false) => {
    if (property) {
      setPropertyData({
        ...propertyData,
        [e.target.name]: e.target.value
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value
      });
    }
  }

  const handleBillingInput = (e) => {
    setBillingData({
      ...billingData,
      [e.target.name]: e.target.value
    });
  }

  const handlePhoneOption = (newData, index) => {
    const phones = [...phonesList];
    phones[index] = {
      ...phones[index],
      selectedOption: newData[1].value
    };
    setPhonesList(phones);
  }

  const handlePhoneInputChange = (e, index) => {
    const phones = [...phonesList];
    phones[index].phone = e.target.value;
    setPhonesList(phones);
  }

  const preparePhoneData = () => {
    phonesList.map(phones => {
      if (phones.selectedOption === 'Home') {
        phoneObj = {
          ...phoneObj,
          homePhone: [...phoneObj.homePhone, phones.phone]
        }
      } else if (phones.selectedOption === 'Work') {
        phoneObj = {
          ...phoneObj,
          workPhone: [...phoneObj.workPhone, phones.phone]
        }
      } else if (phones.selectedOption === 'Mobile') {
        phoneObj = {
          ...phoneObj,
          mobile: [...phoneObj.mobile, phones.phone]
        }
      }
    })
  }

  const handleSelectGroup = (newData, billing = false) => {
    if (newData[1].name === 'title' || newData[1].name === 'tax') {
      setData({
        ...data,
        [newData[1].name]: newData[1].value
      });
    } else if (newData[1].name === 'country') {
      setPropertyData({
        ...propertyData,
        [newData[1].name]: newData[1].value
      });
    }
    if (billing) {
      setBillingData({
        ...billingData,
        [newData[1].name]: newData[1].value
      });
    }
  }

  const validateRequiredFields = () => {
    const requiredFields = ['firstName', 'lastName'];
    const combinedData = { ...data };
    let errs = {};
    requiredFields.forEach(f => {
      if (!combinedData[f]) {
        errs = { ...errs, [f]: true }
      } else {
        delete errs[f];
      }
    })
    setValidationErrors(errs);
    return Boolean(Object.keys(errs).length);
  }

  const save = async () => {
    try {
      if (validateRequiredFields()) return;
      if (Boolean(Object.keys(errors.numbers).length)) return;
      preparePhoneData();

      if (IS_UPDATING) {
        const { _id: id } = rest;

        await dispatch(clientActions.updateClient({ id, ...data, propertyDetails: { ...propertyData }, billingAddress: { ...billingData }, ...phoneObj }));
        sidePanelContext.hide();
        Toast('Update Client', `Client ${data.firstName} updated successfully`, 'success');

        await dispatch(clientActions.getClients(meta));
        typeof successCallback === 'function' && successCallback();
      } else {
        await dispatch(clientActions.createClient({
          ...data,
          propertyDetails: {
            ...propertyData
          },
          billingAddress: {
            ...(data.billingAndPropertyAddressSame ? propertyData : billingData)
          },
          ...phoneObj
        }));
        Toast('Create Client', `Client ${data.firstName} created successfully`, 'success');

        sidePanelContext.hide();
        dispatch(clientActions.getClients(meta));
        typeof successCallback === 'function' && successCallback();
      }
    } catch (err) {
      let message, title;

      message = IS_UPDATING ? 'Client could not be updated. Please retry!' : 'Client could not be created successfully. Please retry!';
      if (err.response && err.response.data && err.response.data.reason) {
        message = err.response.data.reason
      }

      title = IS_UPDATING ? 'Update Client' : 'Create Client';
      Toast(title, message, 'danger');
      typeof failureCallback === 'function' && failureCallback();
    }
  }

  const handleAddAnotherPhone = () => {
    setPhonesList([...phonesList, { ...phone }]);
  }

  const handleRemovePhone = (index) => {
    const phonesAvailable = [...phonesList];
    phonesAvailable.splice(index, 1);
    setPhonesList(phonesAvailable);
  }

  const titleOptions = [
    {
      key: 'None',
      value: '',
      text: 'None'
    },
    {
      key: 'Mr.',
      value: 'Mr.',
      text: 'Mr.'
    },
    {
      key: 'Ms.',
      value: 'Ms.',
      text: 'Ms.'
    },
    {
      key: 'Mrs.',
      value: 'Mrs.',
      text: 'Mrs.'
    },
    {
      key: 'Miss.',
      value: 'Miss.',
      text: 'Miss.'
    },
    {
      key: 'Dr.',
      value: 'Dr.',
      text: 'Dr.'
    }
  ];

  const phoneOptions = [
    {
      key: 'Home',
      value: 'Home',
      text: 'Home'
    },
    {
      key: 'Work',
      value: 'Work',
      text: 'Work'
    },
    {
      key: 'Mobile',
      value: 'Mobile',
      text: 'Mobile'
    }
  ];

  return (
    <AddClientForm data={{
      sidePanelContext,
      handleBillingAddress,
      handleInputChange,
      phonesList,
      handleAddAnotherPhone,
      handleRemovePhone,
      handlePhoneOption,
      handlePhoneInputChange,
      handleSelectGroup,
      handleNumberVerification,
      handleCompanyName,
      handleBillingInput,
      titleOptions,
      phoneOptions,
      taxOptions,
      save,
      isUpdating,
      IS_UPDATING,
      data,
      propertyData,
      billingData,
      errors,
      validationErrors
    }} />
  )
}

const mapStateToProps = state => ({
  isUpdating: state.clients.isUpdating,
  taxes: state.taxes.data,
  taxLoading: state.taxes.isLoading
})

export default connect(mapStateToProps)(AddClientFormContainer);
