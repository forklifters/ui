const cx = require('classnames');
const PropTypes = require('prop-types');
const React = require('react');
const TFAnalytics = require('@thinkful/tf-analytics');
const NotificationItem = require('./NotificationItem');
const SvgIcon = require('../SvgIcon');

const NoNotifications = () => (
  <ul className="tui-app-notification-list">
    <li className="tui-app-notification-item">
      <div className="tui-app-notification-content">
        <p className="tui-app-notification-message">
          No new notifications. When you receive any, they'll show up here.
        </p>
      </div>
    </li>
  </ul>
);

const NotificationItemList = ({
  notifications,
  onItemClick,
  onItemDismiss
}) => (
  <ul className="tui-app-notification-list">
    {notifications.map((notification, idx) => (
      <NotificationItem
        key={idx}
        onClick={onItemClick}
        onDismiss={onItemDismiss}
        {...notification}
      />
    ))}
  </ul>
);

NotificationItemList.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
  onItemClick: PropTypes.func,
  onItemDismiss: PropTypes.func
};

class NotificationView extends React.Component {
  constructor(props) {
    super(props);
    this.collapse = this.collapse.bind(this);
    this.expand = this.expand.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = { visible: false };
  }
  collapse() {
    this.setState({ visible: false });
  }
  expand() {
    this.props.handleSeen && this.props.handleSeen();
    this.setState({ visible: true });
  }
  toggle() {
    const { handleSeen, unreadCount } = this.props;
    const { visible } = this.state;
    if (unreadCount === 0) {
      return;
    }
    if (!visible) {
      TFAnalytics.track('clicked-notification-bell');
      handleSeen && handleSeen();
    }
    this.setState({ visible: !visible });
  }
  render() {
    const {
      handleItemClick,
      handleItemDismiss,
      notifications,
      unseenCount
    } = this.props;
    const containerClasses = cx('tui-app-notification-list-container', {
      'tui-app-notification-list-container__visible': this.state.visible
    });
    const countClasses = cx('tui-app-notification-count', {
      'tui-app-notification-count__unread': unseenCount > 0
    });
    const unreadNotifications = notifications.filter(notif => !notif.is_read);
    const hasNotifications = !_.isEmpty(unreadNotifications);
    return (
      <div>
        <a className="tui-app-notification-toggle" onClick={this.toggle}>
          <span className={countClasses}>
            <SvgIcon name="bell" size={17} />
          </span>
        </a>
        <div className={containerClasses}>
          {hasNotifications ? (
            <NotificationItemList
              notifications={unreadNotifications}
              onItemClick={handleItemClick}
              onItemDismiss={handleItemDismiss}
            />
          ) : (
            <NoNotifications />
          )}
        </div>
      </div>
    );
  }
}

NotificationView.propTypes = {
  handleItemClick: PropTypes.func,
  handleItemDismiss: PropTypes.func,
  handleSeen: PropTypes.func,
  notifications: PropTypes.arrayOf(PropTypes.object),
  unseenCount: PropTypes.number
};

module.exports = NotificationView;
