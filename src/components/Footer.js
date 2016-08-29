/**
 * Created by oren on 8/29/16.
 */
import React from 'react';
import {Toolbar, ToolbarGroup,ToolbarTitle} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import FaAlignJustify from 'react-icons/lib/fa/align-justify';
import FaLocationArrow from 'react-icons/lib/fa/location-arrow';



class MainToolbar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }


  handleTouchTap(type){

  }

  render() {
    return (<div className="footer">
      <MuiThemeProvider>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          >
          <Tab
            icon={<FaAlignJustify/>}
            label="Categories"
            />
          <Tab
            icon={<FaLocationArrow/>}
            label="Locations"
            />
        </Tabs>

      </MuiThemeProvider>

    </div>)
  }

}

export default MainToolbar;
