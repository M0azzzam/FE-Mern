import React from 'react';

const Context = React.createContext({
  show: false,
  setData: () => { },
  hide: () => { },
  successCallback: () => { },
  cancelCallback: () => { }
})

export default Context;
