import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Grid, Image, Icon, Button, Divider } from 'semantic-ui-react';
import Heading from '../../extension/Heading';

const style = {
  container: {
    border: '1px solid grey',
    borderRadius: '5px',
    padding: '15px',
    textAlign: 'center',
    margin: '0 auto',
    cursor: 'pointer'
  },
  videoTitle: {
    marginTop: '8px'
  }
}

const Onboarding = props => {
  return (
    <Grid stackable centered>
      <Grid.Row>
        <Grid.Column>
          <div>
            <Image src='https://demobackend.repaircrm.co/images/logo.png' size='medium' centered />
            <Heading as='h1' align='center' style={{ fontSize: '2.5em', fontWeight: 'bold', marginTop: '20px' }}>
              Hello Tauqeer
            </Heading>
            <Heading as='p' align='center' style={{ fontSize: '1em' }}>
              Your RepairDesk account is pending for approval.
            </Heading>
            <Heading as='p' align='center' style={{ fontSize: '1em' }}>
              Your account manager will be in touch shortly to learn more about your workflow needs, challenges and activate your account.
            </Heading>
            <br />
            <Heading as='p' align='center' style={{ fontSize: '1em' }}>
              If you need immediate access to your trial account please contact us via live chat or send us an email.
            </Heading>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={3}>
        <Grid.Column width={6} textAlign='center'>
          <Button icon='chat' label='Live Chat' />
          <Button icon='call' label='Call Us' />
          <Button icon='mail' label='Email Us' />
          <Divider />
          <Heading as='h4' color='rgba(0, 0, 0, .7)'><Icon name='arrow down' /> Watch tutorial videos to get started with RepairDesk <Icon name='arrow down' /></Heading>
          {/* <Divider /> */}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={8} textAlign='center'>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={2}>
          <div style={style.container}>
            <div>
              <Icon name='play circle' size='huge' color='grey' />
            </div>
            <p style={style.videoTitle}>Learn how to create a ticket</p>
          </div>
        </Grid.Column>
        <Grid.Column width={2}>
          <div style={style.container}>
            <div>
              <Icon name='play circle' size='huge' color='grey' />
            </div>
            <p style={style.videoTitle}>Learn how to create invoice</p>
          </div>
        </Grid.Column>
        <Grid.Column width={2}>
          <div style={style.container}>
            <div>
              <Icon name='play circle' size='huge' color='grey' />
            </div>
            <p style={style.videoTitle}>Learn how to manage inventory</p>
          </div>
        </Grid.Column>
        <Grid.Column width={2}>
          <div style={style.container}>
            <div>
              <Icon name='play circle' size='huge' color='grey' />
            </div>
            <p style={style.videoTitle}>Learn how to take deposit</p>
          </div>
        </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
      </Grid.Row>
      <Grid.Row columns={8} textAlign='center'>
        <Grid.Column width={1}></Grid.Column>
        <Grid.Column width={2}>
          <div style={style.container}>
            <div>
              <Icon name='play circle' size='huge' color='grey' />
            </div>
            <p style={style.videoTitle}>Learn how to manage repairs</p>
          </div>
        </Grid.Column>
        <Grid.Column width={2}>
          <div style={style.container}>
            <div>
              <Icon name='play circle' size='huge' color='grey' />
            </div>
            <p style={style.videoTitle}>RepairDesk product demo</p>
          </div>
        </Grid.Column>
        <Grid.Column width={1}></Grid.Column>
      </Grid.Row>
    </Grid >
  );
}

export default connect(null, { push })(Onboarding);
