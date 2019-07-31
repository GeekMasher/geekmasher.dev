// @flow
import React from 'react';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import Banner from '../components/Banner';
import Title from '../components/Title';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const PageTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { html: pageBody } = data.markdownRemark;
  const { title, description, updated } = data.markdownRemark.frontmatter;
  const banner = get(data.markdownRemark.frontmatter, 'banner');
  const metaDescription = description !== null ? description : siteSubtitle;

  return (
    <Layout title={`${title} - ${siteTitle}`} description={metaDescription} info={data.markdownRemark}>
      <Sidebar />
      <Page>
        {banner !== undefined &&
          <Banner banner={banner} updated={updated} />
        }
        <Title title={title} />
        <div dangerouslySetInnerHTML={{ __html: pageBody }} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        created
        description
        banner {
          path
          caption
          link
        }
      }
    }
  }
`;

export default PageTemplate;
