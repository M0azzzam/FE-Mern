import React from 'react'
import { Segment, Grid, Container, Button, Icon, Form, Input, Sticky } from 'semantic-ui-react';
import { SketchPicker } from 'react-color';

const AddColorForm = props => {
  const {
    handleInputChange,
    handleColorPicker,
    sidePanelContext,
    data,
    save,
    IS_UPDATING,
    colorsUpdating
  } = props.data || {};

  return (
    <Container fluid style={{ height: '100vh', overflow: 'auto', padding: 0 }}>
      <Sticky>
        <Segment color='blue' raised className='radiusless borderless'>
          <Grid>
            <Grid.Row className='paddingless marginless'>
              <Grid.Column width={16} className='paddingless'>
                <Container style={{ lineHeight: '36px', width: '100%' }}>{IS_UPDATING ? 'Update Color' : 'Add A New Color'}</Container>
                <div className='sidebar-action-buttons'>
                  <Button positive className='radiusless' onClick={save} ><Icon name='save' /> Save</Button>
                  <Button negative className='radiusless marginless' onClick={() => sidePanelContext.hide()}><Icon name='cancel' /> Close</Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Sticky>
      <Segment loading={colorsUpdating} basic className='marginless radiusless borderless'>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Color'
              name='name'
              value={data.name}
              onChange={handleInputChange}
              required
            />
            <Form.Field
              control={Input}
              label='Color Code'
              name='colorCode'
              value={data.colorCode}
              readOnly
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Field
              width={8}
            >
              <SketchPicker onChange={(color, event) => handleColorPicker(color)} color={data.colorCode} />
            </Form.Field>
          </Form.Group>
        </Form>
      </Segment>
    </Container>
  )
}

export default AddColorForm;
