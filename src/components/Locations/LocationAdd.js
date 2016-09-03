
import React , {PropTypes}from 'react';
import MainToolbar from '../MainToolbar';
import Footer from '../Footer';
import LocationForm from './LocationForm';


class LocationAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

    render() {
    return (<div>
              <MainToolbar disabledButtons={true}/>
              <LocationForm header="Add Location" type="Add"/>
              <Footer/>
            </div>
    );
  }

};
export default LocationAdd;

