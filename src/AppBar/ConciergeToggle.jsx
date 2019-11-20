import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import SvgIcon from '../SvgIcon';

import { black, gray75 } from '../styleguide';

const ConciergeToggle = ({ conciergeVisible, onClick }) => (
  <a
    className={
      cx("tui-app-nav-concierge-toggle", {
        'concierge-visible': conciergeVisible,
      })
    }
    onClick={onClick}
    href="javascript:void(0)"
    aria-label="Toggle concierge"
  >
    <SvgIcon
      className="tui-app-nav-concierge-icon-bell"
      name="concierge"
      size={18}
      color={conciergeVisible ? black : gray75}
    />
    <SvgIcon
      className="tui-app-nav-concierge-icon-close"
      name="close"
      size={18}
      color={black}
    />
  </a>
);

ConciergeToggle.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ConciergeToggle;
