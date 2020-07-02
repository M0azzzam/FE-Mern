import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import propTypes from 'prop-types';
import { Grid, Image, Popup, Icon, Checkbox, Radio, Form, Button } from 'semantic-ui-react';
import Heading from '../../extension/Heading';

const style = {
  sectionHeading: {
    background: 'rgba(0, 0, 0, .04)',
    padding: '15px',
    margin: '0px auto',
  },
  imageContainer: {
    border: '1px solid #000',
    borderRadius: '5px',
    padding: '15px',
    textAlign: 'center',
    width: '80%',
    margin: '0 auto',
    cursor: 'pointer'
  },
  label: {
    marginTop: '10px'
  },
  labelCheckbox: {
    position: 'relative',
    top: '2px',
    marginRight: '10px'
  }
}

const PanelHeading = ({ title, tooltip = null, checkbox = null, checkboxCallback = null }) => (<Grid.Row columns={3} style={{ padding: 0 }}>
  <Grid.Column width={2} only='computer'></Grid.Column>
  <Grid.Column width={12} style={{ padding: 0 }}>
    <div>
      <Heading as='h3' style={style.sectionHeading}>
        {checkbox && <Checkbox onChange={checkboxCallback} style={style.labelCheckbox} />}
        {title} {tooltip && <Popup inverted content={tooltip} position='top left' trigger={<Icon name='exclamation circle' size='small' color='grey' />} />}
      </Heading>
    </div>
  </Grid.Column>
  <Grid.Column width={2} only='computer'></Grid.Column>
</Grid.Row>);

PanelHeading.propTypes = {
  title: propTypes.string.isRequired,
  tooltip: propTypes.string
}

