import React from 'react';
import renderer from 'react-test-renderer';
import { Button, ListItem, Header } from 'react-native-elements';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DragableFlatList from 'react-native-draggable-flatlist';

import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('App Tests ', function () {
  it('App Renders', () => {
    const tree = renderer.create(
      <App />
    ).toJSON();
    console.log("tree", tree)
    expect(tree).toMatchSnapshot();
  });
  it('Disbale dragging', () => {
    const app = shallow(<App />);
    const dragHandles = app.find(DragableFlatList)
    expect(dragHandles).toHaveLength(0);
  });
  it('Enable dragging', () => {
    const app = shallow(<App />);
    app.instance().toggleEdit();
    const dragHandles = app.find(DragableFlatList)
    expect(dragHandles).toHaveLength(1);
  });
});
