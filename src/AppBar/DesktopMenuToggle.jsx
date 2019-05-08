import PropTypes from 'prop-types';
import React from 'react';

import Gravatar from '../Gravatar';
import Icon from '../Icon';

const DesktopMenuToggle = ({ config, onClick }) => (
  <a className="tui-app-nav-arrow" onClick={onClick} href="javascript:void(0)">
    <Icon name="navigatedown" />
    <Gravatar
      className="tui-app-nav-gravatar"
      email=""
      src={`${config.api.url}/api/hupers/me/avatar`}
      size={120}
    />
  </a>
);

DesktopMenuToggle.propTypes = {
  config: PropTypes.shape({
    api: PropTypes.shape({
      url: PropTypes.string
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

module.exports = DesktopMenuToggle;
