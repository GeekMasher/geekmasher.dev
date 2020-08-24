// @flow
import React from 'react';
import { get } from 'lodash';
import styles from './Banner.module.scss';
import Meta from '../Meta';

type Props = {
  created: string,
  updated: string
};

const Banner = ({ banner, created, updated }: Props) => {

  const link = get(banner, 'link');
  const caption = get(banner, 'caption');

  return (
    <div className={styles['banner']}>
      <img src={get(banner, 'path')} alt={get(banner, 'caption')} />
      { link !== undefined && caption !== undefined &&
      <p className={styles['banner__caption']}>
        <i>
          <a href={link} target="_blank" rel="noopener noreferrer">
          &copy; {caption}
          </a>
        </i>
      </p>
      }
      <Meta created={created} updated={updated} />
    </div>
  );
};

export default Banner;
