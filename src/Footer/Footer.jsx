import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';

const Footer = ({ className, config, user, brand }) => {
  // Can't be set via defaultProps because of frontend testing and global.__env
  config = config || global.__env.config;
  const displayBrand = brand || user.brand || 'thinkful';
  const brandConfig = _.assign({}, config, config.brands[displayBrand] || {});

  return (
    <div className={cx('footer-container', className)}>
      <footer className="footer">
        {user &&
          user.timezone && (
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
  className: PropTypes.string,
  config: PropTypes.object,
  user: PropTypes.object,
};

Footer.defaultProps = {
  className: null,
  user: {},
};

module.exports = Footer;
