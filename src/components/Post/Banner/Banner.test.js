// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Banner from './Banner';

describe('Banner', () => {
  it('renders correctly', () => {
    const props = {
        created: '2019-05-01',
        path: '/media/sample.jpg',
        caption: 'test'
    };

    const tree = renderer.create(<Banner {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
