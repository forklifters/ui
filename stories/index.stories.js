import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

// Import the styles
import 'tfstyleguide/core.less';
import '../less/main.less';

import AppBar from '../lib/AppBar';
import AvailabilityGrid from '../lib/AvailabilityGrid';
import Avatar from '../lib/Avatar';
import AvatarUploader from '../lib/AvatarUploader';
import DatePicker from '../lib/DatePicker';
import Footer from '../lib/Footer';
import Icon from '../lib/Icon';
import Loader from '../lib/Loader';
import Modal from '../lib/Modal';
import SocialShare from '../lib/SocialShare';
import SvgIcon from '../lib/SvgIcon';
import Tag from '../lib/Tag';
import TopicPicker from '../lib/TopicPicker';

// This is required as storybook is inside an iframe
import env from './env';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Headers', module)
  .add('h1', () => <h1>This is an h1</h1>)
  .add('h2', () => <h2>This is an h2</h2>)
  .add('h3', () => <h3>This is an h3</h3>)
  .add('h4', () => <h4>This is an h4</h4>)
  .add('h5', () => <h5>This is an h5</h5>)
  .add('h6', () => <h6>This is an h6</h6>);

storiesOf('AppBar', module)
  .add('Logged out', () => <AppBar config={env.config} />)
  .add('Logged in', () => <AppBar config={env.config} user={env.user} />);

storiesOf('AvailabilityGrid', module)
  .add('Basic', () => (
    <AvailabilityGrid slotsHour={1} minHour={8} maxHour={23} />
  ))
  .add('Disabled', () => (
    <AvailabilityGrid slotsHour={1} minHour={8} maxHour={23} disabled />
  ));

storiesOf('Avatar', module).add('Basic', () => (
  <Avatar email="kara@thinkful.com" config={env.config} />
));

storiesOf('AvatarUploader', module).add('Basic', () => (
  <AvatarUploader imageUrl="http://www.gravatar.com/avatar/0?s=100&d=retro" />
));

storiesOf('DatePicker', module).add('Basic', () => <DatePicker />);

storiesOf('Footer', module).add('Basic', () => (
  <Footer config={env.config} user={{ timezone: 'US/Hawaii' }} />
));

storiesOf('Icon', module).add('Navigate right', () => (
  <Icon name="navigateright" />
));

storiesOf('SvgIcon', module).add('Book', () => (
  <SvgIcon size={60} name="book" />
));

storiesOf('Loader', module).add('Basic', () => <Loader />);

storiesOf('Modal', module).add('Basic', () => (
  <Modal onClose={() => {}}>
    <h2>Hello, world</h2>
  </Modal>
));

storiesOf('SocialShare', module).add('Twitter', () => (
  <SocialShare type="twitter">
    <Icon name="twitter" />
  </SocialShare>
));

storiesOf('Tag', module)
  .add('Basic', () => <Tag displayName="Test" />)
  .add('With class', () => (
    <Tag displayName="With a class" className="some-class" />
  ))
  .add('With link', () => (
    <Tag displayName="Thinkful.com" url="https://www.thinkful.com" />
  ));

storiesOf('TopicPicker', module).add('Basic', () => (
  <TopicPicker
    activeTopics={['pizza']}
    availableTopics={['ice cream', 'sushi']}
  />
));
