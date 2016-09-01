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


class LocationEdit extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      addNameValue: null,
      addAddressValue: null,
      addCoordinateXValue: null,
      addCoordinateYValue: null,
      selectFieldValue: null,
      enableSave: true,
      errorName: "",
      errorAddress: "",
      errorCoordinateX: "",
      errorCoordinateY: ""
    };
    this.locationAddData = {};
    this.editLocationObj = {};
    this.regex = /^-?[0-9]\d*(\.\d+)?$/;

  }

  componentWillMount(){
    let stateObj = this.props.locationsList.get(localStorage.getItem('LocationId'));
    this.setState({addNameValue: stateObj.name,
                   addAddressValue: stateObj.address,
                   addCoordinateXValue: stateObj.coordinateX,
                   addCoordinateYValue: stateObj.coordinateY});

    Object.assign(this.editLocationObj,this.props.locationsList.get(localStorage.getItem('LocationId')));
    Object.assign(this.locationAddData,JSON.parse(localStorage.getItem('Locations')));
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
    };

    if(typeof this.state.addNameValue === 'string'
      && typeof this.state.addAddressValue === 'string'
      && typeof this.state.addCoordinateXValue === 'string'
      && typeof this.state.addCoordinateYValue === 'string'
      && typeof this.state.selectFieldValue === 'string'
      && this.state.enableSave){
      this.setState({enableSave: false});
    }


  }

  handleNameChange = (event) => {
    (event.target.value.length < 2) ?
      this.setState({errorName:"Please enter name with at list 2 letters"}) :
      this.setState({errorName:""});
    this.setState({addNameValue: event.target.value});
    Object.assign(this.editLocationObj,{name:event.target.value});

  };
  handleAddressChange = (event) => {
    (event.target.value.length < 2) ?
      this.setState({errorAddress:"Please enter address with at list 2 letters"}) :
      this.setState({errorAddress:""});
    this.setState({addAddressValue: event.target.value});
    Object.assign(this.editLocationObj,{address:event.target.value});
  };
  handleCoordinateXChange = (event) => {
    let latStr = event.target.value,
      latNum = Number.parseInt(event.target.value);
    console.log(latStr.match(this.regex));
    (latStr.match(this.regex) === null || latNum < -180 || latNum > 180) ?
      this.setState({errorCoordinateX:"Please enter numbers -180 to 180"}) :
      this.setState({errorCoordinateX:""});
    this.setState({addCoordinateXValue: event.target.value});
    Object.assign(this.editLocationObj,{coordinateX:event.target.value});
  };
  handleCoordinateYChange = (event) => {
    let latStr = event.target.value,
      latNum = Number.parseInt(event.target.value);
    console.log(latStr.match(this.regex));
    (latStr.match(this.regex) === null || latNum < -90 || latNum > 90) ?
      this.setState({errorCoordinateY:"Please enter numbers -90 to 90"}) :
      this.setState({errorCoordinateY:""});
    this.setState({addCoordinateYValue: event.target.value});
    Object.assign(this.editLocationObj,{coordinateY:event.target.value});
  };
  handleSelectFieldChange = (event, index, value) => {
    this.setState({selectFieldValue: value});
    Object.assign(this.editLocationObj,{cid: value});
    console.log('edit object: ',this.editLocationObj);
  };


  handleClick = () => {
    let locationsLocal = JSON.parse(localStorage.getItem('Locations')),
      self = this,
      locationId ,
      locationEditValue,
      hasValue = false;
    _.forEach(locationsLocal, function (value, key) {
      if (self.state.addNameValue == value) {
        alert("The Location exist, Please add a new one");
        hasValue = true;
      }
    });
    locationId = localStorage.getItem('LocationId');
    this.props.actions.editLocation(locationId,this.editLocationObj);
    locationEditValue = this.editLocationObj;
    Object.assign(this.locationAddData,{[locationId]:locationEditValue}) ;
    console.log('Handel Edit Click',this.locationAddData);
    localStorage.setItem('Locations', JSON.stringify(this.locationAddData));
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
          <h1>Edit Location</h1>
          <div className="location-add">
            <MuiThemeProvider>
              <TextField
                hintText="Name"
                floatingLabelText="Enter Location Name"
                defaultValue = { this.editLocationObj.name }
                errorText={this.state.errorName}
                onChange={this.handleNameChange}/>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <TextField
                hintText="Address"
                floatingLabelText="Enter Location Address"
                defaultValue = { this.editLocationObj.address }
                errorText={this.state.errorAddress}
                onChange={this.handleAddressChange}
                />
            </MuiThemeProvider>
            <MuiThemeProvider>
              <TextField
                hintText="Coordinate X"
                floatingLabelText="Enter Location Coordinate X"
                defaultValue = { this.editLocationObj.coordinateX }
                errorText={this.state.errorCoordinateX}
                onChange={this.handleCoordinateXChange}/>
            </MuiThemeProvider>
            <MuiThemeProvider>
              <TextField
                hintText="Coordinate Y"
                floatingLabelText="Enter Location Coordinate Y"
                defaultValue = { this.editLocationObj.coordinateY }
                errorText={this.state.errorCoordinateY}
                onChange={this.handleCoordinateYChange}/>
            </MuiThemeProvider>
            <p>You must choose Category</p>
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
export default connect(mapStateToProps, mapDispatchToProps)(LocationEdit);

