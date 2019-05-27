import React, { Component } from "react";
import Image from "./Image";
import axios from "axios";
// import Loading from "./Loading";
// console.log(process.env.REACT_APP_UNSPLASH_API_KEY);

class Images extends Component {
  state = {
    searchQuery: "",
    result: []
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery) {
      axios
        .get(
          `https://api.unsplash.com/search/photos/?client_id=b0a35f2b4c7ddb2842b10856bd95b914158cb1b51f59ee85be5275cebbb253c0&query=${searchQuery}&per_page=30&order_by=popular`
        )
        .then(response => {
          this.setState({
            result: response.data.results
          });
        });
    } else {
      alert("Please enter a search item.");
    }
  };

  render() {
    return (
      <div className="px-3">
        <form
          onSubmit={this.onSubmit}
          className="form-inline my-2 my-lg-0 ml-md-auto search-form"
        >
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            maxLength="20"
            name="searchQuery"
            onChange={this.onChange}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0 search-button"
            type="submit"
          >
            Search
          </button>
        </form>
        <div className="image-outer-container my-1 my-sm-2 my-md-3 my-lg-4">
          <Image images={this.state.result} />
        </div>
      </div>
    );
  }
}

export default Images;
