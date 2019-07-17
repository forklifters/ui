import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';

const Footer = ({ className, config, hideTimezone, user, brand }) => {
  // Can't be set via defaultProps because of frontend testing and global.__env
  config = config || global.__env.config;
  const displayBrand = brand || user.brand || 'thinkful';
  const brandConfig = _.assign({}, config, config.brands[displayBrand]);

  const showTimezone = Boolean(!hideTimezone && user && user.timezone);

  return (
    <div className={cx('footer-container', className)}>
      <footer className="footer">
        {showTimezone && (
          <div className="timezone">
            All times are in {user.timezone}
            <a href={brandConfig.settings.url}>Change</a>
          </div>
        )}
        <div className="footer-links">
          <div className="footer-link">
            &copy; {moment().format('YYYY')} {brandConfig.name}, Inc.
          </div>
          <a className="footer-link" href={brandConfig.legal.termsOfService}>
            Terms of use
          </a>
          <a className="footer-link" href={brandConfig.legal.privacyPolicy}>
            Privacy Policy
          </a>
          <a className="footer-link" href={brandConfig.support.url}>
            Support
          </a>
          <a className="footer-link" href={brandConfig.legal.courseCatalog}>
            Course Catalog
          </a>
          {brandConfig.legal.responsibleDisclosure && (
            <a
              className="footer-link"
              href={brandConfig.legal.responsibleDisclosure}
            >
              Responsible Disclosure
            </a>
          )}
        </div>
      </footer>
    </div>
  );
};

Footer.propTypes = {
  brand: PropTypes.string,
  className: PropTypes.string,
  config: PropTypes.shape({
    brands: PropTypes.object,
    settings: PropTypes.object,
  }),
  hideTimezone: PropTypes.bool,
  user: PropTypes.shape({
    timezone: PropTypes.string,
  }),
};

Footer.defaultProps = {
  brand: null,
  className: null,
  config: null,
  hideTimezone: false,
  user: {},
};

module.exports = Footer;
