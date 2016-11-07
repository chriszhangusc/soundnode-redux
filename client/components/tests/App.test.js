import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import App from '../App';

// Note the usage of function instead of callback function.
// https://mochajs.org/#arrow-functions
describe('<App />', function () {
  it('should not be any issue', function () {
    expect(true).to.equal(true);
  });

  // it('should render <App /> component', () => {
  //   const wrapper = shallow(<App />);
  //   console.log(wrapper);
  // });
});
