import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Use const for default URL instead of default props so we can always prioritize
// a passed imageUrl prop below
const DEFAULT_URL =
  'https://tf-assets-prod.s3.amazonaws.com/shoebill/assets/images/logos/thinkful-logo-t-black.svg';

class Avatar extends React.Component {
  getImageUrl() {
    const { config, contactId, email, imageUrl } = this.props;

    if (imageUrl) return imageUrl;

    if (contactId)
      return `${config.api.url}/api/contacts/${contactId}/image_url`;

    if (email) return `${config.api.url}/api/hupers/${email}/avatar`;

    return DEFAULT_URL;
  }

  render() {
    // Pull config, contactId and email out of props so they're not passed
    // to the image tag (throws a warning)
    const { className, config, contactId, email, size, ...props } = this.props;

    return (
      <img
        className={cx('user-avatar', className)}
        style={{ borderRadius: '2px', width: `${size}px`, height: `${size}px` }}
        src={this.getImageUrl()}
        {...props}
      />
    );
  }
}

Avatar.propTypes = {
  config: PropTypes.shape({
    api: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  contactId: PropTypes.number,
  email: PropTypes.string,
  imageUrl: PropTypes.string,
  size: PropTypes.number,
};

Avatar.defaultProps = {
  config: global.__env,
  email: '',
  imageUrl: null,
  size: 48,
};

module.exports = Avatar;
