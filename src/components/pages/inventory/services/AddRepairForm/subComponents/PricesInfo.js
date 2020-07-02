import React from 'react';
import { Form, Input, Select, Checkbox } from 'semantic-ui-react';

const options = [
  {
    value: 'Shmuck',
    text: 'Shmuck'
  },
  {
    value: 'Garbage',
    text: 'Garbage'
  }
];

const PricesInfo = (props) => {
  const { handleCommission, commission } = props.data || {};

  return (
    <>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-retail-price'
            control={Input}
            label='Retail Price'
            defaultValue={0}
            name='retailPrice'
          />
          <Form.Field
            control={Select}
            options={options}
            label={{ children: 'First Tax Class', htmlFor: 'form-select-control-firstTaxClass' }}
            placeholder='Select Tax Class'
            search
            searchInput={{ id: 'form-select-control-firstTaxClass' }}
            name='firstTaxClass'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-sale-price'
            control={Input}
            label='Sale Price'
            defaultValue={0}
            name='salePrice'
          />
          <Form.Field
            control={Select}
            options={options}
            label={{ children: 'Second Tax Class', htmlFor: 'form-select-control-secondTaxClass' }}
            placeholder='Select Tax Class'
            search
            searchInput={{ id: 'form-select-control-secondTaxClass' }}
            name='secondTaxClass'
          />
        </Form.Group>
        <Form.Group width={8}>
          <Form.Field>
            <label>Commission</label>
          </Form.Field>
          <Form.Field style={{ margin: 2 }}>
            <Checkbox onClick={handleCommission} />
          </Form.Field>
        </Form.Group>
        {commission && (
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-percentage'
              control={Input}
              label='Percentage (%)'
              defaultValue={0}
            />
            <Form.Field
              id='form-input-control-amount'
              control={Input}
              label='Amount (PKR)'
              defaultValue={0}
            />
          </Form.Group>
        )}
      </Form>
    </>
  )
}

export default PricesInfo;
