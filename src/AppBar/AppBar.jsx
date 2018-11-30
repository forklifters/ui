import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import moment from 'moment-timezone';

import DesktopMenuToggle from './DesktopMenuToggle';
import Icon from '../Icon';
import Gravatar from '../Gravatar';
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
    const { user, config } = this.props;
    const { isMenuVisible, linkSet } = this.state;

    if (!user) {
      return <UnauthedAppBar config={config} />;
    }

    return (
      <div className="tui-app-nav-container">
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
              <DesktopMenuToggle onClick={this._toggleMenu} />
              <MobileMenuToggle
                isOpen={isMenuVisible}
                onClick={this._toggleMenu}
              />
              <Gravatar
                className="tui-app-nav-gravatar"
                email=""
                src={`${config.api.url}/api/hupers/me/avatar`}
                size={120}
              />
            </div>
          </div>
          <MenuList linkSet={linkSet} onMouseEnter={this._handleMouseEnter} />
        </nav>
      </div>
    );
  }
}

AppBar.propTypes = {
  user: PropTypes.object,
  config: PropTypes.object.isRequired,
};

AppBar.childContextTypes = {
  user: PropTypes.object.isRequired,
};

module.exports = AppBar;
