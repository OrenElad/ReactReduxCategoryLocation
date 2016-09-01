/**
 * Created by oren on 8/29/16.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import * as locationsActions from '../../actions/locationsActions';
var _ = require('lodash');
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import Toggle from 'material-ui/Toggle';
import {List, ListItem,MakeSelectable} from 'material-ui/List';
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
    this.state = {
      isThereCategories: false,
      isSort: false,
      markers: [{
        position: {
          lat: 25.0112183,
          lng: 121.52067570000001
        },
        key: `Taiwan`,
        defaultAnimation: 2
      }],
      gmLat: 25.0,
      gmLng: 121.5
    };
  }

  componentWillMount(){
    (localStorage.getItem('Categories') == null) &&  this.setState({isThereCategories: !this.state.isThereCategories});
  }

  componentDidMount(){
    console.log(localStorage.getItem('Locations'));
    (this.props.locationsList.count() == 0) && this.props.actions.initialLocationsList();
    console.log('render locations LS: ',JSON.parse(localStorage.getItem('Locations')));
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.currentId !== this.props.currentId) {
      let local = {},lat,lng;
      Object.assign(local,this.props.locationsList.get(localStorage.getItem('LocationId')));
      lat = parseFloat(local.coordinateY);
      lng = parseFloat(local.coordinateX);
      this.setState({gmLat: lat, gmLng: lng});
    }
  };

  renderLocationsList(){
    let sortedMap = this.props.locationsList;
    if(this.state.isSort){
      sortedMap = this.props.locationsList.sortBy(location => location.name );
    }
    return sortedMap.map(function (location,index) {
      return <ListItem
        key= {index}
        value= {index}
        primaryText={location.name}
        leftIcon={<MdChevronRight/>}
        className="list-item"/>
    }).toArray()
  };

  handleSort =() => {
    this.setState({isSort:!this.state.isSort});
  }

  handleMapClick(event) {
    let { markers } = this.state;
    markers = update(markers, {
      $push: [
        {
          position: event.latLng,
          defaultAnimation: 2,
          key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
        },
      ],
    });
    this.setState({ markers });
  }

  handleMarkerRightclick(index, event) {
    /*
     * All you modify is data, and the view is driven by data.
     * This is so called data-driven-development. (And yes, it's now in
     * web front end and even with google maps API.)
     */
    let { markers } = this.state;
    markers = update(markers, {
      $splice: [
        [index, 1],
      ],
    });
    this.setState({ markers });
  }

  getLocationDetails (){
    let local = {};
    Object.assign(local,this.props.locationsList.get(this.props.currentId));
    if(!local.hasOwnProperty('name')) return;
    return (<div><p className="category-details">
              {typeof local !== 'undefined'
                && `Name:  ${local.name} Address:  ${local.address}`}</p>
              <p className="category-details">
                {typeof local !== 'undefined'
                && `Latitude: ${local.coordinateX} Longitude: ${local.coordinateY}`}</p>
              <section style={{ height: `60%`,width: `60%`,position: `absolute` }}>
                <GoogleMapLoader
                  containerElement={<div
                                      style={{ height: `60%`, width: `60%`,position: `absolute` }}
                                    />}
                  googleMapElement={
                <GoogleMap
                  ref={(map) => console.log(map)}
                  defaultZoom={15}
                  center={{ lat: this.state.gmLat, lng: this.state.gmLng }}
                  onClick={this.handleMapClick.bind(this)}
                >
                  {this.state.markers.map((marker, index) => (
                    <Marker
                      {...marker}
                      onRightclick={() => this.handleMarkerRightclick.bind(this)}
                    />
                  ))}
                </GoogleMap>
              }
                />
              </section>

          </div>)
  };

  render(){
    return (
      <div>
        <MainToolbar currentId = {this.props.currentId} actions={this.props.actions} toggleCategories = {false} disabledButtons = {this.state.isThereCategories}/>
        <div className="sort-locations">
        <MuiThemeProvider>
          <Toggle
            label="Sort"
            style = {{maxWidth: 100, paddingLeft: 50, paddingTop:20}}
            onToggle = {this.handleSort}
          />
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Toggle
            label="Group"
            style = {{maxWidth: 100, paddingLeft: 50, paddingTop:20}}
          />
        </MuiThemeProvider>
        </div>
        <div className="categories-view">
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
            {this.getLocationDetails()}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(Locations);
