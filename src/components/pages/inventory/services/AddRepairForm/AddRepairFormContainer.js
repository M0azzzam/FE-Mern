import React, { useContext, useState } from 'react';
import AddRepairForm from './AddRepairForm';
import SidePanelContext from '../../../../extension/SidePanelContext';

const AddRepairFormContainer = () => {
  const sidePanelContext = useContext(SidePanelContext);
  const [commission, setCommission] = useState(false);

  const handleCommission = () => {
    setCommission(!commission)
  }

  var dropzone = null;

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
    init: dz => { return (dropzone = dz, console.log(dz)) },
    drop: callbackArray,
    addedfile: callback,
    success: success,
    removedfile: removedfile
  };

  return (
    <AddRepairForm data={{
      sidePanelContext,
      handleCommission,
      commission,
      componentConfig,
      eventHandlers,
      djsConfig
    }} />
  )
}

export default AddRepairFormContainer;
