import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../../store/actions/users';
import { Grid, Form, Button, Image, Container, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Heading from '../../extension/Heading';
import { checkAuth } from '../../../utils/auth';
import history from '../../../history';

const style = {
  heading: {
    fontSize: '2.5em',
    marginBottom: '15px'
  },
  paragraph: {
    fontSize: '1.3em',
    color: 'white',
    fontWeight: 100
  },
  container2: {
    position: 'relative',
    left: 0,
    top: '25%',
    padding: '50px'
  }
}

const Login = (props) => {
  const authToken = checkAuth();
  if (authToken) history.replace('/app/dashboard');

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
      props.dispatch(userActions.login(formFields));
    }
  }

  return (
    <Grid centered stackable verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column mobile={16} computer={8} tablet={8}>
          <Container>
            <Image src='https://demobackend.repaircrm.co/images/logo.png' size='medium' centered />
            <Heading as='h1' align='center' style={{ marginTop: '30px' }}>Please login to your account!</Heading>
            <Form>
              <Form.Field>
                <label htmlFor='business-email'>Email *</label>
                <Form.Input onChange={onInputChange} name='email' id='business-email' placeholder='What is your email address?' />
              </Form.Field>
              <Form.Field>
                <label htmlFor='password'>Password *</label>
                <Form.Input onChange={onInputChange} name='password' type="password" id='password' placeholder='Enter a strong password!' />
              </Form.Field>
              <Button.Group>
                <Button type='submit' primary style={{ width: '100%' }} loading={props.signingIn} onClick={handleSubmit}>Login</Button>
                <Button.Or text='or' />
                <Button as={Link} to='/signup' replace positive style={{ width: '100%' }}>Register</Button>
              </Button.Group>
              {formErrors && <Message negative>
                <Message.Header>Error!</Message.Header>
                <p>Please provide your email and password</p>
              </Message>}
            </Form>
            <div style={{ textAlign: 'right' }}>Forgot your password?<Link to='#' replace style={{ color: '#000', fontWeight: 'bold' }}> Click here</Link></div>
          </Container>
        </Grid.Column>
        <Grid.Column mobile={16} computer={8} tablet={8} style={{ background: 'radial-gradient(#3496d1,#114e7b)', height: '100vh' }}>
          <Container style={style.container2}>
            <Heading as='h1' color='#fff' style={style.heading}>Our new release notes are out!</Heading>
            <p style={style.paragraph}>Our new batch of upgrades focuses on giving you extra flexibility through increased warehousing functionality in Brightpearl WMS and the core platform.</p>
            <p style={style.paragraph}>Plus there is an enhanced searching and extra control over price lists with purchases so there's something for everyone.</p>
            <Button secondary style={{ fontSize: '1.3em' }}>FIND OUT MORE >></Button>
          </Container>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const mapStateToProps = state => ({
  signingIn: state.authentication.signingIn
})

export default connect(mapStateToProps)(Login);
