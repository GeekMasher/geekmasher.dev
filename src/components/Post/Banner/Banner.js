// @flow
import React from 'react';
import moment from 'moment';
import styles from './Banner.module.scss';
import Meta from '../Meta';

type Props = {
  path: string,
  caption: string,
  created: string,
  updated: string
};

const Banner = ({ path, caption, created, updated }: Props) => (
  <div className={styles['banner']}>
    <img src={path} alt={caption} />
    <p className={styles['banner__caption']}>
      <i>{caption}</i>
    </p>
    <Meta publishDate={created} lastUpdated={updated} />
  </div>
);

export default Banner;
