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
    this.state = {sliderIndex:0};
  }

  componentWillUpdate(nextProps,nextState){
    if(nextState.sliderIndex !== this.state.sliderIndex){
      this.state.sliderIndex == 1 ? browserHistory.push('/') : browserHistory.push('/locations');
    }
  }
  handleChange = (value) => {
    this.setState({
      sliderIndex: value
    });
  };

  render() {
    return (<div className="footer">
      <MuiThemeProvider>
        <Tabs
          value={this.state.slideIndex}
          onChange={this.handleChange}
          >
          <Tab
            icon={<FaAlignJustify/>}
            label="Categories"
            value={0}
            />
          <Tab
            icon={<FaLocationArrow/>}
            label="Locations"
            value={1}
            />
        </Tabs>

      </MuiThemeProvider>

    </div>)
  }

}

export default MainToolbar;
