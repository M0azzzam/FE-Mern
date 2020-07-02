import React from 'react';
import {
  Segment,
  Breadcrumb,
  Button,
  Icon,
  Sticky,
  Table,
  Grid,
  Popup,
  Label
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ManageTaxes = props => {

  const {
    handleAddTax,
    handleUpdateTax,
    handleDeleteTax,
    taxes,
    isLoading
  } = props.data || {};

  return (
    <div>
      <Sticky>
        <Segment basic className='customPrimaryBG'>
          <Breadcrumb>
            <Breadcrumb.Section as={Link} to='/'>Home</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section as={Link} to='/settings/store/general_settings'>Settings</Breadcrumb.Section>
            <Breadcrumb.Divider>/</Breadcrumb.Divider>
            <Breadcrumb.Section active>Taxes</Breadcrumb.Section>
          </Breadcrumb>
        </Segment>
      </Sticky>
      <Segment loading={isLoading} basic>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}></div>
          <div>
            <Button positive onClick={handleAddTax}>
              <Icon name='add circle' />
              Add Tax
            </Button>
          </div>
        </div>
        <Segment basic attached className='borderless'>
          <Grid columns={1}>
            <Grid.Column>
              <Table striped compact className='c-table'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      Tax Class
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Percentage
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Status
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                      Actions
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {taxes.map(tax => (
                    <Table.Row key={tax._id}>
                      <Table.Cell>{tax.name} {tax.default && <Label color='blue' size='mini'>DEFAULT</Label>}</Table.Cell>
                      <Table.Cell>{tax.value}%</Table.Cell>
                      <Table.Cell>{tax.status ? <Icon name='check' color='green' /> : <Icon name='close' color='red' />}</Table.Cell>
                      <Table.Cell collapsing>
                        <Button icon='edit' compact size='mini' primary onClick={() => handleUpdateTax(tax)} />

                        <Popup
                          trigger={
                            <Button size='mini' compact icon='trash' name='trash' negative></Button>
                          }
                          content={<Button onClick={() => handleDeleteTax(tax)} negative compact content='Confirm delete' />}
                          on='click'
                          position='bottom right'
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid>
        </Segment>
      </Segment>
    </div>
  )
}

export default ManageTaxes;
