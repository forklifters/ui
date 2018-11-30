const AppBar = require('./AppBar');
const AvailabilityGrid = require('./AvailabilityGrid');
const Avatar = require('./Avatar');
const AvatarUploader = require('./AvatarUploader');
const DatePicker = require('./DatePicker');
const Footer = require('./Footer');
const Gravatar = require('./Gravatar');
const Icon = require('./Icon');
const Loader = require('./Loader');
const Modal = require('./Modal');
const NotificationView = require('./NotificationView');
const OneClickCopy = require('./OneClickCopy');
const SocialShare = require('./SocialShare');
const Tag = require('./Tag');
const TopicPicker = require('./TopicPicker');
const TrackedLink = require('./TrackedLink');

const styleguide = require('./styleguide');
const { pathWithSlug, pathWithoutSlug } = require('./ProxyPathUtils');

module.exports = {
  AppBar,
  AvailabilityGrid,
  Avatar,
  AvatarUploader,
  DatePicker,
  Footer,
  Gravatar,
  Icon,
  Loader,
  Modal,
  NotificationView,
  OneClickCopy,
  pathWithSlug,
  pathWithoutSlug,
  sgVars: styleguide,
  SocialShare,
  Tag,
  TopicPicker,
  TrackedLink,
};
