import React from 'react';
import MainToolbar from '../MainToolbar';
import Footer from '../Footer';
import CategoryForm from './CategoryForm';

class CategoryAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (<div>
              <MainToolbar disabledButtons={true}/>
              <div className="category-add-component">
                <CategoryForm  header="Add Category" type="Add"/>
                <Footer/>
              </div>
            </div>)
  }

}

export default CategoryAdd;
