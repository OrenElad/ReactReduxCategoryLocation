import React from 'react';
import {Link} from 'react-router';
import ReactListView from 'react-list-view';
import * as actions from '../actions/categoriesActions';
import store from '../store/configureStore';


class Categories extends React.Component {

  constructor() {
    super();
    this.state = {
      categories: ["Education","Hospital","Restaurant"]
    };
  }

  componentWillMount(){
    store.dispatch(actions.addCategory('Test'));
    console.log(store.getState());
  }
    render(){
    return (
      <div>
        <h2>Categories</h2>
        { this.state.categories.map(function (category,index) {
          return <li key={ index }>{category}</li>;
        })}
      </div>
    );
  }
};

export default Categories;
