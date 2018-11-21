import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Avatar extends React.Component {
  getImageUrl() {
    const { contactId, email, imageUrl } = this.props;
    const config = this.props.config || __env.config;

    if (imageUrl) return imageUrl;

    if (contactId)
      return `${config.api.url}/api/contacts/${contactId}/image_url`;

    return `${config.api.url}/api/hupers/${email}/avatar`;
  }

  render() {
    // Pull config, contactId and email out of props so they're not passed
    // to the image tag (throws a warning)
    const { className, config, contactId, email, size, ...props } = this.props;

    return (
      <img
        className={cx('user-avatar', className)}
        style={{ width: `${size}px`, height: `${size}px` }}
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
  config: null,
  email: '',
  size: 48,
};

module.exports = Avatar;
