// @flow
import React from 'react';
import { Disqus } from 'gatsby-plugin-disqus'
import { useSiteMetadata } from '../../../hooks';

type Props = {
  postTitle: string,
  postSlug: string
};

const Comments = ({ postTitle, postSlug }: Props) => {
  const { url, disqus_short_name } = useSiteMetadata();

  if(!disqus_short_name){
    return null;
  }

  return (
    <Disqus
      shortname={disqus_short_name}
      identifier={postTitle}
      title={postTitle}
      url={url + postSlug}
    />
  );
};

export default Comments;
