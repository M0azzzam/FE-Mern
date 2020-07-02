import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from "semantic-ui-react";
import dashboardImage from '../../assets/icons/Dashboard.svg';
import calendarImage from '../../assets/icons/Calender.svg';
import clockImage from '../../assets/icons/Clock.svg';
import graphImage from '../../assets/icons/Graph.svg';
import jobImage from '../../assets/icons/Job.png';
import userImage from '../../assets/icons/User.svg';
import settingsImage from '../../assets/icons/Settings.svg'

const images = {
  dashboard: dashboardImage,
  calendar: calendarImage,
  graph: graphImage,
  job: jobImage,
  user: userImage,
  clock: clockImage,
  settings: settingsImage
}

const TextIcon = props => {

  const style = {
    alignSelf: 'center',
    paddingLeft: '4px'
  };

  return (
    <div style={{ whiteSpace: 'nowrap', display: 'inline-flex' }}>
      {props.image ? (
        <img src={images[props.name]} style={{ height: 20, width: 20 }} />
      ) : (
          <Icon size='large'
            color={props.color}
            className='c-menu-icon'
            name={props.name}
            style={{ fontSize: '14px' }} />
        )}
      <div style={style} hidden={props.hideText}>
        {props.children}
      </div>
    </div>
  );
}

TextIcon.propTypes = {
  name: PropTypes.string.isRequired,
  hideText: PropTypes.bool,
  color: PropTypes.string,
  image: PropTypes.bool
};

export default TextIcon
