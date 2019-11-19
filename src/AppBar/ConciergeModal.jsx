import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import ConciergeImage from './ConciergeImage';
import ConciergeOption from './ConciergeOption';
import SvgIcon from '../SvgIcon';

const BetaBadge = () => (
  <span className="tui-concierge-beta-badge">
    Beta
  </span>
);

const ConciergeModal = ({ toggleConcierge }) => (
  <Fragment>
  <div className="tui-concierge-curtain"
    onClick={toggleConcierge}
  />
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
        link="https://thinkful.slack.com"
      />

      <ConciergeOption
        title="Chat with an expert"
        subtitle="Talk with a live tutor now"
        background="#03533d"
        link="https://thinkful.slack.com"
      />

      <ConciergeOption
        title="Find a Q&amp;A Session"
        subtitle="Find a session related to what you're working on"
        background="#ff6b31"
        link="https://thinkful.com/open-sessions/qa-sessions"
      />
    </div>
  </div>
  </Fragment>
);

ConciergeModal.propTypes = {
  toggleConcierge: PropTypes.func.isRequired,
}

export default ConciergeModal;
