
/**
 * Created by oren on 8/25/16.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import * as categoriesActions from '../../actions/categoriesActions';
import { browserHistory } from 'react-router'
var _ = require('lodash')


import {List, ListItem,MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import MainToolbar from '../MainToolbar';
import Footer from '../Footer.js';

function mapStateToProps(state) {
  return {
    categoriesList: state.categories.get("categories"),
    currentId: state.categories.get("currentId")
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

let SelectableList = MakeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends React.Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index
      });
      this.props.actions.viewCategory(index);
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

class Categories extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount(){
    console.log(localStorage.getItem('Categories'));
    (this.props.categoriesList.count() == 0) && this.props.actions.initialCategoriesList();
    let categoriesLocal = JSON.parse(localStorage.getItem('Categories')),
      hasValue = false;
    _.forEach(categoriesLocal, function(value,key){
      if(localStorage.getItem('AddedCategory') == value){
        hasValue = true;
      }
    });
    !hasValue && this.props.actions.addCategory(localStorage.getItem('AddedCategory'));
  }

  renderCategoriesList(){
    return this.props.categoriesList.map(function (category,index) {
        return <ListItem
                  key= {index}
                  value= {index}
                  primaryText={category}
                  leftIcon={<MdChevronRight/>}
                  className="list-item"/>
    }).toArray()
  }

    render(){
    return (
      <div>
        <MainToolbar currentId = {this.props.currentId} actions={this.props.actions} toggleCategories = {true}/>
        <div className="categories-view">
          <div className="category-list">
          <MuiThemeProvider>
            <List>
              <SelectableList defaultValue={1} actions={this.props.actions} >
                <h2 className="header-class">List of Categories</h2>
                {this.renderCategoriesList()}
              </SelectableList>
            </List>
          </MuiThemeProvider>
          </div>
          <div className="category-view">
            <h2 className="category-details-header">Category details</h2>
            <p className="category-details">{typeof this.props.categoriesList.get(this.props.currentId) !== 'undefined' && `Category name:  ${this.props.categoriesList.get(this.props.currentId)}`}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

