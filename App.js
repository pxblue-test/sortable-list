import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
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
    <TouchableOpacity onLongPress={move} onPressOut={moveEnd}>
      <ListItem
        title={item.name}
        rightTitle={`${item.value}`}
        leftIcon={{ name: 'drag-handle' }}
      />
    </TouchableOpacity>
  );

  renderItem = ({ item }) => (
    <ListItem title={item.name} rightTitle={`${item.value}`} />
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
            style: { color: Colors.white[500], fontSize: 16 },
          }}
          rightComponent={() => (
            <Button
              title={this.state.sortable ? 'Save' : 'Edit'}
              type="clear"
              onPress={this.toggleEdit}
              titleStyle={{ color: Colors.white[500] }}
            />
          )}
        />
        <DraggableFlatList
          data={this.state.data}
          renderItem={
            this.state.sortable ? this.renderDragableItem : this.renderItem
          }
          keyExtractor={(item, index) => `${index}-${this.state.sortable}`}
          scrollPercent={50}
          onMoveEnd={({ data }) => this.setState({ data })}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white[100],
  },
});
