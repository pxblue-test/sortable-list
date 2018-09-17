import React from 'react';

// Material Components
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import DragIndicator from '@material-ui/icons/DragIndicator';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


// Sortable Components
// https://github.com/clauderic/react-sortable-hoc
import {SortableContainer, 
  SortableElement, 
  SortableHandle, 
  arrayMove } from 'react-sortable-hoc';


// Additional Styles
import './style.css';


// Utility Functions
function unCamelCase(val) {
  if(!val){return}
  return val.replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
		.replace(/^./, function(str){ return str.toUpperCase(); })
}
function ObjectToList(obj){
  if(!obj){return}
  let list = [];
  for (let key in obj) {
    list.push({ key: key, value: obj[key]});
  }
  return list;
}


// Sortable Components Definitions
const DragHandle = SortableHandle(() => <DragIndicator style={{height: '20px', width: '20px', cursor: 'pointer'}}/>);

const SortableListItem = SortableElement(({value}) => {
  return (
    <ListItem>
      <DragHandle fontSize={'inherit'}/>
      <ListItemText primary={unCamelCase(value.key)} 
        style={{paddingLeft: '5px'}}>
      </ListItemText>
      <ListItemText className="lastColumn" secondary={value.value} >
      </ListItemText>
    </ListItem>
  );
});

export const SortableList = SortableContainer(({items}) => {
  return (
    <List style={{paddingTop: '0px'}} component="nav">
      {
        items.map((item, i) => {
          return (<SortableListItem key={`item-${i}`} index={i} value={item} />);
        })
      }
    </List>   
  );
});


// Main Example Class
class SortableListExample extends React.Component {
  constructor(props) {
    super(props);
    
    let items =  {
      'georgeWashington': 1789,
      'johnAdams': 1796,
      'thomasJefferson': 1800,
      'jamesMadison': 1808,
      'jamesMonroe': 1812
    };

    this.state = {
      list: ObjectToList(items),
      sortable: false
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({list: arrayMove(this.state.list, oldIndex, newIndex)});
  }

  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Sortable List
            </Typography>
            <div style={{flex: '1 1 0px', textAlign: 'right', marginRight: '-14px'}}>
              <Button style={{color: 'white'}} onClick={() => this.setState({sortable: !this.state.sortable})}>
                {this.state.sortable ? 'Save' : 'Edit'}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        {this.state.sortable && 
          <SortableList 
            items={this.state.list} 
            onSortEnd={this.onSortEnd}
            useDragHandle={true}
          />
        }
        {!this.state.sortable &&
          <List style={{paddingTop: '0px'}} component="nav">
            {
              this.state.list.map((item, i) => {
                return (
                  <ListItem key={`item-${i}`}>
                    <ListItemText primary={unCamelCase(item.key)} ></ListItemText>
                    <ListItemText className={'lastColumn'} secondary={item.value}>
                    </ListItemText>
                  </ListItem>
                )
              })
            }
          </List>  
        }
      </div>
    );
  }
}

export default SortableListExample;

