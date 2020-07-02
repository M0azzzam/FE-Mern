import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Grid, Icon, Container } from 'semantic-ui-react';

const NotFound = () => {

  return (
    <Container fluid style={{ height: 'calc(100vh - 56px)' }}>
      <Grid columns={1} centered verticalAlign='middle' style={{ height: '100%' }}>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2' icon textAlign='center'>
              <Icon name='exclamation' />
              Page Not Found
          </Header>
            <div style={{ textAlign: 'center' }}>
              <Link to='/app/dashboard' replace name="dashboard">Go back to dashboard</Link>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );


}

export default NotFound;
