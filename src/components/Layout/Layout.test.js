// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { useStaticQuery, StaticQuery } from 'gatsby';
import Layout from './Layout';
import siteMetadata from '../../../jest/__fixtures__/site-metadata';
import type { RenderCallback } from '../../types';

describe('Layout', () => {
  beforeEach(() => {
    StaticQuery.mockImplementationOnce(
      ({ render }: RenderCallback) => (
        render(siteMetadata)
      ),
      useStaticQuery.mockReturnValue(siteMetadata)
    );
  });

  const props = {
    children: 'test',
    description: 'test',
    title: 'test',
    info: {
      frontmatter: {
        created: '2019-05-01',
        tags: [
          'test_0',
          'test_1'
        ],
        title: 'test',
        banner: {
          path: '/media/test.jpg',
          caption: 'test'
        }
      }
    }
  };

  it('renders correctly', () => {
    const tree = renderer.create(<Layout {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
