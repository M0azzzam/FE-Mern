import { store } from 'react-notifications-component';

export default (title, message, type, time, w, options) => {
  let width = 350;
  switch (w) {
    case 'large':
      width = 350
      break;
    case 'small':
      width = 230
      break;
    default:
      width = 350;
  }

  const defaultOptions = {
    title,
    message,
    type,
    insert: (options && options.insert) ? options.insert : 'top',
    container: (options && options.container) ? options.container : 'bottom-right',
    animationIn: options && options.animationIn && [`${options.animationIn[0]}`, `${options.animationIn[0]}`],
    animationOut: options && options.animationOut && [`${options.animationOut[0]}`, `${options.animationOut[0]}`],
    dismiss: {
      duration: time || 5000,
      onScreen: (options && options.onScreen) ? options.onScreen : true,
      showIcon: (options && options.showIcon) ? options.showIcon : true
    },
    width
  }

  store.addNotification(defaultOptions);
}
