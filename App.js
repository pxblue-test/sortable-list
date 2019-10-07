import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import * as Colors from '@pxblue/colors';
import { Header, ListItem, Button } from 'react-native-elements';
import DraggableFlatList from 'react-native-draggable-flatlist';

const data = [
  {
    name: 'George Washington',
    value: 1789,
  },
  {
    name: 'John Adams',
    value: 1796,
  },
  {
    name: 'Thomas Jefferson',
    value: 1800,
  },
  {
    name: 'James Madison',
    value: 1808,
  },
  {
    name: 'James Monore',
    value: 1812,
  },
];
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: data, sortable: false };
  }

  renderDragableItem = ({ item, index, move, moveEnd, isActive }) => (
    <TouchableOpacity onPressIn={move} onPressOut={moveEnd}>
      <ListItem
        title={item.name}
        rightTitle={`${item.value}`}
        contentContainerStyle={{height: 24}}
        leftIcon={{ name: 'drag-handle' }}
        containerStyle={isActive ? styles.dragging : {}}
      />
    </TouchableOpacity>
  );

  renderItem = ({ item }) => (
    <ListItem title={item.name} rightTitle={`${item.value}`} contentContainerStyle={{height: 24}} />
  );

  toggleEdit = () => {
    this.setState(prevState => ({
      sortable: !prevState.sortable,
    }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={Colors.blue[500]}
          centerComponent={{
            text: 'Sortable List',
            style: { color: Colors.white[50], fontSize: 16 },
          }}
          rightComponent={() => (
            <Button
              title={this.state.sortable ? 'Save' : 'Edit'}
              type="clear"
              onPress={this.toggleEdit}
              titleStyle={{ color: Colors.white[50] }}
            />
          )}
        />
        {
          this.state.sortable
            ? (
              <DraggableFlatList
                data={this.state.data}
                renderItem={this.renderDragableItem}
                keyExtractor={(item, index) => `${index}`}
                onMoveEnd={({ data }) => this.setState({ data })}
              />
            )
            : (
              <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={(item, index) => `${index}`}
              />
            )
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white[50],
  },
  dragging:{
    shadowColor: Colors.black['A700'],
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4
  }
});
