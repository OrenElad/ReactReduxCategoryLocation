
import React , {PropTypes}from 'react';
import MainToolbar from '../MainToolbar';
import Footer from '../Footer';
import LocationForm from './LocationForm';


class LocationEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>
              <MainToolbar disabledButtons={true}/>
              <LocationForm header="Edit Location" type="Edit"/>
              <Footer/>
            </div>
    );
  }

};
export default LocationEdit;

