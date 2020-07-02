import React from 'react';
import { Form, Input, Select } from 'semantic-ui-react';
import DropzoneComponent from 'react-dropzone-component';

const options = [
  {
    value: 'Shmuck',
    text: 'Shumck'
  },
  {
    value: 'Garbage',
    text: 'Garbage'
  }
]

const ProductInfo = (props) => {

  const { componentConfig, eventHandlers, djsConfig } = props.data || {};

  return (
    <Form>
      <Form.Group>
        <Form.Field
          control={Select}
          options={options}
          label={{ children: 'Category', htmlFor: 'form-select-control-category' }}
          placeholder='Select Category'
          search
          searchInput={{ id: 'form-select-control-category' }}
          name='category'
          width={8}
        />
        <Form.Field width={2}>
          <label>Warranty</label>
          <input name='warranty' />
        </Form.Field>
        <Form.Field width={6}>
          <Form.Select fluid label='Duration' placeholder='No Warranty' options={options} name='warrantyOptions' />
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          control={Select}
          options={options}
          label={{ children: 'Manufacture', htmlFor: 'form-select-control-manufacture' }}
          placeholder='Select Manufacture'
          search
          searchInput={{ id: 'form-select-control-manufacture' }}
          name='manufacture'
        />
        <Form.Field
          control={Select}
          options={options}
          label={{ children: 'Device/Model', htmlFor: 'form-select-control-device-model' }}
          placeholder='Select Device'
          search
          searchInput={{ id: 'form-select-control-device-model' }}
          name='deviceModel'
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field
          id='form-input-control-average-job-time'
          control={Input}
          label='Average Job Time (Minutes)'
          defaultValue={0}
          name='averageJobTime'
        />
        <Form.Field
          id='form-input-control-problem'
          control={Input}
          label='Problem'
          required
          name='problem'
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.TextArea label='Description' />

        <Form.Field
          control={Select}
          options={options}
          label={{ children: 'Create Bundle', htmlFor: 'form-select-control-create-bundle' }}
          placeholder='Select Some Options'
          search
          searchInput={{ id: 'form-select-control-create-bundle' }}
          name='deviceModel'
          multiple
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field>
          <label>Upload Picture (2MB)</label>
          <Form.Field>
            <DropzoneComponent config={componentConfig}
              eventHandlers={eventHandlers}
              djsConfig={djsConfig}
            />
          </Form.Field>
        </Form.Field>
      </Form.Group>
    </Form>
  )
}

export default ProductInfo;
