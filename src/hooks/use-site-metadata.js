// @flow
import { useStaticQuery, graphql } from 'gatsby';
import { get } from 'lodash';

const useSiteMetadata = () => {
  const meta = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            author {
              name
              bio
              photo
              contacts {
                twitter
                github
              }
            }
            menu {
              label
              path
            }
            url
            title
            subtitle
            copyright
          }
        }
      }
    `
  );

    console.log(meta);
  return get(meta, 'site.siteMetadata');
};

export default useSiteMetadata;
