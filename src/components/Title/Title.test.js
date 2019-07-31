// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Title from './Title';

describe('Title', () => {
  it('renders correctly', () => {
    const props = {
        title: 'test'
    };

    const tree = renderer.create(<Title {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
