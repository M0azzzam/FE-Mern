import React from "react";
import { Popup, Icon } from "semantic-ui-react";
import NotificationContent from "./NotificationContent";

export default props => {
  return (
    <Popup
      hoverable
      trigger={<Icon size="large" name="mail outline" color="grey" />}
      position='bottom right'
      size="small"
    >
      <NotificationContent />
    </Popup>
  );
}
