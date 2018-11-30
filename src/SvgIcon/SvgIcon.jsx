import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Bell from './Icons/Bell';
import Book from './Icons/Book';
import Close from './Icons/Close';

const NAME_TO_COMPONENT = {
  bell: Bell,
  book: Book,
  close: Close,
};

const SvgIcon = ({ className, name, ...props }) => {
  const Icon = NAME_TO_COMPONENT[name];
  return Icon ? (
    <Icon className={cx('svg-icon', className)} {...props} />
  ) : null;
};

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
};

SvgIcon.defaultProps = {
  size: 20,
};

module.exports = SvgIcon;
