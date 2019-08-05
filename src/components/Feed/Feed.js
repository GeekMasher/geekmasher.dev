// @flow
import React from 'react';
import moment from 'moment';
import { get } from 'lodash';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

const Feed = ({ edges }: Props) => {


  return (
    <div className={styles['feed']}>
      {edges.map((edge) => (
        <div className={styles['feed__item']} key={edge.node.fields.slug}>
          <div className={styles['feed__item-meta']}>
            <time className={styles['feed__item-meta-time']} dateTime={moment(edge.node.frontmatter.created).format('MMMM D, YYYY')}>
              {moment(edge.node.frontmatter.created).format('MMMM YYYY')}
            </time>
            <span className={styles['feed__item-meta-divider']} />
            <span className={styles['feed__item-meta-category']}>
              <Link to={edge.node.fields.categorySlug} className={styles['feed__item-meta-category-link']}>{edge.node.frontmatter.category}</Link>
            </span>
          </div>
          <h2 className={styles['feed__item-title']}>
            <Link className={styles['feed__item-title-link']} to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
          </h2>

          {get(edge.node.frontmatter, 'banner') !== undefined &&
          <Link to={edge.node.fields.slug}>
            <img
                src={edge.node.frontmatter.banner.path}
                alt={edge.node.frontmatter.banner.caption}
                className={styles['feed__item-img']}
              />
          </Link>
          }
          <p className={styles['feed__item-description']}>
            {edge.node.frontmatter.description}
            {`... `}
            <Link className={styles['feed__item-readmore']} to={edge.node.fields.slug}>Read More</Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
