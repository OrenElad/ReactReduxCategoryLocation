/**
 * Created by oren on 8/29/16.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { browserHistory } from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import FaAlignJustify from 'react-icons/lib/fa/align-justify';
import FaLocationArrow from 'react-icons/lib/fa/location-arrow';



class MainToolbar extends React.Component {
  constructor() {
    super();
    this.state = {sliderIndex:0};
  }

  componentDidUpdate(prevProps,prevState){
    if(prevState.sliderIndex !== this.state.sliderIndex){
      if(this.state.sliderIndex === 0) {
         console.log('/: ', this.state.sliderIndex);
         browserHistory.push('/');
      }else if (this.state.sliderIndex === 1){
         console.log('/locations: ', this.state.sliderIndex);
         browserHistory.push('/locations');
      }
    }
  }
  handleChange = (value) => {
    this.setState({ sliderIndex: value });
  };

  render() {
    return (<div className="footer">
      <MuiThemeProvider>
        <Tabs
          value={this.state.sliderIndex}
          onChange={this.handleChange}>
          <Tab
            icon={<FaAlignJustify/>}
            value={0}
            />
          <Tab
            icon={<FaLocationArrow/>}
            value={1}
            />
        </Tabs>

      </MuiThemeProvider>

    </div>)
  }

}

export default MainToolbar;
