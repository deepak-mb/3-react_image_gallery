import React, { Component } from "react";
import PixabayImages from "./PixabayImages";
import UnsplashImages from "./UnsplashImages";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
// console.log(process.env.REACT_APP_PIXABAY_API_KEY);

class Images extends Component {
  state = {
    searchQuery: "",
    unsplashAPIResult: [],
    pixabayAPIResult: [],
    count: 20,
    start: 1,
    totalHits: ""
  };

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    //Unsplash API
    let { searchQuery } = this.state;
    searchQuery = searchQuery
      .trim()
      .split(" ")
      .join("+");
    // console.log(searchQuery);
    if (searchQuery) {
      axios
        .get(
          `https://api.unsplash.com/search/photos/?client_id=${
            process.env.REACT_APP_UNSPLASH_API_KEY
          }&query=${this.state.searchQuery}&per_page=50&order_by=popular`
        )
        .then(response => {
          this.setState({
            unsplashAPIResult: response.data.results
          });
          // console.log(this.state.unsplashAPIResult);
        });

      // Pixabay API
      let { searchQuery, start, count } = this.state;
      axios
        .get(
          `https://pixabay.com/api/?key=${
            process.env.REACT_APP_PIXABAY_API_KEY
          }&q=${searchQuery}&image_type=photo&pretty=true&safesearch=true&order=popular&per_page=${count}&page=${start}`
        )
        .then(response => {
          if (response.status === 200) {
            const images = response.data.hits;
            this.setState({
              pixabayAPIResult: images,
              totalHits: response.data.totalHits
            });
            // console.log(this.state.pixabayAPIResult);
          } else {
            console.log("Something went wrong.");
          }
        });
    } else {
      alert("Please enter a search item.");
    }
  };

  fetchData = () => {
    let oldStart = this.state.start;
    let newStart = oldStart + 1;
    this.setState({ start: newStart, count: this.state.count + 20 });
    axios
      .get(
        `https://pixabay.com/api/?key=${
          process.env.REACT_APP_PIXABAY_API_KEY
        }&q=${
          this.state.searchQuery
        }&image_type=photo&pretty=true&safesearch=true&order=popular&per_page=20&page=${
          this.state.start
        }`
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            pixabayAPIResult: this.state.pixabayAPIResult.concat(
              response.data.hits
            )
          });
        } else {
          console.log("Something went wrong.");
        }
      });
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
          <InfiniteScroll
            dataLength={this.state.pixabayAPIResult.length}
            next={this.fetchData}
            hasMore={true}
            loader={<Loading />}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <UnsplashImages unsplashImages={this.state.unsplashAPIResult} />
            <PixabayImages pixabayImages={this.state.pixabayAPIResult} />
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default Images;
