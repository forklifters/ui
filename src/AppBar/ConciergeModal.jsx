import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import ConciergeImage from './ConciergeImage';
import ConciergeOption from './ConciergeOption';
import SvgIcon from '../SvgIcon';

const BetaBadge = () => (
  <span className="tui-concierge-beta-badge">
    Beta
  </span>
);

const FILTER_CLASS = 'tui-app-nav-concierge-toggle';

/**
 * Component that alerts if you click outside of it
 * Credit to https://stackoverflow.com/questions/32553158/detect-click-outside-react-component/42234988#42234988
 */
class ConciergeModal extends React.Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.handleMouseup = this.handleMouseup.bind(this);
  }

  componentDidMount() {
    global.addEventListener('mouseup', this.handleMouseup);
  }

  componentWillUnmount() {
    global.removeEventListener('mouseup', this.handleMouseup);
  }

  handleMouseup(event) {
    const { visible, toggleConcierge } = this.props;
    const parentClassName = get(event, 'target.parentElement.className', '');
    const className = get(event, 'target.className', '');
    if (
      parentClassName instanceof SVGAnimatedString
      || className instanceof SVGAnimatedString
    ) {
      return; // ignore SVG paths so we don't get a TypeError
    }
    const eventComesFromOpenCloseButton =
      parentClassName.indexOf(FILTER_CLASS) >= 0
      || className.indexOf(FILTER_CLASS) >= 0;
    if (
      visible
      && this.wrapperRef.current
      && !this.wrapperRef.current.contains(event.target)
      && !eventComesFromOpenCloseButton
    ) {
      toggleConcierge();
    }
  }

  render() {
    const { slackUrl, toggleConcierge } = this.props;
    return (
      <div ref={this.wrapperRef}>
        <div className="tui-concierge-arrow" />
        <div className="tui-concierge-modal">
          <button
            className="button__link tui-concierge-close"
            onClick={toggleConcierge}
          >
            <SvgIcon name="close" size={12} />
          </button>

          <div className="tui-concierge-header">
            <div className="tui-concierge-header-image-container">
              <ConciergeImage />
            </div>
            <div>
              <h2>Thinkful Concierge <BetaBadge /></h2>
              <p>
                Immediate resources when you need them most.
              </p>
            </div>
          </div>

          <h3>Stuck? Let's get you some help.</h3>
          <div className="tui-concierge-options-container">
            <ConciergeOption
              title="Start a convo on Slack"
              subtitle="Pair with other students on the same topics"
              background="#1733ff"
              link={slackUrl || "https://thinkful.slack.com"}
            />

            <ConciergeOption
              title="Chat with an expert"
              subtitle="Get help from our tutors"
              background="#03533d"
              link={slackUrl || "https://thinkful.slack.com"}
            />

            <ConciergeOption
              title="Find a Q&amp;A Session"
              subtitle="Find a session related to what you're working on"
              background="#ff6b31"
              link="https://thinkful.com/open-sessions/qa-sessions"
            />
          </div>
        </div>
      </div>
    );
  }
}

ConciergeModal.propTypes = {
  slackUrl: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  toggleConcierge: PropTypes.func.isRequired,
}

export default ConciergeModal;
