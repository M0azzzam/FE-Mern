import React, { useState } from 'react';
import { Divider, Form, Select } from 'semantic-ui-react';

const supplierVendorOptions = [
  {
    value: 'Tech Parts',
    text: 'Tech Parts'
  },
  {
    value: 'Tech World',
    text: 'Tech World'
  }
]
const physicalLocationOptions = [
  {
    value: 'Sydney',
    text: 'Sydney'
  },
  {
    value: 'Paris',
    text: 'Paris'
  }
]

const StockInfo = () => {

  const [inventoryLevel, setInventoryLevel] = useState(true);
  const [serializedInventory, setSerializeInventory] = useState(false);

  const handleInventoryLevel = (showInventory) => {
    if (showInventory) {
      setInventoryLevel(true);
    } else {
      setInventoryLevel(false);
    }
  }

  return (
    <Form>
      <Form.Group>
        <Form.Field label='Manage inventory Level for this item?' />
        <Form.Field label='Yes' control='input' type='radio' name='htmlRadios' defaultChecked={inventoryLevel} onClick={handleInventoryLevel.bind(null, true)} />
        <Form.Field label='No' control='input' type='radio' name='htmlRadios' defaultChecked={!inventoryLevel} onClick={handleInventoryLevel.bind(null, false)} />
      </Form.Group>
      <Form.Group widths='equal'>
        {inventoryLevel && (
          <Form.Field>
            <label>On Hand</label>
            <input name='onHand' defaultValue='0' />
          </Form.Field>
        )}
        <Form.Field
          control={Select}
          options={supplierVendorOptions}
          label={{ children: 'Supplier/Vendor', htmlFor: 'form-select-control-supplier/vendor' }}
          placeholder='Select Supplier'
          search
          searchInput={{ id: 'form-select-control-supplier/vendor' }}
          name='supplierVendor'
        />
      </Form.Group>
      <Form.Group widths='equal'>
        {inventoryLevel && (
          <Form.Field>
            <label>Stock Warning</label>
            <input name='stockWarning' defaultValue='0' />
          </Form.Field>
        )}
        <Form.Field
          control={Select}
          options={physicalLocationOptions}
          label={{ children: 'Physical Location', htmlFor: 'form-select-control-physicalLocations' }}
          placeholder='Select Physical Location'
          search
          searchInput={{ id: 'form-select-control-physicalLocations' }}
          name='physicalLocation'
        />
      </Form.Group>
      <Divider />
      <Form.Group>
        <Form.Field label='Manage Serialized inventory for this item?' />
        <Form.Field label='Yes' control='input' type='radio' name='htmlRadios' />
        <Form.Field label='No' control='input' type='radio' name='htmlRadios' defaultChecked />
      </Form.Group>
    </Form>
  )
}

export default StockInfo;
