import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Cookies from 'universal-cookie';
import cx from 'classnames';

import ConciergeModal from './ConciergeModal';
import ConciergeToggle from './ConciergeToggle';
import ConciergeTooltip from './ConciergeTooltip';
import DesktopMenuToggle from './DesktopMenuToggle';
import Logo from '../Logo';
import MenuList from './MenuList';
import MobileMenuToggle from './MobileMenuToggle';
import NavLink from './NavLink';
import Notifications from './notifications/Notifications';
import UnauthedAppBar from './UnauthedAppBar';
import { getCurrentEnrollment } from './currentEnrollment';
import { getLinkSet } from './linkSet';

const LEGACY_PLATFORM = 'legacy';
const CONCIERGE_FLAG = 'flexperiment-concierge';
const PREP_CONCIERGE_FLAG = 'prep-concierge';
const TOOLTIP_KEY_OLD = 'hasSeenConciergeTooltip';
const TOOLTIP_KEY = 'hasSeenConcierge';

class AppBar extends React.Component {
  constructor(props) {
    super(props);
    this._handleGetCurrentEnrollmentSucceeded = this._handleGetCurrentEnrollmentSucceeded.bind(
      this
    );
    this._handleGetCurrentEnrollmentFailed = this._handleGetCurrentEnrollmentFailed.bind(
      this
    );
    this._toggleMenu = this._toggleMenu.bind(this);
    this._toggleConcierge = this._toggleConcierge.bind(this);
    this._handleMouseEnter = this._handleMouseEnter.bind(this);
    this._handleMouseLeave = this._handleMouseLeave.bind(this);
    this._hasConciergeAccess = this._hasConciergeAccess.bind(this);
    this._shouldInitNotifications = this._shouldInitNotifications.bind(this);
    this._shouldShowTooltip = this._shouldShowTooltip.bind(this);
    this._setTooltipDismissed = this._setTooltipDismissed.bind(this);
    this.cookies = new Cookies();

    this.state = {
      isConciergeVisible: false,
      isConciergeTooltipVisible: true,
      isMenuVisible: false,
      isPrepUser: false,
      linkSet: props.user ? getLinkSet(props.config, props.user) : null,
      slackUrl: null,
    };
  }

  getChildContext() {
    return {
      user: this.props.user,
    };
  }

  componentDidMount() {
    const { config, user } = this.props;
    getCurrentEnrollment(
      config,
      user,
      this._handleGetCurrentEnrollmentSucceeded,
      this._handleGetCurrentEnrollmentFailed
    );
  }

  _handleGetCurrentEnrollmentSucceeded(res) {
    const slackUrl = _.get(
      res.body,
      'enrollment.course.slack_channel_web_url',
      null
    );
    const courseDeliveryFormatSlug = _.get(
      res.body,
      'enrollment.course.delivery_format.slug'
    );

    const isPrepUser = courseDeliveryFormatSlug === 'prep';
    this.setState({ isPrepUser, slackUrl });
  }

  _handleGetCurrentEnrollmentFailed(err) {
    console.warn(`getCurrentEnrollment failed: ${err}`);
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
    if (this._shouldShowTooltip()) {
      this._setTooltipDismissed();
    }
    const newIsConciergeVisible = !isConciergeVisible;
    const newIsMenuVisible = newIsConciergeVisible ? false : isMenuVisible;
    this.setState({
      isConciergeVisible: newIsConciergeVisible,
      isMenuVisible: newIsMenuVisible,
      isConciergeTooltipVisible: false,
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

  _hasConciergeAccess(user) {
    const { isPrepUser } = this.state;
    return (
      _.includes(user.access, CONCIERGE_FLAG) ||
      (_.includes(user.access, PREP_CONCIERGE_FLAG) && isPrepUser)
    );
  }

  _shouldInitNotifications() {
    const { user } = this.props;

    return !/mentor|admin/.test(user.role) && user.platform === LEGACY_PLATFORM;
  }

  _setTooltipDismissed() {
    this.cookies.set(TOOLTIP_KEY, true, {
      domain: location.hostname == 't.ful' ? 't.ful' : '.thinkful.com',
      path: '/',
      expires: moment()
        .add(1, 'month')
        .toDate(),
    });
  }

  _shouldShowTooltip() {
    if (this.cookies.get(TOOLTIP_KEY_OLD)) {
      this.cookies.remove(TOOLTIP_KEY_OLD, { path: '/' });
      this._setTooltipDismissed();
    }
    return !this.cookies.get(TOOLTIP_KEY);
  }

  render() {
    const { brand, className, config, EnrollmentView, user } = this.props;
    const {
      isMenuVisible,
      isConciergeVisible,
      isConciergeTooltipVisible,
      isPrepUser,
      linkSet,
      slackUrl,
    } = this.state;

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
            'tui-app-nav__concierge-tooltip-visible': isConciergeTooltipVisible,
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
              {this._hasConciergeAccess(user) && (
                <ConciergeToggle
                  conciergeVisible={isConciergeVisible}
                  onClick={this._toggleConcierge}
                />
              )}
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
          {this._hasConciergeAccess(user) && (
            <Fragment>
              <ConciergeModal
                isPrepUser={isPrepUser}
                slackUrl={slackUrl}
                toggleConcierge={this._toggleConcierge}
                visible={isConciergeVisible}
              />
              {this._shouldShowTooltip() && (
                <ConciergeTooltip toggleConcierge={this._toggleConcierge} />
              )}
            </Fragment>
          )}
        </nav>
      </div>
    );
  }
}

AppBar.propTypes = {
  brand: PropTypes.string,
  config: PropTypes.object.isRequired,
  EnrollmentView: PropTypes.object,
  user: PropTypes.object,
};

AppBar.defaultProps = {
  brand: null,
  EnrollmentView: null,
};

AppBar.childContextTypes = {
  user: PropTypes.object.isRequired,
};

module.exports = AppBar;
