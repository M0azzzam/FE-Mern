import React, { useState, useContext, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AddQuoteForm from './AddQuoteForm';
import SidePanelContext from '../../../extension/SidePanelContext';
import AddClientFormContainer from '../../clients/addClientsForm';
import AddTaxFormContainer from '../../settings/taxes/addTaxForm';
import AddInventoryFormContainer from '../../settings/inventory/addInventoryForm';
import { inventoryActions } from '../../../../store/actions/settings/inventory';
import { taxActions } from '../../../../store/actions/settings/taxes';
import { quoteActions } from '../../../../store/actions/settings/quotes';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep'
import Toast from '../../../extension/Toast';
import { processQuoteDetails, stringifyClientName, stringifyAddress } from '../../../../utils/quotes';

const AddQuoteFormContainer = props => {

  const {
    IS_UPDATING,
    inventory,
    inventoryItem,
    inventoryLoading,
    taxes,
    taxesLoading,
    id,
    idLoading,
    quote,
    dispatch,
    history,
    match,
    location
  } = props;

  const { state: { selectedClient: sC, propertyDetails: pD } = {} } = location;

  const lineItemTemplate = { item: '', description: '', qty: '0', unitCost: '0' };
  const [lineItem, setLineItem] = useState(lineItemTemplate);
  const sidePanelContext = useContext(SidePanelContext);
  const [showAccordian, setAccordian] = useState(false);
  const [isQuoteNumEditing, setQuoteNumEditing] = useState(false);
  const [lineItems, setLineItems] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const [selectedClient, setClient] = useState({ ...sC });
  const [selectedTax, setSelectedTax] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discount, setDiscount] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const [tax, setTax] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [errors, setErrors] = useState(false);
  const [discountOptions] = useState([
    {
      key: '%',
      value: 'PERCENTAGE',
      text: '%'
    },
    {
      key: '$',
      value: 'FLAT',
      text: '$'
    }
  ]);
  const [data, setData] = useState({
    estimateId: '1',
    name: '',
    client: sC && sC._id,
    issueDate: new Date().toISOString(),
    discount: {
      type: 'PERCENTAGE',
      value: 0,
    },
    tax: '',
    clientMessage: '',
    staffMessage: '',
    poso: '',
    deposit: 0
  });
  const [estimateError, setEstimateError] = useState(false);
  const searchRef = useRef(null);
  const lineItemSearchRef = useRef(null);

  const fetchQuoteId = () => {
    dispatch(quoteActions.getQuoteId());
  }

  useEffect(() => {
    if (match && match.params && match.params.id) {
      dispatch(quoteActions.getQuote({ id: match.params.id }));
    }
    dispatch(inventoryActions.getInventory({ limit: 4 }));
    dispatch(taxActions.getTaxes({ limit: 0 }));

    if (!IS_UPDATING && sC && pD) {
      setClient({ ...sC });
      setPropertyData({ ...pD });
      setData({
        ...data,
        client: sC._id
      });
    } else if (!IS_UPDATING) {
      history.replace('/app/work/quotes');
    }

    if (!IS_UPDATING) {
      fetchQuoteId();
    }
  }, []);

  useEffect(() => {
    if (id) {
      setData({
        ...data,
        estimateId: id
      })
    }
  }, [idLoading]);

  const computeLineItems = (lItems) => {
    const _lineItems = lItems.map((lItem) => {
      return {
        item: lItem && lItem.item && lItem.item._id,
        name: lItem && lItem.item && lItem.item.name,
        description: lItem.description,
        qty: lItem.qty,
        unitCost: lItem.unitCost,
      }
    })
    setLineItems([..._lineItems]);
  }

  useEffect(() => {
    if (quote && IS_UPDATING) {
      setData({
        estimateId: quote.estimateId ? quote.estimateId : '1',
        name: quote.name ? quote.name : '',
        client: quote.client && quote.client._id ? quote.client._id : '',
        issueDate: quote.issueDate ? quote.issueDate : new Date().toISOString(),
        lineItems: quote.lineItems && quote.lineItems.length > 0 ? computeLineItems(quote.lineItems) : [{
          item: '',
          qty: '',
          unitCost: ''
        }],
        discount: {
          type: quote.discount && quote.discount.type ? quote.discount.type : 'PERCENTAGE',
          value: quote.discount && quote.discount.value ? quote.discount.value : 0,
        },
        tax: quote.tax && quote.tax._id ? quote.tax._id : '',
        clientMessage: quote.clientMessage ? quote.clientMessage : '',
        staffMessage: quote.staffMessage ? quote.staffMessage : '',
        poso: quote.poso ? quote.poso : '',
        deposit: quote.deposit ? quote.deposit : '',
      });
      quote.propertyAddress && setPropertyData({ ...quote.propertyAddress });
      quote.tax && quote.tax._id && setTax(true);
      quote.tax && quote.tax._id && setSelectedTax({ ...quote.tax });
      quote.discount && quote.discount.value && setDiscount(true);
      quote.deposit && setDeposit(true);
      quote.client && quote.client._id && setClient({ ...quote.client });
    }
  }, [quote]);

  useEffect(() => {
    const qDetails = processQuoteDetails({
      ...data,
      lineItems: [...lineItems],
      propertyAddress: {
        ...propertyData
      },
      tax: {
        ...selectedTax
      }
    });

    if (qDetails) {
      setSubTotal(qDetails.subTotal);
      setGrandTotal(qDetails.gTotal);
    }
  }, [lineItems, data.discount, data.tax]);

  useEffect(() => {
    const { inventoryStock: { unitCost = 0 } = {}, description, name = '', _id } = inventoryItem || {};
    setLineItem({
      name,
      item: _id,
      description,
      qty: 1,
      unitCost
    });
    lineItemSearchRef.current.setValue(name);
  }, [inventoryItem]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  }

  const handleEstimateChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleDepositChange = (e) => {
    let value = e.target.value;
    if (value)
      value = parseInt(value);
    setData({
      ...data,
      [e.target.name]: value
    })
  }

  const handleDateInput = newData => {
    let value = new Date(newData[1].value).toISOString();
    setData({
      ...data,
      [newData[1].name]: value
    });
  }

  const handleDiscountType = newData => {
    setData({
      ...data,
      discount: {
        ...data.discount,
        [newData[1].name]: newData[1].value
      }
    });
  }

  const handleDiscountInput = (e) => {
    let value = e.target.value;
    if (value && data.discount.type === 'FLAT')
      value = parseFloat(value);
    setData({
      ...data,
      discount: {
        ...data.discount,
        [e.target.name]: value
      }
    });
  }

  const handleShowTax = (newdata) => {
    setTax(newdata);
    if (newdata === false) {
      setData({
        ...data,
        tax: ''
      });
      setSelectedTax({});
    }
  }

  const handleTax = (newData) => {
    setData({
      ...data,
      tax: newData.value
    });

    const taxSelected = find(taxes, function (tax) { return tax._id === newData.value }) || {};
    setSelectedTax(taxSelected);
    handleShowTax(true);
  }

  const handleCreateTaxClass = () => {
    sidePanelContext.setData({ Component: AddTaxFormContainer, data: {}, sidebarConfig: { width: 500 } });
  }

  const removeExtraFields = () => {
    let lineItemsAvailable = cloneDeep(lineItems);
    lineItemsAvailable = lineItemsAvailable.map(lineItem => {
      const { total, name, ...rest } = lineItem;
      return rest;
    });
    return lineItemsAvailable;
  }

  const removeEmptyFields = (data) => {
    let _data = cloneDeep(data);
    !_data.tax && delete _data.tax;

    return _data;
  }

  const validateRequiredFields = () => {
    const requiredFields = ['item'];
    const combinedData = [...lineItems];
    let errs = {};

    combinedData.forEach((cd, index) => {
      requiredFields.forEach((f) => {
        if (!cd[f]) {
          errs = { ...errs, [`${f}${index}`]: true }
        } else {
          delete errs[`${f}${index}`];
        }
      })
    })

    setValidationErrors(errs);
    return Boolean(Object.keys(errs).length);
  }

  const save = async (forceUpdate = false) => {

    const _lineItems = removeExtraFields();
    const _data = removeEmptyFields(data);

    try {
      if (validateRequiredFields() || lineItems.length === 0) {
        setErrors(true);
        return Toast('Line Item', 'Line Items must not be empty.', 'danger', 3000);
      };

      if (IS_UPDATING) {
        const { params: { id } } = match;
        await dispatch(quoteActions.updateQuote({
          id,
          ..._data,
          lineItems: [..._lineItems],
          propertyAddress: {
            ...propertyData
          },
          forceUpdate
        }));
        Toast('Update Quote', `Quote updated successfully`, 'success');
      } else {
        await dispatch(quoteActions.createQuote({
          ..._data,
          lineItems: [..._lineItems],
          propertyAddress: {
            ...propertyData
          },
          forceUpdate
        }));
        Toast('Create Quote', `Quote ${_data.estimateId} created successfully`, 'success');
      }
    } catch (err) {
      let message, title;

      message = IS_UPDATING ? 'Quote could not be updated. Please retry!' : 'Quote could not be created successfully. Please retry!';
      if (err.response && err.response.data && err.response.data.reason) {
        message = err.response.data.reason
      }

      if (err.response && err.response.data && err.response.data.reason === 'RESOURCE_ALREADY_EXISTS') {
        setEstimateError(true);
      }

      title = IS_UPDATING ? 'Update Quote' : 'Create Quote';
      Toast(title, message, 'danger');
    }
  }

  const handleAddLineItem = () => {
    if (lineItem.item) {
      setLineItems([...lineItems, { ...lineItem }]);
      setLineItem(lineItemTemplate);
      lineItemSearchRef.current.setValue('');
      setErrors(false);
    } else {
      Toast('Line Item', 'Please select a product/service.', 'info', 3000);
    }
  }

  const handleDeleteLineItem = (index) => {
    const lineItemsAvailable = [...lineItems];
    lineItemsAvailable.splice(index, 1);
    setLineItems(lineItemsAvailable);
  }

  const handleLineItemOption = (event, newData) => {
    const selectedInventory = newData.result;
    const { inventoryStock: { unitCost = null } = {}, description } = selectedInventory || {};
    setLineItem({
      name: selectedInventory.name,
      item: selectedInventory._id,
      description,
      qty: 1,
      unitCost: unitCost || 0,
    });
    lineItemSearchRef.current.setValue(selectedInventory.name);
  }

  const handleLineItemInputChange = (e, index) => {
    setLineItem({ ...lineItem, [e.target.name]: e.target.value })
  }

  const handleLineItemsInputChange = (e, index) => {
    const lItems = [...lineItems];

    lItems[index] = {
      ...lItems[index],
      [e.target.name]: e.target.value,
    }
    setLineItems(lItems);
  }

  const handleAddCustomer = () => {
    sidePanelContext.setData({ Component: AddClientFormContainer, data: {}, sidebarConfig: { width: 700 } });
  }

  const handleAddInventory = () => {
    sidePanelContext.setData({ Component: AddInventoryFormContainer, data: {}, sidebarConfig: { width: 500 } });
  }

  const addressesMatch = (address1, address2) => {
    const a1 = stringifyAddress(address1);
    const a2 = stringifyAddress(address2);
    return a1 === a2;
  }

  const getContactDetails = (propertyData) => {
    if (propertyData) {
      return `${stringifyAddress(propertyData)}`;
    }
  }

  const getTaxDetails = () => {
    return `${selectedTax.name} (${selectedTax.value}${selectedTax.unit === 'PERCENTAGE' ? '%' : '$'})`
  }

  const formatClientName = () => {
    return `${stringifyClientName(selectedClient)}`;
  }

  const handleSearchInventory = async (e, data) => {
    dispatch(inventoryActions.searchInventory({ text: data.value }));
  }

  const handleAddDiscount = (newData) => {
    setDiscount(newData);
    if (newData === false) {
      setData({
        ...data,
        discount: {
          type: 'PERCENTAGE',
          value: 0
        }
      });
    }
  }

  const handleAddDeposit = (newData) => {
    setDeposit(newData);
    if (newData === false) {
      setData({
        ...data,
        deposit: ''
      });
    }
  }

  const handleFetchNewEstimate = () => {
    fetchQuoteId();
    setEstimateError(false);
  }

  const handleContinue = () => {
    save(true);
  }

  var Dropzone = null;

  const djsConfig = {
    addRemoveLinks: true,
    acceptedFiles: "image/jpeg,image/png,image/gif"
  };

  const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
  };

  const callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];
  const callback = () => console.log('Hello!');
  const success = file => console.log('uploaded', file);
  const removedfile = file => console.log('removing...', file);

  const eventHandlers = {
    init: dz => { return Dropzone = dz },
    drop: callbackArray,
    addedfile: callback,
    success: success,
    removedfile: removedfile
  };

  return (
    <AddQuoteForm data={{
      djsConfig,
      componentConfig,
      eventHandlers,
      showAccordian,
      setAccordian,
      isQuoteNumEditing,
      setQuoteNumEditing,
      handleAddLineItem,
      handleDeleteLineItem,
      handleAddCustomer,
      handleInputChange,
      handleLineItemInputChange,
      handleLineItemOption,
      handleDateInput,
      handleAddDiscount,
      handleDiscountType,
      handleDiscountInput,
      handleAddDeposit,
      handleTax,
      handleCreateTaxClass,
      handleShowTax,
      handleEstimateChange,
      handleDepositChange,
      handleSearchInventory,
      handleFetchNewEstimate,
      handleContinue,
      handleAddInventory,
      save,
      lineItem,
      lineItems,
      discountOptions,
      taxes,
      data,
      propertyData,
      getContactDetails,
      getTaxDetails,
      selectedClient,
      subTotal,
      grandTotal,
      discount,
      deposit,
      tax,
      quote,
      IS_UPDATING,
      searchRef,
      lineItemSearchRef,
      inventory,
      inventoryLoading,
      addressesMatch,
      handleLineItemsInputChange,
      formatClientName,
      estimateError,
      validationErrors,
      errors,
    }} />
  )
}

AddQuoteFormContainer.propTypes = {
  IS_UPDATING: PropTypes.string,
  quotes: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  inventory: state.inventory.data,
  inventoryLoading: state.inventory.isLoading,
  inventoryItem: state.inventory.inventoryItem,
  taxes: state.taxes.data,
  taxesLoading: state.taxes.isLoading,
  quote: state.quotes.quote,
  id: state.quotes.quoteId.id,
  idLoading: state.quotes.quoteId.isLoading,
});

export default withRouter(connect(mapStateToProps)(AddQuoteFormContainer));
