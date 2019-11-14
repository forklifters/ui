import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import ConciergeModal from './ConciergeModal';
import ConciergeToggle from './ConciergeToggle';
import DesktopMenuToggle from './DesktopMenuToggle';
import Icon from '../Icon';
import Logo from '../Logo';
import MenuList from './MenuList';
import MobileMenuToggle from './MobileMenuToggle';
import NavLink from './NavLink';
import Notifications from './notifications/Notifications';
import UnauthedAppBar from './UnauthedAppBar';
import { getLinkSet } from './linkSet';

const LEGACY_PLATFORM = 'legacy';

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this._toggleMenu = this._toggleMenu.bind(this);
    this._toggleConcierge = this._toggleConcierge.bind(this);
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._shouldInitNotifications = this._shouldInitNotifications.bind(this);

    this.state = {
      isMenuVisible: false,
      isConciergeVisible: false,
      linkSet: props.user ? getLinkSet(props.config, props.user) : null,
    };
  }

  getChildContext() {
    return {
      user: this.props.user,
    };
  }

  // visibility of menu and concierge is mutually exclusive
  // when opening menu or concierge, close the other one
  // when closing menu or concierge, leave the other one alone
  _toggleMenu() {
    const { isMenuVisible, isConciergeVisible } = this.state;
    const newIsMenuVisible = !isMenuVisible;
    const newIsConciergeVisible = newIsMenuVisible ? false : isConciergeVisible;
    this.setState({
      isMenuVisible: newIsMenuVisible,
      isConciergeVisible: newIsConciergeVisible,
    });
  }

  _toggleConcierge() {
    const { isMenuVisible, isConciergeVisible } = this.state;
    const newIsConciergeVisible = !isConciergeVisible;
    const newIsMenuVisible = newIsConciergeVisible ? false : isMenuVisible;
    this.setState({
      isConciergeVisible: newIsConciergeVisible,
      isMenuVisible: newIsMenuVisible,
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
        isCourseDropdownVisible: false
      });
    }, 400);
  }

  _shouldInitNotifications() {
    const { user } = this.props;

    return !/mentor|admin/.test(user.role) && user.platform === LEGACY_PLATFORM;
  }

  render() {
    const { brand, className, config, EnrollmentView, user } = this.props;
    const { isMenuVisible, isConciergeVisible, linkSet } = this.state;

    if (!user) {
      return <UnauthedAppBar config={config} />;
    }

    return (
      <div className={cx('tui-app-nav-container', className)}>
        <nav
          onMouseLeave={this._handleMouseLeave}
          className={cx('tui-app-nav', {
            'tui-app-nav__visible': isMenuVisible,
            'tui-app-nav__concierge-visible': isConciergeVisible,
          })}
          key="main-navigation"
          rel="main-navigation"
        >
          <div className="nav-bar-container">
            <div className="tui-app-nav-left">
              <a className="tui-app-nav-logo" href={linkSet.home.url}>
                <Logo brand={brand || user.brand} />
              </a>
              {EnrollmentView}
              <ul className="tui-app-nav-main">
                {linkSet.main.map(link => (
                  <li key={_.uniqueId('link_')}>
                    <NavLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="tui-app-nav-right">
              <ConciergeToggle onClick={this._toggleConcierge} />
              {this._shouldInitNotifications() && <Notifications />}
              <DesktopMenuToggle onClick={this._toggleMenu} config={config} />
              <MobileMenuToggle
                isOpen={isMenuVisible}
                onClick={this._toggleMenu}
              />
            </div>
          </div>
          <MenuList
            linkSet={linkSet}
            onMouseEnter={this._handleMouseEnter}
            EnrollmentView={EnrollmentView}
          />
          <ConciergeModal />
        </nav>
      </div>
    );
  }
}

AppBar.propTypes = {
  brand: PropTypes.string,
  config: PropTypes.object.isRequired,
  EnrollmentView: PropTypes.object,
  user: PropTypes.object
};

AppBar.defaultProps = {
  brand: null,
  EnrollmentView: null
};

AppBar.childContextTypes = {
  user: PropTypes.object.isRequired
};

module.exports = AppBar;
