import React from 'react';
import PropTypes from 'prop-types';

const ConciergeOption = ({ title, subtitle, link, background }) => (
  <a href={link}>
    <div
      className="tui-concierge-option"
      style={{
        background: background,
      }}
    >
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
  </a>
);

ConciergeOption.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  background: PropTypes.string,
}

ConciergeOption.defaultProps = {
  background: '#000',
};

const ConciergeModal = () => (
  <div className="tui-concierge-modal">
    <h2>Thinkful Concierge</h2>
    <p>
      Immediate resources when you need them most.
    </p>
    <h3>Stuck? Let's get you some help.</h3>

    <ConciergeOption
      title="Start a convo on Slack"
      subtitle="Pair with other students on the same topics"
      background="#1733ff"
      link="https://thinkful.com"
    />

    <ConciergeOption
      title="Chat with an expert"
      subtitle="Talk with a live tutor now"
      background="#03533d"
      link="https://thinkful.com"
    />

    <ConciergeOption
      title="Find a Q&amp;A Session"
      subtitle="Find a session related to what you're working on"
      background="#ff6b31"
      link="https://thinkful.com"
    />
  </div>
);

export default ConciergeModal;