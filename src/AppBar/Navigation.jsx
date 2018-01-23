const cx = require('classnames');
const React = require('react');
const _ = require('lodash');
const moment = require('moment-timezone');
const uniqueId = require('lodash/utility/uniqueId');

// TUI Components
const Icon = require('../Icon');
const Gravatar = require('../Gravatar');
const LoggedOutNav = require('./LoggedOutNav');
const NavLink = require('./NavLink');
const Notifications = require('./notifications/Notifications');
const CourseLink = require('./CourseLink');
const linkSet = require('./linkSet');

const WhiteTLogo = require('./WhiteTLogo')


/**
 * AppNav
 * @property {} description
 */
class AppNav extends React.Component {
    static propTypes = {
        user: React.PropTypes.object,
        config: React.PropTypes.object.isRequired
    }

    static childContextTypes = {
      user: React.PropTypes.object.isRequired,
    };

    getChildContext() {
      return {
        user: this.props.user,
      }
    }

    constructor(props) {
        super(props);
        this.state = {
            isMenuVisible: false,
            isCourseDropdownVisible: false
        };

        this._toggleMenu = this._toggleMenu.bind(this);
        this._toggleCourseDropdown = this._toggleCourseDropdown.bind(this);
        this._handleMouseEnter = this._handleMouseEnter.bind(this);
        this._handleMouseLeave = this._handleMouseLeave.bind(this);
    }

    _toggleMenu() {
        this.setState({
            isMenuVisible: ! this.state.isMenuVisible
        });
    }

    _toggleCourseDropdown() {
        this.setState({
            isCourseDropdownVisible: ! this.state.isCourseDropdownVisible
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
          })
        }, 400);
    }

    renderAuthed(user, config) {
        const navClassName = cx(
            'app-nav', {'app-nav__visible': this.state.isMenuVisible});
        const navLinks = linkSet.main.filter(link => !link.search);

        return (
            <div className='app-nav-container'>
                <nav onMouseLeave={this._handleMouseLeave}
                     className={navClassName}
                     key="main-navigation"
                     rel="main-navigation">
                    <a href={linkSet.home.url}>
                      <div>
                        <WhiteTLogo />
                      </div>
                    </a>
                    <ul className="app-nav-main">
                        {navLinks.map(
                            (link) => <li key={uniqueId('link_')}>
                                <NavLink {...link} /></li>)}
                    </ul>
                    <ul onMouseEnter={this._handleMouseEnter}
                        className="app-nav-list">
                        {navLinks.map(
                            (link) => <li key={uniqueId('link_')}>
                                <NavLink
                                    className="app-nav-link__mobile-only"
                                    {...link} /></li>)}
                        {linkSet.menu.map(
                            (link) => <li key={uniqueId('link_')}>
                                <NavLink
                                    className="app-nav-link__in-menu"
                                    {...link}/></li>)}
                    </ul>
                    <Notifications />
                    <a className="app-nav-link app-nav-link__toggle" onClick={this._toggleMenu}>
                        <span alt="Menu" className="app-nav-burger"></span>
                        <Gravatar
                            className="app-nav-gravatar"
                            email=""
                            src={`${config.api.url}/api/hupers/me/avatar`}
                            size={120}/>
                    </a>
                </nav>
            </div>
        )
    }

    renderUnauthed(config) {
        const navClassName = cx(
            'app-nav', {'app-nav__visible': this.state.isMenuVisible});

        return <LoggedOutNav config={config} />
    }

    render() {
        const {user, config} = this.props;

        return user && user.tf_login && user.role !== 'guest' ?
            this.renderAuthed(user, config) : this.renderUnauthed(config);
    }
}

module.exports = AppNav;
