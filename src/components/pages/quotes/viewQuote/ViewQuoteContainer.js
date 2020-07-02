import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ViewQuote from './ViewQuote';
import { quoteActions } from '../../../../store/actions/settings/quotes';
import { processQuoteDetails } from '../../../../utils/quotes';
import upperFirst from 'lodash/upperFirst';

const ViewQuoteContainer = props => {

  const {
    match,
    quote,
    isLoading,
    dispatch,
    history
  } = props;

  const [showAccordian, setAccordian] = useState(false);
  const [subTotal, setSubTotal] = useState(0.0);
  const [grandTotal, setGrandTotal] = useState(0.0);
  const [taxTotal, setTax] = useState(0.0);
  const [discountTotal, setDiscount] = useState(0.0);
  const [amountDue, setAmountDue] = useState(0.0);
  const [depositsTotal, setDeposits] = useState(0.0);
  const [discountSign, setDiscountSign] = useState('');
  const [taxSign, setTaxSign] = useState('');

  useEffect(() => {
    if (match && match.params && match.params.id) {
      dispatch(quoteActions.getQuote({ id: match.params.id }));
    }
  }, []);

  useEffect(() => {
    const qDetails = processQuoteDetails(quote);
    if (qDetails) {
      setTax(qDetails.taxAmount);
      setDiscount(qDetails.discountAmount)
      setSubTotal(qDetails.subTotal);
      setGrandTotal(qDetails.gTotal);
      setDiscountSign(qDetails.discountSign);
      setTaxSign(qDetails.taxSign);
      setAmountDue(qDetails.amountDue);
      setDeposits(qDetails.depositAmount);
    }
  }, [quote]);

  const getTaxDetails = () => {
    if (quote.tax) {
      if (quote.tax.name && quote.tax.value && quote.tax.unit)
        return `${quote.tax.name} (${quote.tax.value}${quote.tax.unit === 'PERCENTAGE' ? '%' : '$'})`
    }
    return 'Tax';
  }

  const handleEditQuote = () => {
    if (quote && quote._id) {
      history.push(`/app/work/quotes/edit/${quote._id}`);
    }
  }

  const showStatusText = (status = '') => {
    return upperFirst(status.toUpperCase());
  }

  const statusColors = {
    draft: 'grey',
    awaiting: 'orange',
    approved: 'blue',
    converted: 'green',
    archived: 'red'
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
    <ViewQuote data={{
      djsConfig,
      componentConfig,
      eventHandlers,
      showAccordian,
      setAccordian,
      quote,
      isLoading,
      getTaxDetails,
      subTotal,
      grandTotal,
      taxTotal,
      discountTotal,
      depositsTotal,
      amountDue,
      discountSign,
      taxSign,
      handleEditQuote,
      showStatusText,
      statusColors
    }} />
  )
}

const mapStateToProps = state => ({
  quote: state.quotes.quote,
  isLoading: state.quotes.isLoading
})

export default connect(mapStateToProps)(ViewQuoteContainer);
