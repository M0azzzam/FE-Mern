import React, { useState } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Grid, Image, Form, Button, Container, Icon, Breadcrumb } from 'semantic-ui-react';
import Heading from '../../extension/Heading';
import CountrySelect from '../../extension/CountrySelect';
import FileDrag from '../../extension/FileDrag';
import currencies from '../../values/currencies';
import lanaguages from '../../values/languages';
import valuationMethods from '../../values/valuationMethods';


const StoreConfigurationStep0 = props => {

  const inputRef = React.createRef();


  return (
    <>
      <Grid.Row columns={3} centered>
        <Grid.Column width={2} only='computer'></Grid.Column>
        <Grid.Column width={12}>
          <Form style={{ marginLeft: '15px' }}>
            <Form.Field>
              <Form.Input label='Store Address *' placeholder='What is your store location?' />
            </Form.Field>
            <Form.Group widths='equal'>
              <Form.Input fluid label='City *' placeholder='City name' />
              <Form.Input fluid label='Post Code *' placeholder='Postal code' />
            </Form.Group>
            <Form.Group widths='equal'>
              {/* <Form.Input fluid label='Country *' placeholder='Select Country' /> */}
              <CountrySelect />
              <Form.Input fluid label='Website' placeholder='Enter your website url...' />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Phone *' placeholder='Enter your phone number...' />
              <Form.Input fluid label='Mobile' placeholder='Enter your mobile number...' />
            </Form.Group>
          </Form>
          <Container fluid style={{ width: '100%', padding: 0, paddingLeft: '15px', margin: '0 auto !important' }}>
            <FileDrag forwardRef={inputRef} />
          </Container>
        </Grid.Column>
        <Grid.Column width={2} only='computer'></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4} only='computer'></Grid.Column>
        <Grid.Column width={8}>
          <Button primary fluid onClick={() => props.handleNext()}><Icon name='save' />Proceed to next step</Button>
        </Grid.Column>
        <Grid.Column width={4} only='computer'></Grid.Column>
      </Grid.Row>
    </>
  );
}

const CurrencySelectInput = React.memo(memoProps => {
  const { options } = memoProps;
  const values = options.map(c => ({ text: c.name, value: c.code }))
  return <Form.Select fluid search label='Select Currency' options={values} />
});

const LanguageSelectInput = React.memo(memoProps => {
  const { options } = memoProps;
  return <Form.Select fluid search label='Select your language' options={options} />
});

const ValutationMethodSelectInput = React.memo(memoProps => {
  const { options } = memoProps;
  return <Form.Select fluid search label='Select Inventory Valuation Method' options={options} />
});

const StoreConfigurationStep1 = (props) => {
  const value = 'no';
  const handleChange = () => { }
  return (
    <>
      <Grid.Row columns={3} centered>
        <Grid.Column width={2} only='computer'></Grid.Column>
        <Grid.Column width={12}>
          <Form style={{ marginLeft: '15px' }}>
            <Form.Group widths='equal'>
              <CurrencySelectInput options={currencies} />
              <LanguageSelectInput options={lanaguages} />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Time Zone *' placeholder='Enter your phone number...' />
              <ValutationMethodSelectInput options={valuationMethods} />
            </Form.Group>
            <Form.Group inline>
              <label>Do you charge sales tax?</label>
              <Form.Radio
                label='Yes'
                value='yes'
                checked={value === 'yes'}
                onChange={handleChange}
              />
              <Form.Radio
                label='No'
                value='no'
                checked={value === 'no'}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group inline widths='equal'>
              <Form.Input fluid placeholder='Tax Class' />
              <Form.Input fluid placeholder='Tax %' />
              <Form.Select fluid options={[
                { text: 'Tax is included in price', value: 'tax_included' },
                { text: 'Tax is excluded in price', value: 'tax_excluded' }
              ]} />
            </Form.Group>
          </Form>
        </Grid.Column>
        <Grid.Column width={2} only='computer'></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4} only='computer'></Grid.Column>
        <Grid.Column width={8}>
          <Button primary fluid onClick={() => props.push('/onboarding/pending_approval')}><Icon name='save' />Save</Button>
        </Grid.Column>
        <Grid.Column width={4} only='computer'></Grid.Column>
      </Grid.Row>
    </>
  );
}

const StoreConfiguration = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }

  return (
    <Grid stackable centered>
      <Grid.Row>
        <Grid.Column>
          <div>
            <Image src='https://demobackend.repaircrm.co/images/logo.png' size='medium' centered />
            <Heading as='h1' align='center' style={{ fontSize: '2.5em', fontWeight: 'bold', marginTop: '20px' }}>
              Store Configuration
            </Heading>
            <Heading as='p' align='center' style={{ fontSize: '1.2em' }}>
              Tauqeer! We will keep you safe and you'll never go away
            </Heading>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row >
        <Grid.Column width={12}>
          <Breadcrumb style={{ width: '100%' }}>
            <Breadcrumb.Section>Onboarding</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active={currentStep === 0} onClick={handlePrev}>Store Location</Breadcrumb.Section>
            {currentStep === 1 && <>
              <Breadcrumb.Divider />
              <Breadcrumb.Section active={currentStep === 1}>Store Configuration</Breadcrumb.Section>
            </>}
          </Breadcrumb>
        </Grid.Column>
      </Grid.Row>
      {currentStep === 0 && <StoreConfigurationStep0 handleNext={handleNext} />}
      {currentStep === 1 && <StoreConfigurationStep1 handleNext={handleNext} push={props.push} />}
    </Grid >
  );
}

export default connect(null, { push })(StoreConfiguration);
