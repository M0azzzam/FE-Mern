import React from 'react';
import { connect } from 'react-redux';
import { Segment, Grid, Button, List, Icon, Table, Dropdown } from "semantic-ui-react";
import TextIcon from '../extension/TextIcon';

const Home = props => (
  <div style={{ padding: 16 }}>
    <div style={{ display: 'flex' }}>
      <h1 style={{ fontWeight: 'bold', flex: 1 }}>TODAY'S ACTIVITIES</h1>
      <div>
        <Button positive>Add Client</Button>
        <Dropdown as={Button} basic icon='ellipsis horizontal'>
          <Dropdown.Menu direction='left' className='c-dropdown-items'>
            <Dropdown.Header>CREATE NEW...</Dropdown.Header>
            <Dropdown.Item>
              <TextIcon name='file' color='blue' >New Quote</TextIcon>
            </Dropdown.Item>
            <Dropdown.Item>
              <TextIcon name='file alternate' color='red' >New Invoice</TextIcon>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <TextIcon name='bullhorn' color='orange' >New Job</TextIcon>
            </Dropdown.Item>
            <Dropdown.Item>
              <TextIcon name='tasks' color='purple' >New Request</TextIcon>
            </Dropdown.Item>
            <Dropdown.Item>
              <TextIcon name='crosshairs' color='green' >Basic Task</TextIcon>
            </Dropdown.Item>
            <Dropdown.Item>
              <TextIcon name='calendar' color='pink' >Event</TextIcon>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
    <Grid columns={2}>
      <Grid.Column>
        <Segment className='c-segment paddingless'>
          <div className='c-segment-header'>
            <h3>Recommended Actions</h3>
          </div>
          <div className='c-segment-content'>
            <List divided verticalAlign='middle'>
              <List.Item as='a' className='c-list-item'>
                <List.Content floated='right'>
                  <Icon name='chevron right' />
                </List.Content>
                {/* <Image avatar src='/images/avatar/small/lena.png' /> */}
                <List.Content>Restock low-order products</List.Content>
              </List.Item>
              <List.Item as='a' className='c-list-item'>
                <List.Content floated='right'>
                  <Icon name='chevron right' />
                </List.Content>
                {/* <Image avatar src='/images/avatar/small/lindsay.png' /> */}
                <List.Content>Lock expenses for last work</List.Content>
              </List.Item>
            </List>
          </div>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment className='c-segment paddingless'>
          <div className='c-segment-header'>
            <h3>Assignments</h3>
          </div>
          <div className='c-segment-content'>
            <h4>You have nothing assigned to you today</h4>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
    <Grid columns={4}>
      <Grid.Column>
        <Segment className='c-segment paddingless c-dashboard-widget'>
          <div className='c-segment-header'>
            <h3>Outstanding Balance</h3>
          </div>
          <div className='c-segment-content'>
            <p style={{ color: 'grey' }}><i>3 clients owe you</i></p>
            <b style={{ fontSize: '25px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>$350.00</b>
            <Table verticalAlign='middle' striped compact basic='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Client</Table.HeaderCell>
                  <Table.HeaderCell>Balance</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>$100.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Lincoln</Table.Cell>
                  <Table.Cell>$120.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>$130.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Ali</Table.Cell>
                  <Table.Cell>$130.00</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Aden</Table.Cell>
                  <Table.Cell>$130.00</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button fluid primary>View Report</Button>
          </div>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment className='c-segment paddingless c-dashboard-widget'>
          <div className='c-segment-header'>
            <h3>Past Due Invoices</h3>
          </div>
          <div className='c-segment-content'>
            <p style={{ color: 'grey' }}><i>1 invoice ($100.00) sent but not yet due</i></p>
            <Button fluid primary>View All Invoices</Button>
          </div>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment className='c-segment paddingless c-dashboard-widget'>
          <div className='c-segment-header'>
            <h3>Upcoming Jobs</h3>
          </div>
          <div className='c-segment-content'>
            <p style={{ color: 'grey' }}><i>You have following upcoming tasks</i></p>
            <Table verticalAlign='middle' striped compact basic='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Client</Table.HeaderCell>
                  <Table.HeaderCell>When</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>Sept 8, 2019</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Lincoln</Table.Cell>
                  <Table.Cell>Sept 12, 2019</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>Oct 1, 2019</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>Sept 8, 2019</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Lincoln</Table.Cell>
                  <Table.Cell>Sept 12, 2019</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>Oct 1, 2019</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Button fluid primary>View All Jobs</Button>
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  </div>
);

export default connect()(Home);
