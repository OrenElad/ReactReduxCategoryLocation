/**
 * Created by oren on 8/28/16.
 */
import React , {PropTypes}from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainToolbar from '../MainToolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Footer from '../Footer';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import * as categoriesActions from '../../actions/categoriesActions';
import * as locationsActions from '../../actions/locationsActions';


import { browserHistory } from 'react-router'
var _ = require('lodash');

function mapStateToProps(state) {
  return {
    categoriesList: state.categories.get("categories"),
    currentId: state.categories.get("currentId"),
    locationsList: state.locations.get("locations")
  };
}

const actions = [
  locationsActions,
  categoriesActions
];

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


class LocationAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      addNameValue: null,
      addAddressValue: null,
      addCoordinateXValue: null,
      addCoordinateYValue: null,
      selectFieldValue: null,
      enableSave: false
    };
    this.locationAddData = {};
  }

  componentDidMount(){
    (this.props.categoriesList.count() == 0) && this.props.actions.initialCategoriesList();
  }
  componentDidUpdate(prevProps,prevState) {
    let locationData = {};
    if (prevState.selectFieldValue !== this.state.selectFieldValue) {
      let locationsLocal = JSON.parse(localStorage.getItem('Locations')),
        hasValue = false;
      _.forEach(locationsLocal, function (value, key) {
        if (localStorage.getItem('LocationId') == value) {
          hasValue = true;
        }
      });

    }
    if (prevState.addNameValue !== this.state.addNameValue) {
      Object.assign({}, locationData, this.state.addNameValue);
    }

  }

    handleNameChange = (event) => {
      this.setState({addNameValue: event.target.value});
      Object.assign(this.locationAddData,{name:event.target.value});

    };
    handleAddressChange = (event) => {
      this.setState({addAddressValue: event.target.value});
      Object.assign(this.locationAddData,{address:event.target.value});
    };
    handleCoordinateXChange = (event) => {
      this.setState({addCoordinateXValue: event.target.value});
      Object.assign(this.locationAddData,{coordinateX:event.target.value});
    };
    handleCoordinateYChange = (event) => {
      this.setState({addCoordinateYValue: event.target.value});
      Object.assign(this.locationAddData,{coordinateY:event.target.value});
    };
    handleSelectFieldChange = (event, index, value) => {
      this.setState({selectFieldValue: value});
      Object.assign(this.locationAddData,{cid: value});
      console.log(this.locationAddData);


      if(this.state.addNameValue !== null
        && this.state.addAddressValue !== null
        && this.state.addCoordinateXValue !== null
        && this.state.addCoordinateYValue !== null
        && this.state.selectFieldValue !== null ){
        this.setState({enableSave: false});
      }

    };


    handleClick = () => {
      let locationsLocal = JSON.parse(localStorage.getItem('Locations')),
        self = this,
        locationObj = {},
        currentLocalStorage,
        hasValue = false;
      _.forEach(locationsLocal, function (value, key) {
        if (self.state.addNameValue == value) {
          alert("The Location exist, Please add a new one");
          hasValue = true;
        }
      });
      this.props.actions.addLocation(this.locationAddData);
      locationObj[localStorage.getItem('LocationId')] = this.locationAddData;
      currentLocalStorage = JSON.parse(localStorage.getItem('Locations'));
      Object.assign(locationObj,currentLocalStorage);
      localStorage.setItem('Locations', JSON.stringify(locationObj));
      !hasValue && browserHistory.goBack();
    };


    getCategoriesList(){
      return this.props.categoriesList.map(function (category, index) {
        return <MenuItem
                  key={index}
                  value={index}
                  primaryText={category}
                  />
                }).toArray();
    }
    render() {
    return (<div>
            <MainToolbar disabledButtons={true}/>
            <div className="category-add-component">
              <h1>Add Location</h1>
              <div className="location-add">
                <MuiThemeProvider>
                  <TextField
                      hintText="Name"
                      floatingLabelText="Enter Location Name"
                      onChange={this.handleNameChange}/>
                </MuiThemeProvider>
                <MuiThemeProvider>
                  <TextField
                    hintText="Address"
                    floatingLabelText="Enter Location Address"
                    onChange={this.handleAddressChange}
                  />
                </MuiThemeProvider>
                <MuiThemeProvider>
                  <TextField
                    hintText="Coordinate X"
                    floatingLabelText="Enter Location Coordinate X"
                    onChange={this.handleCoordinateXChange}/>
                </MuiThemeProvider>
                <MuiThemeProvider>
                  <TextField
                    hintText="Coordinate Y"
                    floatingLabelText="Enter Location Coordinate Y"
                    onChange={this.handleCoordinateYChange}/>
                </MuiThemeProvider>
                <MuiThemeProvider >
                  <SelectField
                    value={this.state.selectFieldValue || 'Choose your category'}
                    onChange={this.handleSelectFieldChange}
                  >
                    {this.getCategoriesList()}
                  </SelectField>

                </MuiThemeProvider>
                <MuiThemeProvider >
                  <FlatButton className="location-save" label="Save" primary={true} onClick={this.handleClick} disabled = {this.state.enableSave}/>
                </MuiThemeProvider>
              </div>
            </div>
        <Footer/>
            </div>
    );
  }

};
export default connect(mapStateToProps, mapDispatchToProps)(LocationAdd);

