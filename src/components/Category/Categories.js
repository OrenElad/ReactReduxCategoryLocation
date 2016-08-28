
/**
 * Created by oren on 8/25/16.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import * as categoriesActions from '../../actions/categoriesActions';
import { browserHistory } from 'react-router'


import {List, ListItem,MakeSelectable} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import MainToolbar from '../MainToolbar';

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
      console.log(index);
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
    this.state = {
      // categories: ["Education","Hospital","Restaurant"]
    };
  }

  componentDidMount(){
    this.props.actions.addCategory('Test1');
    this.props.actions.addCategory('Test2');
  }


  renderCategoriesList(){
    return this.props.categoriesList.map(function (category,index) {
        return <ListItem
                  key= {index}
                  value= {index}
                  primaryText={category}
                  leftIcon={<MdChevronRight/>}
                  />
    }).toArray()
  }

    render(){
    return (
      <div>
        <MainToolbar/>
        <div className="categories-view">
          <div className="category-list">
          <MuiThemeProvider>
            <List>
              <SelectableList defaultValue={1} actions={this.props.actions} >
                <Subheader inset={true}>Categories</Subheader>
                {this.renderCategoriesList()}
              </SelectableList>
            </List>
          </MuiThemeProvider>
          </div>
          <div className="category-view">
            <h3>Category</h3>
            <p>{this.props.categoriesList.get(this.props.currentId)}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

