import React from 'react';
import * as categoriesActions from '../../actions/categoriesActions';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MainToolbar from '../MainToolbar';
import Footer from '../Footer';
import { browserHistory } from 'react-router'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map} from 'immutable';


function mapStateToProps(state) {
  return {
    categoriesList: state.categories.get("categories"),
    currentId: state.categories.get("currentId")
  };
}

const actions = [categoriesActions];

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editedValue: '',
      addValue: ''
    };
  }

  handleChange = (event) => {
    (this.props.type === "Add") ?
    this.setState({addValue: event.target.value}) :
    this.setState({editedValue: event.target.value});
  };

  handleClick = () => {
    let categoriesLocal = JSON.parse(localStorage.getItem('Categories')),
      self = this,
      hasValue = false;
    (this.props.type === "Edit") &&  self.props.actions.editCategory(this.props.currentId,self.state.editedValue);
    _.forEach(categoriesLocal, function(value,key){
      if(self.state.editedValue == value || self.state.addValue == value){
        alert("The Category exist, Please enter new one");
        hasValue = true;
      }
    });
    (this.props.type === "Add") && localStorage.setItem('AddedCategory', [this.state.addValue]);
    !hasValue && browserHistory.goBack();
  };

  render() {
    return (<div>
      <div className="category-add-component">
        <h1>{this.props.header}</h1>
        <div className="category-add">
          <MuiThemeProvider>
            <TextField
              hintText="Name"
              floatingLabelText="Category Name"
              defaultValue = {this.props.categoriesList.get(this.props.currentId)}
              onChange={this.handleChange}/>
          </MuiThemeProvider>
          <MuiThemeProvider>
            <FlatButton label="Save" primary={true} onClick={this.handleClick}/>
          </MuiThemeProvider>
        </div>
      </div>
    </div>)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);
