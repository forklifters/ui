import PropTypes from 'prop-types';
import React from 'react';

import SvgIcon from '../SvgIcon';

const MobileMenuToggle = ({ isOpen, onClick }) => (
  <a
    className="tui-app-nav-burger"
    onClick={onClick}
    href="javascript:void(0)"
    aria-label="Toggle navigation links"
  >
    {isOpen ? (
      <SvgIcon className="tui-app-nav-burger-close" name="close" size={16} />
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
