// @flow
import React from 'react';
import Helmet from 'react-helmet';
import {get} from 'lodash';
import type { Node as ReactNode } from 'react';
import { useSiteMetadata } from '../../hooks';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode,
  title: string,
  description?: string
};

const Layout = ({ children, title, description, info }: Props) => {
  const { title: siteTitle, url: siteUrl } = useSiteMetadata();

  const bannerPath = siteUrl + get(info, 'frontmatter.banner.path', '/media/hang-writing-blog-posts-at-geekmasher.jpg');
  const url = siteUrl + get(info, 'fields.slug', '/');


  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta property="og:site_name" content={siteTitle} />

        {/* Facebook */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={bannerPath} />
        <meta property="og:url" content={url} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={bannerPath} />
      </Helmet>
      {children}
    </div>
  );
};

export default Layout;
