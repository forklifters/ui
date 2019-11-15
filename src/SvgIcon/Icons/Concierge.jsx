import PropTypes from 'prop-types';
import React from 'react';

import { gray75 } from '../../styleguide';

const WIDTH_MULTIPLIER = 18/19;

const Concierge = ({ color, size, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={WIDTH_MULTIPLIER * size}
    height={size}
    viewBox="0 0 18 19"
  >
    <path
      fill={color}
      fillRule="nonzero"
      d="M9 4.48c.498 0 .9-.401.9-.9V.997a.899.899 0 1 0-1.8 0v2.566c0 .498.402.919.9.919zM5.132 5.553a.901.901 0 0 0 .632.268c.23 0 .46-.095.632-.268.344-.344.344-.919 0-1.283l-1.8-1.819c-.345-.345-.92-.345-1.283 0-.364.345-.345.92 0 1.283l1.819 1.82zM12.236 5.802c.23 0 .46-.096.632-.268l1.82-1.82c.344-.344.344-.918 0-1.282-.345-.364-.92-.345-1.284 0l-1.819 1.82c-.345.344-.345.918 0 1.282a.868.868 0 0 0 .651.268zM16.985 16.487h-.766A7.278 7.278 0 0 0 9.9 10.15v-1.34h1.072a.899.899 0 1 0 0-1.8H7.028a.899.899 0 1 0 0 1.8H8.1v1.34a7.316 7.316 0 0 0-6.338 6.338H.996a.899.899 0 1 0 0 1.8h15.97c.498 0 .9-.402.9-.9a.871.871 0 0 0-.88-.9zM9 11.872c2.738 0 4.998 2.011 5.438 4.615H3.562c.44-2.623 2.7-4.615 5.438-4.615z"
    />
  </svg>
);

Concierge.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number.isRequired,
};

Concierge.defaultProps = {
  color: gray75,
};

export default Concierge;
