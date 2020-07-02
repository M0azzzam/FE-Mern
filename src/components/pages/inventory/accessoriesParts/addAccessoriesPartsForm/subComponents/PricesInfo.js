import React, { useState } from 'react';
import { Form, Icon, Checkbox, Select } from 'semantic-ui-react';
import Heading from '../../../../../extension/Heading';

const valuationMethodOptions = [
  {
    value: 'WAC',
    text: 'WAC'
  },
  {
    value: 'FIFO',
    text: 'FIFO'
  },
  {
    value: 'LIFO',
    text: 'LIFO'
  }
];

const taxClassOptions = [
  {
    value: 'GST',
    text: 'GST'
  },
  {
    value: 'GST2',
    text: 'GST2'
  }
];

const PricesInfo = () => {

  const [commission, setCommission] = useState(false);

  const handleCommission = () => {
    setCommission(!commission);
  }

  return (
    <Form>
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Retail Price</label>
          <input name='retailPrice' />
        </Form.Field>
        <Form.Field>
          <Form.Field
            control={Select}
            options={valuationMethodOptions}
            label={{ children: 'Inventory Valuation Method', htmlFor: 'form-select-control-valuationMethod' }}
            search
            searchInput={{ id: 'form-select-control-valuationMethod' }}
            name='valuationMethod'
          />
          <Heading as='h6' style={{ marginTop: 4 }}>
            <Icon disabled circular color='teal' name='info' size='small' /> On hand stock must be zero to change the inventory valuation method.
          </Heading>
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Cost Price</label>
          <input name='costPrice' />
        </Form.Field>
        <Form.Field
          control={Select}
          options={taxClassOptions}
          label={{ children: 'First Tax Class', htmlFor: 'form-select-control-firstTaxClass' }}
          search
          searchInput={{ id: 'form-select-control-firstTaxClass' }}
          name='firstTaxClass'
        />
      </Form.Group>
      <Form.Group>
        <Form.Field
          control={Select}
          options={taxClassOptions}
          label={{ children: 'Second Tax Class', htmlFor: 'form-select-control-secondTaxClass' }}
          search
          searchInput={{ id: 'form-select-control-secondTaxClass' }}
          name='secondTaxClass'
          width={8}
        />
      </Form.Group>
      <Form.Group>
        <Form.Field label='Commission' />
        <Form.Field style={{ margin: 2 }}>
          <Checkbox onClick={handleCommission} />
        </Form.Field>
      </Form.Group>
      {commission && (
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Percentage (%)</label>
            <input name='percentage'></input>
          </Form.Field>
          <Form.Field>
            <label>Amount (PKR)</label>
            <input name='amount'></input>
          </Form.Field>
        </Form.Group>
      )}
    </Form>
  )
}

export default PricesInfo;
