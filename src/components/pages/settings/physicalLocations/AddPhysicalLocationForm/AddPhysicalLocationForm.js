import React from 'react';
import { Segment, Grid, Container, Button, Icon, Form, Input } from 'semantic-ui-react';

const AddPhysicalLocationForm = props => {

  const {
    handleInputChange,
    sidePanelContext,
    save,
    data,
    IS_UPDATING,
    isUpdating,
  } = props.data || {};

  return (
    <Container fluid style={{ height: '100vh', overflow: 'auto', padding: 0 }}>
      <Segment color='blue' raised className='radiusless borderless'>
        <Grid>
          <Grid.Row className='paddingless marginless'>
            <Grid.Column width={16} className='paddingless'>
              <Container style={{ lineHeight: '36px', width: '100%' }}>{IS_UPDATING ? 'Update Physical Location' : 'Add A New Physical Location'}</Container>
              <div className='sidebar-action-buttons'>
                <Button positive className='radiusless' onClick={save}><Icon name='save' /> Save</Button>
                <Button negative className='radiusless marginless' onClick={() => sidePanelContext.hide()}><Icon name='cancel' /> Close</Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment loading={isUpdating} basic className='marginless radiusless borderless'>
        <Form>
          <Form.Group>
            <Form.Field
              id='form-input-control-physical-location'
              control={Input}
              label='Physical Location'
              onChange={handleInputChange}
              name='name'
              value={data.name}
              width={8}
              required
            />
          </Form.Group>
        </Form>
      </Segment>
    </Container>
  )
}

export default AddPhysicalLocationForm;
