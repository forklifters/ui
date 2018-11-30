import _ from 'lodash';

import sgColorsLess from 'tfstyleguide/colors.less';
import sgVarsLess from 'tfstyleguide/vars.less';
import lessToJs from './lessVarsToJs';

module.exports = _.assign(
  {},
  lessToJs(sgVarsLess, {
    resolveVariables: true,
    stripPrefix: true,
  }),
  lessToJs(sgColorsLess, {
    resolveVariables: true,
    stripPrefix: true,
  }),
);
