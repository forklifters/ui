const cx = require('classnames');
const React = require('react');

const Icon = require('../Icon');

/**
 * NavLink
 * @property {} description
 */
class NavLink extends React.Component {
    static displayName = "NavLink";
    static propTypes = {
        active: React.PropTypes.bool,
        displayName: React.PropTypes.string,
        icon: React.PropTypes.string,
        url: React.PropTypes.string.isRequired
    }

    static contextTypes = {
        user: React.PropTypes.object
    }

    render() {
        const {
            active,
            className,
            disableInOnboarding,
            displayName,
            external,
            icon,
            url,
        } = this.props;

        const {user} = this.context;

        const disabled = (
            disableInOnboarding && user && user.onboarding_step &&
            user.access.indexOf('cp-onboarding') > -1);

        return (
            <a
                    className={cx(
                        className,
                        "app-nav-link",
                        {active, disabled})}
                    href={url}
                    target={external ? "_blank" : "_self"}>
                {icon &&
                    <Icon className="app-nav-icon" name={icon}/>
                }
                {displayName
                    && <span className="app-nav-text">{displayName}</span>
                }
            </a>
        )
    }
}

module.exports = NavLink
