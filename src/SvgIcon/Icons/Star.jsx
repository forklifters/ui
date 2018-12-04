import PropTypes from 'prop-types';
import React from 'react';

import { black } from '../../styleguide';

const WIDTH_MULTIPLIER = 18 / 17;

const Star = ({ color, size, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    width={WIDTH_MULTIPLIER * size}
    height={size}
    viewBox="0 0 18 17"
  >
    <path
      fill={color}
      fillRule="evenodd"
      d="M11.723 5.657c8.27.798 7.89-.355 1.654 5.102 1.81 8.053 2.794 7.343-4.359 3.172-7.197 4.193-6.19 4.925-4.38-3.172-6.259-5.48-6.639-4.304 1.676-5.102 3.308-7.543 2.1-7.543 5.409 0z"
    />
  </svg>
);

Star.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number.isRequired,
};

Star.defaultProps = {
  color: black,
};

export default Star;
