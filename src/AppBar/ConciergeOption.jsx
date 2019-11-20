import React from 'react';
import PropTypes from 'prop-types';
import { black } from '../styleguide';

const ConciergeOption = ({ title, subtitle, link, background }) => (
  <a href={link}>
    <div
      className="tui-concierge-option"
      style={{
        background,
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
  background: black,
};

export default ConciergeOption;
