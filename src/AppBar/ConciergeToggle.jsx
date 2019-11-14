import PropTypes from 'prop-types';
import React from 'react';

import Gravatar from '../Gravatar';
import Icon from '../Icon';

const ConciergeToggle = ({ config, onClick }) => (
  <a
    className="tui-app-nav-arrow"
    onClick={onClick}
    href="javascript:void(0)"
    aria-label="Toggle navigation links"
  >
    🛎
  </a>
);

ConciergeToggle.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ConciergeToggle;
