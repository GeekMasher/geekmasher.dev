// @flow
import React from 'react';
import { get } from 'lodash';
import styles from './Banner.module.scss';
import { useSiteMetadata } from '../../hooks';
import Meta from '../Meta';

type Props = {
  created: string,
  updated: string
};

const Banner = ({ banner, created, updated }: Props) => {

  const {banner: bannerConfig } = useSiteMetadata();

  const link = get(banner, 'link');
  var linkSite = link
  if (link === undefined){
    linkSite = link.indexOf("//") > -1 ? link.split('/')[2] : link.split('/')[0];
  }

  return (
    <div className={styles['banner']}>
      <img src={get(banner, 'path')} alt={get(banner, 'caption')} />
      { link !== undefined && bannerConfig.copyright &&
      <p className={styles['banner__caption']}>
        <i>
          <a href={link} target="_blank" rel="noopener noreferrer">
          &copy; {linkSite}
          </a>
        </i>
      </p>
      }
      <Meta created={created} updated={updated} />
    </div>
  );
};

export default Banner;
