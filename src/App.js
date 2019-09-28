import React from 'react';
import {connect} from 'react-redux';
import uuid4 from 'uuid4';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.category = '';
    this.state.id = '';
    this.state.timeStamp = '';
  }

  handleChange = (event) => {
    const {value} = event.target;
    this.setState({category: value});
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let today = new Date();

    let myGarage = {
      category: this.state.category,
      id: uuid4(),
      timeStamp: today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    };

    this.props.createNewCategory(myGarage);
  };

  handleDelete = (event) => {
    event.preventDefault();

    this.props.deleteCategory(this.state.id);
  };

  render() {
    return (
      <>
        {
          this.props.categories.map((myGarage, i) =>
            <li key={i} >{myGarage.category + ': ' + myGarage.id + ' - ' + myGarage.timeStamp}
              <form onSubmit={this.handleDelete}>
            <button type='submit'> Remove a car from your garage </button>
              </form>
            </li>
          )
        }

        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.state.category}
            onChange={this.handleChange}
            placeholder='Enter a car'
          />
          <button type='submit'> Add a car to your garage </button>

        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewCategory : (categoryName) => {
      dispatch({
        type: 'CATEGORY_CREATE',
        payload: categoryName,
      });
    },
    deleteCategory : (id) => {
      dispatch({
        type: 'CATEGORY_DELETE',
        payload: id,
      });
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
