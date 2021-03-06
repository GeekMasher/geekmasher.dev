// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import Meta from './Meta';

describe('Meta', () => {
  it('renders correctly', () => {
    const props = {
      created: '2019-05-01',
      updated: '2019-06-01'
    };

    const tree = renderer.create(<Meta {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
