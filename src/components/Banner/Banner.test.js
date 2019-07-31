// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Banner from './Banner';
import { useStaticQuery, StaticQuery } from 'gatsby';
import siteMetadata from '../../../jest/__fixtures__/site-metadata';

describe('Banner', () => {
  beforeEach(() => {
    StaticQuery.mockImplementationOnce(
      ({ render }: RenderCallback) => (
        render(siteMetadata)
      ),
      useStaticQuery.mockReturnValue(siteMetadata)
    );
  });

  it('renders correctly', () => {
    const props = {
      banner: {
        path: '/media/sample.jpg',
        caption: 'test',
        link: "https://testing.com/path"
      },
      created: '2019-05-01',
    };

    const tree = renderer.create(<Banner {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
