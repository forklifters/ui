import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import moment from 'moment-timezone';

import DesktopMenuToggle from './DesktopMenuToggle';
import Icon from '../Icon';
import Logo from '../Logo';
import MenuList from './MenuList';
import MobileMenuToggle from './MobileMenuToggle';
import NavLink from './NavLink';
import Notifications from './notifications/Notifications';
import UnauthedAppBar from './UnauthedAppBar';
import { getLinkSet } from './linkSet';

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this._toggleMenu = this._toggleMenu.bind(this);
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);

    this.state = {
      isMenuVisible: false,
      linkSet: props.user ? getLinkSet(props.config, props.user) : null,
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
    const { className, config, EnrollmentView, user } = this.props;
    const { isMenuVisible, linkSet } = this.state;

    if (!user) {
      return <UnauthedAppBar config={config} />;
    }

    return (
      <div className={cx('tui-app-nav-container', className)}>
        <nav
          onMouseLeave={this._handleMouseLeave}
          className={cx('tui-app-nav', {
            'tui-app-nav__visible': isMenuVisible,
          })}
          key="main-navigation"
          rel="main-navigation"
        >
          <div className="nav-bar-container">
            <div className="tui-app-nav-left">
              <a className="tui-app-nav-logo" href={linkSet.home.url}>
                <Logo brand={user.brand} />
              </a>
              {EnrollmentView && <EnrollmentView />}
              <ul className="tui-app-nav-main">
                {linkSet.main.map(link => (
                  <li key={_.uniqueId('link_')}>
                    <NavLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="tui-app-nav-right">
              {user.access.indexOf('design-system') === -1 && <Notifications />}
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
        </nav>
      </div>
    );
  }
}

AppBar.propTypes = {
  config: PropTypes.object.isRequired,
  EnrollmentView: PropTypes.func,
  user: PropTypes.object,
};

AppBar.defaultProps = {
  EnrollmentView: null,
};

AppBar.childContextTypes = {
  user: PropTypes.object.isRequired,
};

module.exports = AppBar;
