import PropTypes from 'prop-types';
import React from 'react';

import BlocLogo from './BlocLogo';
import TFLogo from './TFLogo';

const Logo = ({ brand, ...props }) =>
  brand === 'bloc' ? <BlocLogo {...props} /> : <TFLogo {...props} />;

Logo.propTypes = {
  brand: PropTypes.string,
};

Logo.defaultProps = {
  brand: null,
};

module.exports = Logo;
