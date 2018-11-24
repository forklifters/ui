import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import moment from 'moment';

const Footer = ({ config, user }) => {
  // Can't be set via defaultProps because of frontend testing and global.__env
  config = config || global.__env.config;

  return (
    <div className="footer-container">
      <footer className="footer">
        {user &&
          user.timezone && (
            <div className="timezone">
              All times are in {user.timezone}
              <a href={config.settings.url}>Change</a>
            </div>
          )}
        <div className="footer-links">
          <div className="footer-link">
            &copy; {moment().format('YYYY')} Thinkful, Inc.
          </div>
          <a
            className="footer-link"
            href={`${config.www.url}/terms-of-service/`}
          >
            Terms of use
          </a>
          <a className="footer-link" href={`${config.www.url}/privacy-policy/`}>
            Privacy Policy
          </a>
          <a className="footer-link" href={`${config.www.url}/support/`}>
            Support
          </a>
          <a
            className="footer-link"
            href={`${config.www.url}/responsible-disclosure/`}
          >
            Responsible Disclosure
          </a>
        </div>
      </footer>
    </div>
  );
};

Footer.propTypes = {
  config: PropTypes.object,
  user: PropTypes.object,
};

Footer.defaultProps = {
  user: {},
};

module.exports = Footer;
