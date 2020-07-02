import React from 'react';
import propTypes from 'prop-types';

const defaultStyles = {
  margin: 0,
  padding: 0
}

const Heading = props => {
  const { as: As, children, style, align = '', color = '', ...rest } = props;
  const mergedStyles = { ...defaultStyles, ...style };
  if (align) mergedStyles.textAlign = align;
  if (color) mergedStyles.color = color;
  return (<As style={mergedStyles} {...rest}>
    {children}
  </As>);
}

Heading.propTypes = {
  as: propTypes.elementType,
  align: propTypes.oneOf(['center', 'justify', 'right', 'left']),
  style: propTypes.object
}

export default Heading;
