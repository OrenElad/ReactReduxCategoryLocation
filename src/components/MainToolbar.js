
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
        this.props.toggleCategories ? browserHistory.push('/add_category') : browserHistory.push('/add_location');
        return;
      case 'EDIT':
        this.props.toggleCategories ? browserHistory.push('/edit_category') : browserHistory.push('/edit_location');
        return;
      case 'REMOVE':
        this.props.toggleCategories ? this.props.actions.removeCategory(this.props.currentId) : this.props.actions.removeLocation(this.props.currentId);
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
