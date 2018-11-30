import PropTypes from 'prop-types';
import React from 'react';

import Book from './Icons/Book';

const SvgIcon = ({ name, ...props }) => {
  switch (name) {
    case 'book':
      return <Book {...props} />;
    default:
      return null;
  }
};

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
};

SvgIcon.defaultProps = {
  size: 20,
};

module.exports = SvgIcon;
