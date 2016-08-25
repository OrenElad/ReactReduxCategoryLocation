
/**
 * Created by oren on 8/25/16.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import * as categoriesActions from '../actions/categoriesActions';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';




function mapStateToProps(state) {
  return {
    categoriesList: state.categories.get("categories")
  };
}

const actions = [categoriesActions];

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

class Categories extends React.Component {

  constructor() {
    super();
    this.state = {
      categories: ["Education","Hospital","Restaurant"]
    };
  }

  componentDidMount(){
    this.props.actions.addCategory('Test1');
    this.props.actions.addCategory('Test2');
  }

  handleTouchTap(type){
    console.log(type);
    switch (type) {
      case 'VIEW':
        return ;
      case 'ADD':
        return;
      case 'EDIT':
        return;
      case 'REMOVE':
        return;
      default:
        return;
    }
  }
    render(){
    return (
      <div>
        <Toolbar className = 'categories-toolbar'>
          <ToolbarGroup>
            <ToolbarTitle className = 'category-title' text= {this.props.title} />
            <RaisedButton onTouchTap = {this.handleTouchTap.bind(this,"VIEW")} label="View" primary={true} />
            <RaisedButton onTouchTap = {this.handleTouchTap.bind(this,"ADD")} label="Add" primary={true} />
            <RaisedButton onTouchTap = {this.handleTouchTap.bind(this,"REMOVE")} label="Remove" primary={true} />
            <RaisedButton onTouchTap = {this.handleTouchTap.bind(this,"EDIT")} label="Edit" primary={true} />
          </ToolbarGroup>
        </Toolbar>
        { this.props.categoriesList && this.props.categoriesList.map(function (category,index) {
          return <li className = 'categories-list-items' key={ index }>{category}</li>;
        }).toArray()}
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

