import React, { useContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AddDevices from './AddDevices';
import SidePanelContext from '../../../../extension/SidePanelContext';
import Toast from '../../../../extension/Toast';
import { devicesActions } from '../../../../../store/actions/settings/devices';
import { manufacturersActions } from '../../../../../store/actions/settings/manufacturers';
import { colorsActions } from '../../../../../store/actions/settings/colors';

const AddDevicesContainer = (props) => {

  const colorsInfo = (selectedColors) => {
    return selectedColors.map((color) => color._id)
  }

  const sidePanelContext = useContext(SidePanelContext);
  const { dispatch, manufacturersLoading, manufacturers, colors } = props;
  const { meta, gridApi, IS_UPDATING } = props.data || {};
  const [manufacturerOptions, setManufacturerOptions] = useState([]);
  const [colorOptions, setColorOptions] = useState([]);
  const [data, setData] = useState({
    name: IS_UPDATING ? props.data && props.data.name : '',
    manufacturer: IS_UPDATING ? props.data && props.data.manufacturer && props.data.manufacturer._id : '',
    colors: IS_UPDATING ? colorsInfo(props.data.colors) : [],
    triggers: {
      onPOS: IS_UPDATING ? props.data && props.triggers && props.triggers.onPOS : true,
      onWidget: IS_UPDATING ? props.data && props.triggers && props.triggers.onWidget : false
    }
  });
  var Dropzone = null;

  useEffect(() => {
    dispatch(manufacturersActions.getManufacturers({ page: 1, limit: 0 }));
    dispatch(colorsActions.getColors({ page: 1, limit: 0 }));
  }, []);

  useEffect(() => {
    if (manufacturers) {
      const options = manufacturers.map((manufacturer) => ({
        value: manufacturer._id,
        text: manufacturer.name
      }))
      setManufacturerOptions(options);
    }
  }, [manufacturers]);

  useEffect(() => {
    if (colors) {
      const options = colors.map((color) => ({
        value: color._id,
        text: color.name
      }))
      setColorOptions(options);
    }
  }, [colors]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleTriggers = (newData) => {
    setData({
      ...data,
      triggers: {
        ...data.triggers,
        [newData.name]: newData.checked
      }
    })
  }

  const handleSelectGroups = (newData) => {
    setData({
      ...data,
      [newData[1].name]: newData[1].value
    })
  }

  const save = async () => {
    try {
      const { colors, triggers, ...rest } = data;

      for (const prop in rest) {
        if (!rest[prop]) return Toast('Missing Information', 'Please fill in required fields.', 'danger');
      }

      if (IS_UPDATING) {
        const { _id: id } = props.data;

        await dispatch(devicesActions.updateDevice({ id, ...data }));
        sidePanelContext.hide();
        Toast('Update Device', `Device ${data.name} updated successfully`, 'success');

        await dispatch(devicesActions.getDevices(meta));
        gridApi.redrawRows();
      } else {
        await dispatch(devicesActions.createDevice(data));
        Toast('Create Device', `Device ${data.name} created successfully`, 'success');

        sidePanelContext.hide();
        dispatch(devicesActions.getDevices(meta));
      }
    } catch (err) {
      let message, title;

      message = IS_UPDATING ? 'Device could not be updated, Please retry!' : 'Device could not be created successfully. Please retry!';
      if (err.response && err.response.data && err.response.data.reason) {
        message = err.response.data.reason
      }

      title = IS_UPDATING ? 'Update Device' : 'Create Device';
      Toast(title, message, 'danger');
    }
  }

  const djsConfig = {
    addRemoveLinks: true,
    acceptedFiles: "image/jpeg,image/png,image/gif"
  };

  const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: '/uploadHandler'
  };

  const callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];
  const callback = () => console.log('Hello!');
  const success = file => console.log('uploaded', file);
  const removedfile = file => console.log('removing...', file);

  const eventHandlers = {
    init: dz => { return Dropzone = dz },
    drop: callbackArray,
    addedfile: callback,
    success: success,
    removedfile: removedfile
  };

  return (
    <AddDevices data={{
      sidePanelContext,
      Dropzone,
      djsConfig,
      componentConfig,
      callbackArray,
      eventHandlers,
      handleInputChange,
      handleTriggers,
      handleSelectGroups,
      manufacturerOptions,
      colorOptions,
      save,
      data,
      IS_UPDATING,
      manufacturersLoading
    }} />
  )
}

const mapStateToProps = state => ({
  manufacturersLoading: state.manufacturers.isLoading,
  manufacturers: state.manufacturers.data,
  colors: state.colors.data
})

export default connect(mapStateToProps)(AddDevicesContainer);
