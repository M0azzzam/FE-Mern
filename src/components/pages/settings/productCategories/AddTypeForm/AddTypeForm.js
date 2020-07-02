import React from 'react';
import { Segment, Grid, Container, Button, Icon, Form, Input, Select, Checkbox } from 'semantic-ui-react';

const AddTypeForm = props => {
  const {
    handleInputChange,
    handleTriggers,
    handleSelectGroups,
    sidePanelContext,
    valuationMethod,
    save,
    IS_UPDATING,
    isUpdating,
    data
  } = props.data || {};

  return (
    <Container fluid style={{ height: '100vh', overflow: 'auto', padding: 0 }}>
      <Segment color='blue' raised className='radiusless borderless'>
        <Grid>
          <Grid.Row className='paddingless marginless'>
            <Grid.Column width={16} className='paddingless'>
              <Container style={{ lineHeight: '36px', width: '100%' }}>{IS_UPDATING ? 'Update Type' : 'Add Type'}</Container>
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
          <Form.Group widths={(IS_UPDATING === true) ? 'equal' : null}>
            <Form.Field
              control={Input}
              label='Type'
              name='name'
              value={data.name}
              width={(IS_UPDATING === false) ? 8 : null}
              onChange={handleInputChange}
              required
            />
            {(IS_UPDATING) && (
              <Form.Field
                control={Select}
                options={valuationMethod}
                label={{ children: 'Inventory Valuation Method', htmlFor: 'form-select-control-valuationMethod' }}
                placeholder='Select Valuation Method'
                search
                searchInput={{ id: 'form-select-control-valuationMethod' }}
                value={data.valuationMethod}
                name='valuationMethod'
                onChange={(...params) => handleSelectGroups(params)}
              />
            )}
          </Form.Group>
          {(IS_UPDATING) && (
            <>
              <Form.Group>
                <Form.Field width={4}>
                  <label>Show on POS</label>
                </Form.Field>
                <Form.Field style={{ margin: 2 }}>
                  <Checkbox name='onPOS' checked={data.triggers.onPOS} onChange={(event, data) => handleTriggers(data)} />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field width={4}>
                  <label>Is Part</label>
                </Form.Field>
                <Form.Field style={{ margin: 2 }}>
                  <Checkbox name='isPart' checked={data.triggers.isPart} onChange={(event, data) => handleTriggers(data)} />
                </Form.Field>
              </Form.Group>
            </>
          )}
        </Form>
      </Segment>
    </Container>
  )
}
export default AddTypeForm;
