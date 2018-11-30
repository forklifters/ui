import PropTypes from 'prop-types';
import React from 'react';

import { black } from '../../styleguide';

const Close = ({ color, size, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
  >
    <path
      fill={color}
      fillRule="nonzero"
      d="M6.971 8L.213 1.242A.727.727 0 0 1 1.242.213L8 6.971 14.758.213a.727.727 0 0 1 1.029 1.029L9.029 8l6.758 6.758a.727.727 0 0 1-1.029 1.029L8 9.029l-6.758 6.758a.727.727 0 0 1-1.029-1.029L6.971 8z"
    />
  </svg>
);

Close.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number.isRequired,
};

Close.defaultProps = {
  color: black,
};

export default Close;
