import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Bell from './Icons/Bell';
import Book from './Icons/Book';
import Close from './Icons/Close';

const SvgIcon = ({ className, name, ...props }) => {
  switch (name) {
    case 'bell':
      return <Bell {...props} className={cx('svg-icon', className)} />;
    case 'book':
      return <Book {...props} className={cx('svg-icon', className)} />;
    case 'close':
      return <Close {...props} className={cx('svg-icon', className)} />;
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
