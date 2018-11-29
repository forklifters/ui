const _ = require('lodash');
const DESIGN_SYSTEM_FLAG = 'design-system';

const getHomeConfig = (config, user) => {
  const hasDesignSystem = user.access.indexOf(DESIGN_SYSTEM_FLAG) > -1;
  if (!hasDesignSystem) {
    return config.dashboard;
  }

  const brand = user.brand;
  return _.find(_.values(config), { brand }) || config.dashboard;
};

const getLinkSet = (config, user) => {
  config = global.__env ? global.__env.config : config;
  user = global.__env ? global.__env.user : user;

  if (config) {
    config = _.mapValues(config, (link, key) => _.assign({}, link));
  }

  let main = [];
  let menu = [];

  // Shared
  let home = { displayName: 'Overview' };
  _.defaults(home, getHomeConfig(config, user));
  main.push(home);
  main.push(config.qaSessions);

  // Admin, mentor only
  if (/admin|mentor/.test(user.role)) {
    menu.push({
      displayName: 'Available Students',
      host: config.lark.host,
      url: config.lark.url + '/available-students/',
    });
  }

  // TF-brand students only
  if (user.brand === 'thinkful') {
    menu.push(config.refer);
  }

  menu.push(config.slack[user.brand]);
  menu.push(config.settings);
  menu.push(config.support[user.brand]);
  menu.push(config.signOut);

  main = _.compact(main);
  menu = _.compact(menu);

  try {
    let url = location.toString();
    let domain = location.hostname
      .split('.')
      .slice(-2)
      .join('.');
    [].concat(main, menu).forEach(function(item) {
      item.active = new RegExp(item.url, 'gi').test(url);
      item.external = !new RegExp(domain, 'gi').test(item.url);
    });
  } catch (e) {}

  return {
    home,
    main,
    menu,
  };
};

module.exports = {
  getLinkSet,
};
