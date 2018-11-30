import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import { gray75 } from '../../styleguide';

const WIDTH_MULTIPLIER = 14 / 17;

const Bell = ({ color, size, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={WIDTH_MULTIPLIER * size}
    height={size}
    viewBox="0 0 14 17"
  >
    <path
      fill={color}
      fillRule="nonzero"
      d="M13.506 10.933a4.788 4.788 0 0 0-.552-.106c-.782-.118-1.52-.229-1.52-4.017 0-2.054-1.048-3.72-2.767-4.462v-.497C8.667.761 7.98 0 7 0S5.333.761 5.333 1.851v.497C3.614 3.09 2.567 4.756 2.567 6.81c0 3.788-.739 3.9-1.52 4.017a4.776 4.776 0 0 0-.553.106.671.671 0 0 0-.494.65v2.387a.67.67 0 0 0 .667.674H4.16C4.389 15.979 5.574 17 7 17c1.347 0 2.584-1.074 2.834-2.356h3.5A.67.67 0 0 0 14 13.97v-2.386a.671.671 0 0 0-.494-.65zM7 15.653a1.541 1.541 0 0 1-1.462-1.01h2.906c-.223.529-.782 1.01-1.444 1.01zm5.667-2.356H1.333v-1.153C3 11.865 3.9 10.897 3.9 6.81c0-1.647.859-2.899 2.297-3.35a.672.672 0 0 0 .47-.642V1.85c0-.504.25-.504.333-.504.082 0 .333 0 .333.504v.967c0 .295.19.556.47.643C9.24 3.91 10.1 5.163 10.1 6.81c0 4.086.902 5.055 2.567 5.333v1.153z"
    />
  </svg>
);

Bell.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number.isRequired,
};

Bell.defaultProps = {
  color: gray75,
};

export default Bell;
