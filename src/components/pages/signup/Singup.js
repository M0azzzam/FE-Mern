import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Form, Checkbox, Button, Segment, Divider, Image, Container, Message, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Heading from '../../extension/Heading';
import { userActions } from '../../../store/actions/users';

const style = {
  listItem: {
    fontWeight: '100',
    fontSize: '1.3em',
    lineHeight: '60px',
    color: '#fff',
  }
}

const Signup = props => {
  const [formFields, setFormFields] = useState({});
  const [formErrors, setFormErrors] = useState(false);

  const onInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setFormFields({ ...formFields, [name]: value });
    if (!value) {
      setFormErrors(true);
    } else {
      if (formErrors) setFormErrors(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formFields.email || !formFields.password) {
      setFormErrors(true);
    } else {
      if (formErrors) setFormErrors(false);
      props.dispatch(userActions.register(formFields))
    }
  }

  return (
    <Container fluid style={{ paddingTop: '15px' }}>
      <Grid centered stackable style={{ height: '100%' }}>
        <Grid.Row>
          <div style={{ textAlign: 'center' }}>
            <Image src='https://demobackend.repaircrm.co/images/logo.png' size='medium' centered />
            <Heading as='h1'>Create an account on Repair Desk</Heading>
            <Heading as='h3'>Try it for free today</Heading>
            <Heading as='h3' style={{ color: 'rgba(0, 0, 0, .7)' }}>No Credit card required. 14 days free trial.</Heading>
          </div>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column as={Segment} attached mobile={16} computer={9} tablet={9} >
            <Container fluid>
              <Heading as='h3' align='center'>Please enter your details below!</Heading>
              <Form>
                <Form.Field>
                  <label htmlFor='full-name'>Full Name *</label>
                  <Form.Input name='name' onChange={onInputChange} id='full-name' placeholder='What is your full name?' />
                </Form.Field>
                <Form.Field>
                  <label htmlFor='business-name'>Business Name *</label>
                  <Form.Input name='businessName' onChange={onInputChange} id='business-name' placeholder='What is the name of your business?' />
                </Form.Field>
                <Form.Field>
                  <label htmlFor='business-email'>Business Email *</label>
                  <Form.Input name='email' onChange={onInputChange} id='business-email' placeholder='What is your email address?' />
                </Form.Field>
                <Form.Field>
                  <label htmlFor='password'>Password *</label>
                  <Form.Input name='password' type="password" onChange={onInputChange} id='password' placeholder='Enter a strong password!' />
                </Form.Field>
                <Form.Field>
                  <Checkbox label='By joining, you agree to our User Agreement' />
                </Form.Field>
                <Form.Field>
                  <Checkbox label='Subscribe to our updates &amp; never fall behind in the Repair World' />
                </Form.Field>
                <Button onClick={handleSubmit} type='submit' primary loading={props.registering} disabled={props.registering}>Sign Up</Button>
                {formErrors && <Message negative>
                  <Message.Header>Error!</Message.Header>
                  <p>Please provide your name, business name, email and password to proceed.</p>
                </Message>}
              </Form>
            </Container>
            <Message warning>
              <Icon name='help' />
              Already have an account?<Link to='/login' replace style={{ color: '#000', fontWeight: 'bold' }}> Click to login</Link>
            </Message>
          </Grid.Column>
          <Grid.Column as={Segment} attached mobile={16} computer={4} tablet={7} style={{ background: 'radial-gradient(#3496d1,#114e7b)', margin: 0 }}>
            <Container fluid>
              <Heading as='h2' color='#fff'>Plus Plan</Heading>
              <ul>
                <li style={style.listItem}>All Standard Features</li>
                <li style={style.listItem}>25 Mailboxes</li>
                <li style={style.listItem}>5 Docs knowledge bases</li>
                <li style={style.listItem}>Teams</li>
                <li style={style.listItem}>Custom Fields</li>
              </ul>
              <Button primary style={{ fontSize: '1.3em', width: '100%' }}>View All Features</Button>
              <Divider horizontal><Heading as='h6' color='white'>JOIN 8,000+ COMPANIES</Heading></Divider>
              <Grid verticalAlign='middle'>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Image src='https://demobackend.repaircrm.co/images/cob-img1.png' size='tiny' centered />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Image src='https://demobackend.repaircrm.co/images/cob-img2.png' size='tiny' centered />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Image src='https://demobackend.repaircrm.co/images/cob-img3.png' size='tiny' centered />
                  </Grid.Column>
                  <Grid.Column width={4}>
                    <Image src='https://demobackend.repaircrm.co/images/cob-img4.png' size='tiny' centered />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

const mapStateToProps = state => ({
  registering: state.registration.registering
})

export default connect(mapStateToProps)(Signup);
