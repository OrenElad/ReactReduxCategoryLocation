/**
 * Created by oren on 8/28/16.
 */
import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainToolbar from '../MainToolbar';
import { browserHistory } from 'react-router'
var _ = require('lodash');



class CategoryAdd extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      addValue: ''
    };
  }

  handleChange = (event) => {
    this.setState({addValue: event.target.value});
  };

  handleClick = () => {
    let categoriesLocal = JSON.parse(localStorage.getItem('Categories')),
        self = this,
        hasValue = false;
    _.forEach(categoriesLocal, function(value,key){
      if(self.state.addValue == value){
        alert("The Category exist, Please add a new one");
        hasValue = true;
      }
    });
    localStorage.setItem('AddedCategory', [this.state.addValue]);
    !hasValue && browserHistory.goBack();
  };

  render() {
    return (<div>
            <MainToolbar disabledButtons={true}/>
            <div className="category-add-component">
              <h1>Add Category</h1>
              <div className="category-add">
                <MuiThemeProvider>
                  <TextField
                      hintText="Name"
                      floatingLabelText="Enter Category Name"
                      onChange={this.handleChange}/>
                </MuiThemeProvider>
                <MuiThemeProvider>
                  <FlatButton label="Save" primary={true} onClick={this.handleClick}/>
                </MuiThemeProvider>
              </div>
            </div>
            </div>)
  }

}

export default CategoryAdd;