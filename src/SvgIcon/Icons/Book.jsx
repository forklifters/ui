import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import { darkBlue } from '../../styleguide';

const WIDTH_MULTIPLIER = 17 / 22;

const Book = ({ color, size, ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={WIDTH_MULTIPLIER * size}
    height={size}
    viewBox="0 0 17 22"
  >
    <g fill={color} fillRule="nonzero">
      <path d="M.895 19.684c-.537 0-.895-.358-.895-.895V2.774C0 1.253 1.253 0 2.684 0h12.527c.536 0 .894.358.894.895V16.91c0 .536-.358.894-.894.894-.537 0-.895-.358-.895-.894V1.789H2.684c-.447 0-.895.448-.895.985v16.015c0 .448-.447.895-.894.895z" />
      <path d="M4.742 17.805c-.537 0-.895-.358-.895-.894V.895c0-.537.358-.895.895-.895s.895.358.895.895V16.91c0 .536-.358.894-.895.894z" />
      <path d="M15.21 21.474H2.685C1.164 21.474 0 20.22 0 18.789c0-1.52 1.253-2.773 2.684-2.773h12.527c.357 0 .715.179.805.537.179.358.09.715-.18.984-.089.09-.804 1.074.09 2.595a.813.813 0 0 1 0 .894c-.09.269-.358.448-.715.448zM2.685 17.805c-.537 0-.895.448-.895.984 0 .537.448.895.895.895h11.184c-.179-.716-.179-1.342 0-1.879H2.684zM10.558 5.726H8.053c-.537 0-.895-.358-.895-.894 0-.537.358-.895.895-.895h2.505c.537 0 .895.358.895.895a.897.897 0 0 1-.895.894zM12.705 9.574h-5.01c-.537 0-.895-.358-.895-.895s.358-.895.895-.895h5.01c.537 0 .895.358.895.895a.897.897 0 0 1-.895.895z" />
    </g>
  </svg>
);

Book.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number.isRequired,
};

Book.defaultProps = {
  color: darkBlue,
};

export default Book;
