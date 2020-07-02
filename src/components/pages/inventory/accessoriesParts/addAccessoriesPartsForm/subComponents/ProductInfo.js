import React from 'react';
import { Divider, Form, Select, Checkbox } from 'semantic-ui-react';
import DropzoneComponent from 'react-dropzone-component';

const categoryOptions = [
  {
    value: 'Service Item',
    text: 'Service Item'
  },
  {
    value: 'Inventory Item',
    text: 'Inventory Item'
  },
  {
    value: 'Special Order',
    text: 'Special Order'
  },
  {
    value: 'Serialized Item',
    text: 'Serialized Item'
  },
  {
    value: 'Miscellaneous Item',
    text: 'Miscellaneous Item'
  },
  {
    value: 'Network Unlock',
    text: 'Network Unlock'
  },
];

const conditionOptions = [{
  value: 'Accessories',
  text: 'Accessories'
}, {
  value: 'Battery',
  text: 'Battery'
}];

const warrantyOptions = [{
  value: 'no warranty',
  text: 'no warranty'
}, {
  value: 'days',
  text: 'days'
}, {
  value: 'months',
  text: 'months'
}];

const ProductInfo = () => {
  var dropzone = null;

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
    init: dz => { return (dropzone = dz, console.log(dz)) },
    drop: callbackArray,
    addedfile: callback,
    success: success,
    removedfile: removedfile
  };

  return (
    <>
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            control={Select}
            options={categoryOptions}
            label={{ children: 'Product Type', htmlFor: 'form-select-control-product-type' }}
            placeholder='Select Product Type'
            search
            searchInput={{ id: 'form-select-control-product-type' }}
            name='productType'
          />
          <Form.Field
            control={Select}
            options={categoryOptions}
            label={{ children: 'Category', htmlFor: 'form-select-control-category' }}
            placeholder='Select Type'
            search
            searchInput={{ id: 'form-select-control-category' }}
            name='category'
          />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>Item Name</label>
            <input name='itemName' />
          </Form.Field>
          <Form.Field
            control={Select}
            options={conditionOptions}
            label={{ children: 'Condition', htmlFor: 'form-select-control-condition' }}
            placeholder='Select Condition'
            search
            searchInput={{ id: 'form-select-control-condition' }}
            name='condition'
          />
        </Form.Group>
        <Form.Group>
          <Form.Field
            control={Select}
            options={conditionOptions}
            label={{ children: 'Manufacturer', htmlFor: 'form-select-control-manufacturer' }}
            placeholder='Select Manufacturer'
            search
            searchInput={{ id: 'form-select-control-manufacturer' }}
            name='manufacturer'
            width={8}
          />
          <Form.Field width={2}>
            <label>Warranty</label>
            <input name='warranty' />
          </Form.Field>
          <Form.Field width={6}>
            <Form.Select fluid label='Duration' placeholder='No Warranty' options={warrantyOptions} name='warrantyOptions' />
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            control={Select}
            options={categoryOptions}
            label={{ children: 'Device', htmlFor: 'form-select-control-device' }}
            placeholder='Select Some Options'
            search
            searchInput={{ id: 'form-select-control-device' }}
            name='device'
            multiple
          />
          <Form.Field>
            <label>IMEI</label>
            <input name='imei' />
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>SKU</label>
            <input name='sku' />
          </Form.Field>
          <Form.Field>
            <label>UPC Code</label>
            <input name="upc" />
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <Form.TextArea label='Description' />
          </Form.Field>
          <Form.Field>
            <label>Upload Picture (2MB)</label>
            <DropzoneComponent config={componentConfig}
              eventHandlers={eventHandlers}
              djsConfig={djsConfig}
            />
          </Form.Field>
        </Form.Group>
        <Divider />
        <Form.Group>
          <Form.Field>
            <label>Show on POS</label>
          </Form.Field>
          <Form.Field style={{ margin: 2 }}>
            <Checkbox />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field label='Manage Serialized inventory for this item?'/>
          <Form.Field label='Yes' control='input' type='radio' name='htmlRadios' />
          <Form.Field label='No' control='input' type='radio' name='htmlRadios' />
        </Form.Group>
      </Form>
    </>
  );
}

export default ProductInfo;
