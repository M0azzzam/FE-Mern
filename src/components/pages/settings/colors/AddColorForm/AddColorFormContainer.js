import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import AddColorForm from './AddColorForm';
import SidePanelContext from '../../../../extension/SidePanelContext';
import { colorsActions } from '../../../../../store/actions/settings/colors'
import Toast from '../../../../extension/Toast';

const AddColorFormContainer = props => {
  const { dispatch, colorsUpdating } = props;
  const { meta, gridApi, IS_UPDATING } = props.data || {};
  const sidePanelContext = useContext(SidePanelContext);
  const [data, setData] = useState({
    name: IS_UPDATING ? props.data.name : '',
    colorCode: IS_UPDATING ? props.data.colorCode : '',
  });

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleColorPicker = (color) => {
    const { hex } = color || {};
    setData({
      ...data,
      colorCode: hex
    })
  }

  const save = async () => {
    try {

      for (const prop in data) {
        if (!data[prop]) return Toast('Missing Information', 'Please fill in required fields.', 'danger');
      }

      if (IS_UPDATING) {
        const { _id: id } = props.data;

        await dispatch(colorsActions.updateColor({ id, ...data }));
        sidePanelContext.hide();
        Toast('Update Color', `Color ${data.name} updated successfully`, 'success');

        await dispatch(colorsActions.getColors(meta));
        gridApi.redrawRows();
      } else {
        await dispatch(colorsActions.createColor(data));
        Toast('Create Color', `Color ${data.name} created successfully`, 'success');

        sidePanelContext.hide();
        dispatch(colorsActions.getColors(meta));
      }
    } catch (err) {
      let message, title;

      message = IS_UPDATING ? 'Colors could not be updated. Please retry!' : 'Colors could not be created successfully. Please retry!';
      if (err.response && err.response.data && err.response.data.reason) {
        message = err.response.data.reason
      }

      title = IS_UPDATING ? 'Update Color' : 'Create Color';
      Toast(title, message, 'danger');
    }
  }

  return (
    <AddColorForm data={{
      handleInputChange,
      handleColorPicker,
      sidePanelContext,
      data,
      save,
      IS_UPDATING,
      colorsUpdating
    }} />
  )
}

const mapStateToProps = state => ({
  colorsUpdating: state.colors.isUpdating
})

export default connect(mapStateToProps)(AddColorFormContainer);
