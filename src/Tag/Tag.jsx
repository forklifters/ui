const cx = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');

const NOOP = () => {};

const Tag = ({
  children,
  className,
  displayName,
  forceEnabled,
  onClick,
  url,
}) => (
  <a
    className={cx('tui-tag', className, {
      'tui-tag__disabled': !forceEnabled && !onClick && !url,
    })}
    href={url}
    onClick={() => onClick && onClick()}
  >
    {displayName}
    {children}
  </a>
);

Tag.propTypes = {
  className: PropTypes.string,
  displayName: PropTypes.string,
  forceEnabled: PropTypes.bool,
  url: PropTypes.string,
};

Tag.defaultProps = {
  forceEnabled: false,
  onClick: null,
};

module.exports = Tag;
