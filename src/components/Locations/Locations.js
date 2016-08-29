/**
 * Created by oren on 8/29/16.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import * as locationsActions from '../../actions/LocationsActions';
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
    locationsList: state.locations.get("locations"),
    currentId: state.locations.get("currentId")
  };
}

const actions = [locationsActions];

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
      this.props.actions.viewLocation(index);
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

class Locations extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount(){

  }

  renderLocationsList(){
    return this.props.locationsList.map(function (location,index) {
      return <ListItem
        key= {index}
        value= {index}
        primaryText={location}
        leftIcon={<MdChevronRight/>}
        className="list-item"/>
    }).toArray()
  }

  render(){
    return (
      <div>
        <MainToolbar currentId = {this.props.currentId} actions={this.props.actions}/>
        <div className="Categories-view">
          <div className="category-list">
            <MuiThemeProvider>
              <List>
                <SelectableList defaultValue={1} actions={this.props.actions} >
                  <h2 className="header-class">List of Locations</h2>
                  {this.renderLocationsList()}
                </SelectableList>
              </List>
            </MuiThemeProvider>
          </div>
          <div className="category-view">
            <h2 className="category-details-header">Location details</h2>
            <p className="category-details">{typeof this.props.locationsList.get(this.props.currentId) !== 'undefined' && `Location name:  ${this.props.LocationsList.get(this.props.currentId)}`}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);