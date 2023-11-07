import React, { Component } from "react";
import "./TodoApp.css";

export default class TodoApp extends Component {
  state = {
    input: "",
    items: [],
  };

  componentDidMount() {
    // Load data from localStorage when the component mounts
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      this.setState({ items: JSON.parse(savedItems) });
    }
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  storeItems = (event) => {
    event.preventDefault();
    const { input } = this.state;

    this.setState(
      (prevState) => ({
        items: [...prevState.items, input],
        input: "",
      }),
      () => {
        // Save the updated items to localStorage
        localStorage.setItem("items", JSON.stringify(this.state.items));
      }
    );
  };

  deleteItem = (key) => {
    this.setState(
      (prevState) => ({
        items: prevState.items.filter((data, index) => index !== key),
      }),
      () => {
        // Save the updated items to localStorage
        localStorage.setItem("items", JSON.stringify(this.state.items));
      }
    );
  };

  render() {
    const { input, items } = this.state;

    return (
      <div className="todo-container">
        <form className="input-section" onSubmit={this.storeItems}>
          <h1>To-do App</h1>
          <input
            type="text"
            value={input}
            onChange={this.handleChange}
            placeholder="Enter items..."
          />
        </form>
        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {data}{" "}
              <i
                className="fa-regular fa-trash-can icon2"
                onClick={() => this.deleteItem(index)}
              ></i>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
