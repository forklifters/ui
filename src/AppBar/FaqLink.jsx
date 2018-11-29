const cx = require('classnames');
const React = require('react');
const Icon = require('../Icon');
class FaqLink extends React.Component {
  constructor(props) {
    super(props);
    this.collapse = this.collapse.bind(this);
    this.expand = this.expand.bind(this);
    this.state = { visible: false };
  }
  collapse() {
    this.setState({ visible: false });
  }
  expand() {
    this.setState({ visible: true });
  }
  render() {
    const containerClasses = cx('tui-notification-list-container', {
      'tui-notification-list-container__visible': this.state.visible,
    });
    return (
      <div className="tui-notification-view tui-faq-link">
        <a
          href="//thinkful.com/support"
          className="tui-notification-toggle"
          onMouseEnter={this.expand}
          onMouseLeave={this.collapse}
        >
          <span>
            <Icon name="help" />
          </span>
        </a>
        <div className={containerClasses}>
          <ul className="tui-notification-list">
            <li className="tui-notification-item">
              <div className="tui-notification-content">
                <p className="tui-notification-message">
                  Have questions? Click to check out the FAQ.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
module.exports = FaqLink;
