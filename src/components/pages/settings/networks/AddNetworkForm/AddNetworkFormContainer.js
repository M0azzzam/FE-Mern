import React, { useContext } from 'react';
import AddNetworkForm from './AddNetworkForm';
import SidePanelContext from '../../../../extension/SidePanelContext';

const AddNetworkFormContainer = () => {

  const sidePanelContext = useContext(SidePanelContext);
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
    init: dz => { return dropzone = dz },
    drop: callbackArray,
    addedfile: callback,
    success: success,
    removedfile: removedfile
  };

  return (
    <AddNetworkForm data={{
      sidePanelContext,
      dropzone,
      djsConfig,
      componentConfig,
      callbackArray,
      eventHandlers
    }} />
  )
}

export default AddNetworkFormContainer;
