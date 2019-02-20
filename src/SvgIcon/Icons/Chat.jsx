import PropTypes from 'prop-types';
import React from 'react';

import { black } from '../../styleguide';

const Chat = ({ color, size, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
  >
    <g fill={color} fillRule="nonzero">
      <ellipse cx="5.366" cy="7.976" rx="1.098" ry="1.071" />
      <ellipse cx="9.39" cy="7.976" rx="1.098" ry="1.071" />
      <ellipse cx="13.415" cy="7.976" rx="1.098" ry="1.071" />
      <path d="M9.39 15.476c5.122 0 9.269-3.476 9.269-7.738C18.659 3.476 14.512 0 9.39 0S.122 3.476.122 7.738c0 4.262 4.146 7.738 9.268 7.738zm0-13.571c4.025 0 7.317 2.619 7.317 5.833s-3.292 5.833-7.317 5.833c-4.024 0-7.317-2.619-7.317-5.833S5.366 1.905 9.39 1.905zM14.39 17.262c0 1.5 1.269 2.738 2.805 2.738C18.732 20 20 18.762 20 17.262s-1.268-2.738-2.805-2.738c-1.536 0-2.805 1.238-2.805 2.738zm3.659 0c0 .452-.39.833-.854.833-.463 0-.854-.38-.854-.833 0-.452.39-.833.854-.833.464 0 .854.38.854.833z" />
    </g>
  </svg>
);

Chat.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number.isRequired,
};

Chat.defaultProps = {
  color: black,
};

export default Chat;
