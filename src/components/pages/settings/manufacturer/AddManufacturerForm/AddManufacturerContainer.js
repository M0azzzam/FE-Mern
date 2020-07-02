import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import AddManufacturer from './AddManufacturer';
import SidePanelContext from '../../../../extension/SidePanelContext';
import { manufacturersActions } from '../../../../../store/actions/settings/manufacturers';
import Toast from '../../../../extension/Toast';

const AddManufacturerContainer = (props) => {

  const { dispatch } = props || {};
  const { meta, gridApi, IS_UPDATING } = props.data || {};

  const sidePanelContext = useContext(SidePanelContext);
  const [data, setData] = useState({
    name: IS_UPDATING ? props.data.name : '',
    triggers: {
      onPOS: IS_UPDATING ? props.data.triggers.onPOS : true,
      onWidget: IS_UPDATING ? props.data.triggers.onWidget : false
    }
  });

  const handleTrigger = (newData) => {
    setData({
      ...data,
      triggers: {
        ...data.triggers,
        [newData.name]: newData.checked
      }
    })
  }

  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const save = async (data) => {
    try {
      for (const prop in data) {
        if (!data[prop]) return Toast('Missing Information', 'Manufacturer name is required.', 'danger');
      }

      if (props.data.IS_UPDATING) {
        const { _id: id } = props.data;
        await dispatch(manufacturersActions.updateManufacturer({ id, ...data }));
        sidePanelContext.hide();
        await dispatch(manufacturersActions.getManufacturers(meta));
        gridApi.redrawRows();
      } else {
        await dispatch(manufacturersActions.createManufacturer(data));
        sidePanelContext.hide();
        dispatch(manufacturersActions.getManufacturers(meta));
      }
    } catch(err) {
    }
  }

  var Dropzone = null;

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
    <AddManufacturer data={{
      sidePanelContext,
      onInputChange,
      handleTrigger,
      Dropzone,
      djsConfig,
      componentConfig,
      callbackArray,
      eventHandlers,
      save,
      data,
      isUpdating: IS_UPDATING ? true : false
    }} />
  );
}

export default connect()(AddManufacturerContainer);
