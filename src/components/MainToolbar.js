/**
 * Created by oren on 8/28/16.
 */
import React from 'react';
import {Toolbar, ToolbarGroup,ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory } from 'react-router';


class MainToolbar extends React.Component {
  
  handleTouchTap(type){
    console.log(type);
    switch (type) {
      case 'ADD':
        browserHistory.push('/add_category');
        return;
      case 'EDIT':
        browserHistory.push('/edit_category');
        return;
      case 'REMOVE':
        this.props.actions.removeCategory(this.props.currentId);
        return;
      default:
        return;
    }
  }

  render() {
    return (<div>
      <MuiThemeProvider>
        <Toolbar className = 'categories-toolbar'>
          <ToolbarGroup>
            <ToolbarTitle className = 'category-title' text= "My Locations" />
            <RaisedButton onTouchTap = {this.handleTouchTap.bind(this,"ADD")} label="Add" primary={true} disabled={this.props.disabledButtons}/>
            <RaisedButton onTouchTap = {this.handleTouchTap.bind(this,"REMOVE")} label="Remove" primary={true} disabled={this.props.disabledButtons}/>
            <RaisedButton onTouchTap = {this.handleTouchTap.bind(this,"EDIT")} label="Edit" primary={true} disabled={this.props.disabledButtons}/>
          </ToolbarGroup>
        </Toolbar>
      </MuiThemeProvider>

    </div>)
  }

}

export default MainToolbar;