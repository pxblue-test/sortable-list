import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, {shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {SortableList} from './App';

Enzyme.configure({adapter: new Adapter()});

// it('renders without crashing', () => {
//  const div = document.createElement('div');
//  ReactDOM.render(<App/>, div);
//  ReactDOM.unmountComponentAtNode(div);
// });

it('reorders the list correctly', () => {
  const app = shallow(<App/>);
  let oldList = app.state().list;
  app.instance().onSortEnd({oldIndex: 0, newIndex: oldList.length - 1 });
  let newList = app.state().list;
  let first = oldList.shift();
  oldList.push(first);
  expect(newList).toEqual(oldList);
});

it('toggles edit mode correctly', () => {
  const app = shallow(<App/>);
  expect(app.find(SortableList).length).toEqual(0);
  app.instance().setState({sortable: true});
  expect(app.find(SortableList).length).toBeGreaterThan(0);
});