const cx = require('classnames');
const _ = require('lodash');
const uniqueId = require('lodash/utility/uniqueId');
const moment = require('moment-timezone');
const PropTypes = require('prop-types');
const React = require('react');
// TUI Components
const Icon = require('../Icon');
const Gravatar = require('../Gravatar');
const { getLinkSet } = require('./linkSet');
const NavLink = require('./NavLink');
const Notifications = require('./notifications/Notifications');
const Logo = require('../Logo');

class AppNav extends React.Component {
  constructor(props) {
    super(props);
    this._toggleMenu = this._toggleMenu.bind(this);
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);

    this.state = {
      isMenuVisible: false,
      linkSet: getLinkSet(props.config, props.user),
    };
  }

  getChildContext() {
    return {
      user: this.props.user,
    };
  }

  _toggleMenu() {
    this.setState({
      isMenuVisible: !this.state.isMenuVisible,
    });
  }

  _handleMouseEnter(event) {
    if (this.mouseTimeout) {
      clearTimeout(this.mouseTimeout);
    }
  }

  _handleMouseLeave(event) {
    clearTimeout(this.mouseTimeout);
    this.mouseTimeout = setTimeout(() => {
      this.setState({
        isMenuVisible: false,
        isCourseDropdownVisible: false,
      });
    }, 400);
  }

  render() {
    const { user, config } = this.props;
    const { isMenuVisible, linkSet } = this.state;

    return (
      <div className="app-nav-container">
        <nav
          onMouseLeave={this._handleMouseLeave}
          className={cx('app-nav', {
            'app-nav__visible': isMenuVisible,
          })}
          key="main-navigation"
          rel="main-navigation"
        >
          <div className="nav-bar-container">
            <div className="app-nav-left">
              <a className="app-nav-logo" href={linkSet.home.url}>
                <Logo brand={user.brand} />
              </a>
              <ul className="app-nav-main">
                {linkSet.main.map(link => (
                  <li key={uniqueId('link_')}>
                    <NavLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="app-nav-right">
              <Notifications />
              {/* Mobile toggle */}
              <a className="app-nav-burger" onClick={this._toggleMenu}>
                {isMenuVisible ? (
                  <Icon className="app-nav-burger-close" name="close" />
                ) : (
                  <div className="hamburger">
                    <div className="hamburger-stripe" />
                    <div className="hamburger-stripe" />
                    <div className="hamburger-stripe" />
                  </div>
                )}
              </a>
              {/* Desktop toggle */}
              <a className="app-nav-arrow" onClick={this._toggleMenu}>
                <Icon name="navigatedown" />
              </a>
              <Gravatar
                className="app-nav-gravatar"
                email=""
                src={`${config.api.url}/api/hupers/me/avatar`}
                size={120}
              />
            </div>
          </div>
          <ul onMouseEnter={this._handleMouseEnter} className="app-nav-list">
            {linkSet.main.map(link => (
              <li className="nav-li__mobile-only" key={uniqueId('link_')}>
                <NavLink {...link} />
              </li>
            ))}
            <div className="app-nav-list-sub">
              {linkSet.menu.map(link => (
                <li key={uniqueId('link_')}>
                  <NavLink className="app-nav-link__in-menu" {...link} />
                </li>
              ))}
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}

AppNav.propTypes = {
  user: PropTypes.object,
  config: PropTypes.object.isRequired,
};

AppNav.childContextTypes = {
  user: PropTypes.object.isRequired,
};

module.exports = AppNav;
