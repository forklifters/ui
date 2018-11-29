const cx = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const Icon = require('../Icon');

const NavLink = (
  { active, className, displayName, external, icon, url },
  { user },
) => {
  return (
    <a
      className={cx('app-nav-link', className, { active })}
      href={url}
      target={external ? '_blank' : '_self'}
    >
      {icon && <Icon className="app-nav-icon" name={icon} />}
      {displayName && <span className="app-nav-text">{displayName}</span>}
    </a>
  );
};

NavLink.contextTypes = {
  user: PropTypes.object,
};

NavLink.propTypes = {
  active: PropTypes.bool,
  displayName: PropTypes.string,
  icon: PropTypes.string,
  url: PropTypes.string.isRequired,
};
module.exports = NavLink;
