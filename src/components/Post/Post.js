// @flow
import React from 'react';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Tags from './Tags';
import Banner from './Banner';
import Title from './Title';
import styles from './Post.module.scss';
import type { Node } from '../../types';

type Props = {
  post: Node
};

const Post = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, created, updated, banner } = post.frontmatter;
  const { path, caption } = banner;

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">All Articles</Link>

      <div className={styles['post__content']}>
        <Banner path={path} caption={caption} created={created} updated={updated} />
        <Title title={title} />
        <Content body={html} title={title} />
      </div>

      <hr />
      <div className={styles['post__footer']}>
        <Author />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
