import PropTypes from 'prop-types';
import React from 'react';

import { gray75 } from '../../styleguide';

const WIDTH_MULTIPLIER = 11 / 15;

const MapMarker = ({ color, size, ...props }) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg' 
    width={WIDTH_MULTIPLIER * size} 
    height={size}
    viewBox='0 0 11 15'>
      <g fill={color}>
          <path d='M5.491 0C2.463.01.01 2.454 0 5.473c0 3.09 2.65 6.405 4.227 8.114a1.735 1.735 0 0 0 2.546 0C8.35 11.877 11 8.546 11 5.473 10.99 2.447 8.527 0 5.491 0zm.503 12.896a.694.694 0 0 1-1.022 0c-1.196-1.294-3.95-4.592-3.95-7.423a4.453 4.453 0 0 1 4.46-4.446c2.464 0 4.461 1.99 4.461 4.446 0 2.831-2.754 6.146-3.95 7.423z'
          />
          <path d='M5.762 2.619a2.619 2.619 0 1 0 0 5.238 2.619 2.619 0 0 0 0-5.238zm0 4.218A1.599 1.599 0 1 1 7.36 5.238a1.599 1.599 0 0 1-1.6 1.582v.017z'
          />
      </g>
  </svg>
);

MapMarker.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number.isRequired,
};

MapMarker.defaultProps = {
  color: gray75,
};

export default MapMarker;
