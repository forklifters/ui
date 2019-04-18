const _ = require('lodash');
const DESIGN_SYSTEM_FLAG = 'design-system';

const getHomeConfig = (config, user) => {
  const hasDesignSystem = user.access.indexOf(DESIGN_SYSTEM_FLAG) > -1;
  if (!hasDesignSystem) {
    return config.dashboard;
  }

  return config.platform;
};

const getLinkSet = (config, user) => {
  config = global.__env ? global.__env.config : config;
  user = global.__env ? global.__env.user : user;

  if (config) {
    config = _.mapValues(config, (link, key) => _.assign({}, link));
  }

  let main = [];
  let menu = [];

  const brandConfig = _.assign(
    {},
    config,
    config.brands ? config.brands[user.brand] : {},
  );

  // Shared
  let home = { displayName: 'Overview' };
  _.defaults(home, getHomeConfig(brandConfig, user));
  main.push(home);
  main.push(brandConfig.qaSessions);

  // Admin, mentor only
  if (/admin|mentor/.test(user.role)) {
    menu.push({
      displayName: 'Available Students',
      host: brandConfig.lark.host,
      url: `${brandConfig.lark.url}/available-students/`,
    });
  }

  // Mentor only
  if (user.role === 'mentor') {
    menu.push({
      displayName: 'Student Search',
      host: brandConfig.lark.host,
      url: `${brandConfig.lark.url}/student-search/`,
    });
  }

  menu.push(brandConfig.slack);
  menu.push(brandConfig.settings);
  menu.push(brandConfig.support);
  menu.push(brandConfig.signOut);

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
