export const lineItemTotal = (lineItem) => {
  let total = 0.0;
  lineItem && lineItem.qty && lineItem.qty > 0 && lineItem.unitCost && lineItem.unitCost > 0 && (
    total = parseInt(lineItem.qty) * parseFloat(lineItem.unitCost)
  )

  return total.toFixed(2);
}

export const stringifyAddress = (address) => {
  const { street1 = '', street2 = '', city = '', state = '', zipCode = '', country = '' } = address || {};

  return `${street1} ${street2} ${city} ${state} ${zipCode} ${country}`;
}

export const stringifyClientName = (client) => {
  const { title = '', firstName = '', lastName = '' } = client || {};

  return `${title} ${firstName} ${lastName}`;
}

export const stringifyPhone = client => {
  const { mobile = [], homePhone = [], workPhone = [] } = client || {};

  return `${mobile[0] || homePhone[0] || workPhone[0] || ''}`;
}

export const processQuoteDetails = quote => {
  const { lineItems, tax, discount } = quote || {};
  let subTotal = 0.0,
    taxAmount = 0.0,
    taxSign = '',
    discountAmount = 0.0,
    discountSign = '',
    gTotal = 0.0,
    amountDue = 0.0,
    depositAmount = 0.0;

  if (quote && lineItems && lineItems.length > 0) {
    subTotal = lineItems.reduce((sum, lineItem) => {
      sum += parseInt(lineItem.qty) * parseFloat(lineItem.unitCost);
      return sum;
    }, 0);

    if (tax && tax.unit === 'PERCENTAGE' && tax.value) {
      taxAmount = subTotal * parseFloat(tax.value) / 100;
      taxSign = '%';
    }

    if (discount && discount.type === 'FLAT' && discount.value) {
      discountAmount = parseFloat(discount.value);
      discountSign = '$';
    } else if (discount && discount.type === 'PERCENTAGE' && discount.value) {
      discountAmount = subTotal * parseFloat(discount.value) / 100;
      discountSign = '%';
    }

    if (quote.deposit) {
      depositAmount = parseFloat(quote.deposit);
    }
  }

  subTotal = parseFloat(subTotal);
  taxAmount = parseFloat(taxAmount);
  discountAmount = parseFloat(discountAmount);
  depositAmount = parseFloat(depositAmount);
  gTotal = subTotal + taxAmount - discountAmount;

  amountDue = (gTotal - depositAmount).toFixed(2);
  gTotal = gTotal.toFixed(2);

  return {
    subTotal: subTotal.toFixed(2),
    taxAmount: taxAmount.toFixed(2),
    discountAmount: discountAmount.toFixed(2),
    gTotal,
    taxSign,
    discountSign,
    amountDue,
    depositAmount: depositAmount.toFixed(2)
  }
}
