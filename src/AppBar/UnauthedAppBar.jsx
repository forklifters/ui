import PropTypes from 'prop-types';
import React from 'react';

import Logo from '../Logo';
import NavLink from './NavLink';

const UnauthedAppBar = ({ config }) => {
  return (
    <div className="tui-app-nav-container">
      <nav className="tui-app-nav" key="main-navigation" rel="main-navigation">
        <div className="nav-bar-container">
          <div className="tui-app-nav-left">
            <a className="tui-app-nav-logo" href={config.www.url}>
              <Logo brand="thinkful" />
            </a>
          </div>
          <div className="tui-app-nav-right">
            <ul className="tui-app-nav-main">
              <li>
                <NavLink url={config.accounts.url} displayName="Sign in" />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

UnauthedAppBar.propTypes = {
  config: PropTypes.shape({
    accounts: PropTypes.object,
    www: PropTypes.object,
  }).isRequired,
};

export default UnauthedAppBar;
