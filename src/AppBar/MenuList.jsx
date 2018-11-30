import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import NavLink from './NavLink';

const MenuList = ({ linkSet, onMouseEnter }) => (
  <ul onMouseEnter={onMouseEnter} className="app-nav-list">
    {linkSet.main.map(link => (
      <li className="nav-li__mobile-only" key={_.uniqueId('link_')}>
        <NavLink {...link} />
      </li>
    ))}
    <div className="app-nav-list-sub">
      {linkSet.menu.map(link => (
        <li key={_.uniqueId('link_')}>
          <NavLink className="app-nav-link__in-menu" {...link} />
        </li>
      ))}
    </div>
  </ul>
);

MenuList.propTypes = {
  linkSet: PropTypes.shape({ main: PropTypes.object, menu: PropTypes.object })
    .isRequired,
  onMouseEnter: PropTypes.func.isRequired,
};

module.exports = MenuList;
