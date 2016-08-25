import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';

const App = (props) => {
  return (
    <div>
      <IndexLink to="/">Home</IndexLink>
      {' | '}
      <Link to="/categories">Categories</Link>
      {' | '}
      <Link to="/locations">Locations</Link>
      <br/>
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
