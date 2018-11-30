import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../Icon';

const DesktopMenuToggle = ({ onClick }) => (
  <a className="app-nav-arrow" onClick={onClick}>
    <Icon name="navigatedown" />
  </a>
);

DesktopMenuToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
};

module.exports = DesktopMenuToggle;
