import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../Icon';

const MobileMenuToggle = ({ isOpen, onClick }) => (
  <a className="app-nav-burger" onClick={onClick}>
    {isOpen ? (
      <Icon className="app-nav-burger-close" name="close" />
    ) : (
      <div className="hamburger">
        <div className="hamburger-stripe" />
        <div className="hamburger-stripe" />
        <div className="hamburger-stripe" />
      </div>
    )}
  </a>
);

MobileMenuToggle.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

module.exports = MobileMenuToggle;
