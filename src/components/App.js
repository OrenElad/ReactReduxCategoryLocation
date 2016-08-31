import React, { PropTypes } from 'react';
import { Route, Router, browserHistory } from 'react-router';
import Categories from './Category/Categories';
import CategoryEdit from './Category/CategoryEdit';
import CategoryAdd from './Category/CategoryAdd';
import Locations from './Locations/Locations.js';
import LocationAdd from './Locations/LocationAdd';
import LocationEdit from './Locations/LocationEdit';

const App = (props) => {
  return (
  <Router history={ browserHistory }>
    <Route path="/" component={Categories}></Route>
    <Route path="/add_category" component={CategoryAdd}></Route>
    <Route path="/edit_category" component={CategoryEdit}></Route>
    <Route path="/locations" component={Locations}></Route>
    <Route path="/add_location" component={LocationAdd}></Route>
    <Route path="/edit_location" component={LocationEdit}></Route>
  </Router>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
