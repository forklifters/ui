import PropTypes from 'prop-types';
import React from 'react';

import { black } from '../../styleguide';

const WIDTH_MULTIPLIER = 17 / 11;

const VideoCamera = ({ color, size, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    width={WIDTH_MULTIPLIER * size}
    height={size}
    viewBox="0 0 17 11"
  >
    <path
      fill={color}
      fillRule="nonzero"
      d="M16.296.432a1.286 1.286 0 0 0-1.35.06l-2.798 1.806V.727A.724.724 0 0 0 11.425 0H.724A.724.724 0 0 0 0 .727v9.546c0 .393.313.727.724.727h10.72a.724.724 0 0 0 .724-.727V8.702l2.778 1.787c.215.138.47.216.724.216.234 0 .45-.059.626-.157.43-.236.704-.687.704-1.198V1.63a1.38 1.38 0 0 0-.704-1.198zm-.724 1.375v7.347l-3.404-2.18V4.006l3.404-2.2zM10.72 7.504v2.042H1.448V1.434h9.272v6.07z"
    />
  </svg>
);

VideoCamera.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number.isRequired
};

VideoCamera.defaultProps = {
  color: black
};

export default VideoCamera;
