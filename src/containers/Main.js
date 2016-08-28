/**
 * Created by oren on 8/25/16.
 */

"use strict";

import React, { Component } from 'react';
import Categories from '../components/Category/Categories';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Main extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Categories title = 'Categories'></Categories>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Main;