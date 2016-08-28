/**
 * Created by oren on 8/28/16.
 */
import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainToolbar from '../MainToolbar';



class CategoryAdd extends React.Component {
  render() {
    return (<div>
      <MainToolbar/>
              <h1>Category</h1>
              <MuiThemeProvider>
                <TextField
                    hintText="Name"
                    floatingLabelText="Enter Category Name"/>
              </MuiThemeProvider>
              <MuiThemeProvider>
                <FlatButton label="Save" primary={true} />
              </MuiThemeProvider>
            </div>)
  }

}

export default CategoryAdd;