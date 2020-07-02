import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import AddPhysicalLocationForm from './AddPhysicalLocationForm';
import SidePanelContext from '../../../../extension/SidePanelContext';
import { physicalLocationsActions } from '../../../../../store/actions/settings/physicalLocations';
import Toast from '../../../../extension/Toast';

const AddPhysicalLocationFormContainer = (props) => {

  const sidePanelContext = useContext(SidePanelContext);
  const { dispatch, isUpdating } = props;
  const { meta, gridApi, IS_UPDATING } = props.data || {};
  const [data, setData] = useState({
    name: IS_UPDATING ? props.data.name : ''
  })

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const save = async () => {
    try {

      for (const prop in data) {
        if (!data[prop]) return Toast('Missing Information', 'Please fill in required fields.', 'danger');
      }

      if (IS_UPDATING) {
        const { _id: id } = props.data;

        await dispatch(physicalLocationsActions.updatePhysicalLocation({ id, ...data }));
        sidePanelContext.hide();
        Toast('Update Physical Location', `Physical Location ${data.name} updated successfully`, 'success');

        await dispatch(physicalLocationsActions.getPhysicalLocations(meta));
        gridApi.redrawRows();
      } else {
        await dispatch(physicalLocationsActions.createPhysicalLocation(data));
        Toast('Create Physical Location', `Physical Location ${data.name} created successfully`, 'success');

        sidePanelContext.hide();
        dispatch(physicalLocationsActions.getPhysicalLocations(meta));
      }
    } catch (err) {
      let message, title;

      message = IS_UPDATING ? 'Physical Location could not be updated. Please retry!' : 'Physical Location could not be created successfully. Please retry!';
      if (err.response && err.response.data && err.response.data.reason) {
        message = err.response.data.reason
      }

      title = IS_UPDATING ? 'Update Physical Location' : 'Create Physical Location';
      Toast(title, message, 'danger');
    }
  }

  return (
    <AddPhysicalLocationForm data={{
      handleInputChange,
      sidePanelContext,
      save,
      data,
      IS_UPDATING,
      isUpdating,
    }} />
  )
}

const mapStateToProps = state => ({
  isUpdating: state.physicalLocations.isUpdating
})

export default connect(mapStateToProps)(AddPhysicalLocationFormContainer);
