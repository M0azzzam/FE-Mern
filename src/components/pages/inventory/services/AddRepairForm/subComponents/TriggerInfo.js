import React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';

const TriggerInfo = () => {

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Field width={2}>
            <label>Show on POS</label>
          </Form.Field>
          <Form.Field style={{ margin: 2 }}>
            <Checkbox />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field width={2}>
            <label>Show on Widget</label>
          </Form.Field>
          <Form.Field style={{ margin: 2 }}>
            <Checkbox />
          </Form.Field>
        </Form.Group>
      </Form>
    </>
  )
}

export default TriggerInfo;