const Onboarding = props => {
  return (
    <Grid stackable centered>
      <Grid.Row>
        <Grid.Column>
          <div>
            <Image src='https://demobackend.repaircrm.co/images/logo.png' size='medium' centered />
            <Heading as='h1' align='center' style={{ fontSize: '2.5em', fontWeight: 'bold', marginTop: '20px' }}>
              Business Dimensions
            </Heading>
            <Heading as='p' align='center' style={{ fontSize: '1.2em' }}>
              Tauqeer! We will keep you safe and you'll never go away
            </Heading>
          </div>
        </Grid.Column>
      </Grid.Row>
      <PanelHeading title='What do you mostly repair?' tooltip={'Please select atleast one category'} />
      <Grid.Row columns={4} centered>
        <Grid.Column width={3}>
          <div style={style.imageContainer}>
            <img src='https://demo.repaircrm.co/themes/repairdesk/img/cob-img5.png' alt='Mobile' style={{ width: '50px', height: '95px' }} />
            <Heading as='h3' style={style.label}>
              Mobile
            </Heading>
          </div>
        </Grid.Column>
        <Grid.Column width={3}>
          <div style={style.imageContainer}>
            <img src='https://demo.repaircrm.co/themes/repairdesk/img/cob-img6.png' alt='Computer' style={{ width: '92px', height: '95px' }} />
            <Heading as='h3' style={style.label}>
              Computer
            </Heading>
          </div>
        </Grid.Column>
        <Grid.Column width={3} >
          <div style={style.imageContainer}>
            <img src='https://demo.repaircrm.co/themes/repairdesk/img/cob-img7.png' alt='Tablet' style={{ width: '62px', height: '95px' }} />
            <Heading as='h3' style={style.label}>
              Tablet
            </Heading>
          </div>
        </Grid.Column>
        <Grid.Column width={3} >
          <div style={style.imageContainer}>
            <img src='https://demo.repaircrm.co/themes/repairdesk/img/cob-img8.png' alt='iPod' style={{ width: '61px', height: '95px' }} />
            <Heading as='h3' style={style.label}>
              iPod
            </Heading>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered columns={4}>
        <Grid.Column width={3}>
          <div style={style.imageContainer}>
            <img src='https://demo.repaircrm.co/themes/repairdesk/img/cob-img5.png' alt='Mobile' style={{ width: '50px', height: '95px' }} />
            <Heading as='h3' style={style.label}>
              Mobile
            </Heading>
          </div>
        </Grid.Column>
        <Grid.Column width={3}>
          <div style={style.imageContainer}>
            <img src='https://demo.repaircrm.co/themes/repairdesk/img/cob-img6.png' alt='Computer' style={{ width: '92px', height: '95px' }} />
            <Heading as='h3' style={style.label}>
              Computer
            </Heading>
          </div>
        </Grid.Column>
        <Grid.Column width={3} >
          <div style={style.imageContainer}>
            <img src='https://demo.repaircrm.co/themes/repairdesk/img/cob-img7.png' alt='Tablet' style={{ width: '62px', height: '95px' }} />
            <Heading as='h3' style={style.label}>
              Tablet
            </Heading>
          </div>
        </Grid.Column>
        <Grid.Column width={3} >
          <div style={style.imageContainer}>
            <img src='https://demo.repaircrm.co/themes/repairdesk/img/cob-img8.png' alt='iPod' style={{ width: '61px', height: '95px' }} />
            <Heading as='h3' style={style.label}>
              iPod
            </Heading>
          </div>
        </Grid.Column>
      </Grid.Row>
      <PanelHeading title='You mostly offer?' tooltip='Please select atleast one option' checkbox checkboxCallback={() => { alert('asdf') }} />
      <Grid.Row columns={3} centered>
        <Grid.Column width={2} only='computer'></Grid.Column>
        <Grid.Column width={12}>
          <Form style={{ marginLeft: '15px' }}>
            <Form.Field>
              <Checkbox label='In-Store Repair' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='On Site Repair' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Online Repair Order' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Wholesale' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='Others' />
            </Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column width={2} only='computer'></Grid.Column>
      </Grid.Row>
      <PanelHeading title='How many store locations do you have?' tooltip='Please selec atleast one option' />
      <Grid.Row>
        <Grid.Column width={2} only='computer'></Grid.Column>
        <Grid.Column width={12}>
          <Form style={{ marginLeft: '15px' }}>
            <Form.Field>
              <Radio name='store_locations' label='1-3' />
            </Form.Field>
            <Form.Field>
              <Radio name='store_locations' label='4-10' />
            </Form.Field>
            <Form.Field>
              <Radio name='store_locations' label='11-20' />
            </Form.Field>
            <Form.Field>
              <Radio name='store_locations' label='21-30' />
            </Form.Field>
            <Form.Field>
              <Radio name='store_locations' label='30+' />
            </Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column width={2} only='computer'></Grid.Column>
      </Grid.Row>
      <PanelHeading title='Why are you singing up for RepairDesk? ' tooltip='Please select atleast one option' />
      <Grid.Row>
        <Grid.Column width={2} only='computer'></Grid.Column>
        <Grid.Column width={12}>
          <Form style={{ marginLeft: '15px' }}>
            <Form.Field>
              <Radio name='reason' label='Just testing' />
            </Form.Field>
            <Form.Field>
              <Radio name='reason' label='Serious about acquiring service' />
            </Form.Field>
            <Form.Field>
              <Radio name='reason' label='Checking as an alternative' />
            </Form.Field>
            <Form.Field>
              <Radio name='reason' label='I am developer' />
            </Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column width={2} only='computer'></Grid.Column>
      </Grid.Row>
      <PanelHeading title='At present, what are you currently using?' tooltip='Please select atleast one option' />
      <Grid.Row>
        <Grid.Column width={2} only='computer'></Grid.Column>
        <Grid.Column width={12}>
          <Form style={{ marginLeft: '15px' }}>
            <Form.Field>
              <Radio name='currently_using' label='Just testing' />
            </Form.Field>
            <Form.Field>
              <Radio name='currently_using' label='Spreadsheets' />
            </Form.Field>
            <Form.Field>
              <Radio name='currently_using' label='If using another software please enter its name' />
            </Form.Field>
            <Form.Field>
              <Form.Input name='currently_using_input' style={{ marginLeft: '25px' }} width='3' />
            </Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column width={2} only='computer'></Grid.Column>
      </Grid.Row>
      <PanelHeading title='How did you hear about us?' tooltip='Please select atleast one option' />
      <Grid.Row>
        <Grid.Column width={2} only='computer'></Grid.Column>
        <Grid.Column width={12}>
          <Form style={{ marginLeft: '15px' }}>
            <Form.Field>
              <Radio name='reference' value='google' label='Google' />
            </Form.Field>
            <Form.Field>
              <Radio name='reference' value='facebook' label='Facebook' />
            </Form.Field>
            <Form.Field>
              <Radio name='reference' value='friend' label='A friend recommended RepairDesk' />
            </Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column width={2} only='computer'></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4} only='computer'></Grid.Column>
        <Grid.Column width={8}>
          <Button primary fluid onClick={() => props.push(`${props.match.url}/store_configuration`)}><Icon name='save' /> Save &amp; Proceed</Button>
        </Grid.Column>
        <Grid.Column width={4} only='computer'></Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default connect(null, { push })(Onboarding);
