import React from 'react';
import { connect } from 'react-redux';
import uuid4 from 'uuid4';

/**
 * Main functionality of the app
 * Has methods for changing the input box, pressing the button, deleting and updating items.
 * Renders the UI and dispatches to the reducer
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.category = '';
    this.state.id = '';
    this.state.timeStamp = '';
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ category: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const today = new Date();

    const myGarage = {
      category: this.state.category,
      id: uuid4(),
      timeStamp: `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`,
    };

    this.props.createNewCategory(myGarage);
  };

  handleDelete = (event, id) => {
    event.preventDefault();
    this.props.deleteCategory(id);
  };

  handleUpdate = (event, id) => {
    const updates = {};
    updates.id = id;
    updates.value = this.state.category;
    this.props.updateCategory(updates);
    this.handleChange(event);
  };

  render() {
    return (
      <>
        {
          this.props.categories.map((myGarage, i) => <li key={i} >{`${myGarage.category}: ${myGarage.id} - ${myGarage.timeStamp}`}
              <button
                onClick={event => this.handleDelete(event, myGarage.id) }
                type='submit'> Remove a car from your garage
              </button>
              <button
                onClick={event => this.handleUpdate(event, myGarage.id) }
                type='submit'
                > Update this car in your garage

              </button>
            </li>)
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNewCategory: (categoryName) => {
      dispatch({
        type: 'CATEGORY_CREATE',
        payload: categoryName,
      });
    },
    updateCategory: (updates) => {
      dispatch({
        type: 'CATEGORY_UPDATE',
        payload: updates,
      });
    },
    deleteCategory: (id) => {
      dispatch({
        type: 'CATEGORY_DELETE',
        payload: id,
      });
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
