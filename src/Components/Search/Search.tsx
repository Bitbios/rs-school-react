import { Component } from 'react';
import { SearchAPI } from '../../Api/search';
import axios from 'axios';
import { IFilm } from '../../Api/search';
import SearchResults from './SearchResults/SearchResults';

interface ISearchState {
  query: string;
  list: IFilm[];
  message: string | null;
}

class Search extends Component<object, ISearchState> {
  constructor(props: object) {
    super(props);
    this.state = {
      query: '',
      list: [],
      message: null,
    };
  }

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ query: savedQuery });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const { query } = this.state;
    const isValid = /^[a-zA-Z0-9 ]*$/.test(query);
    if (!isValid) {
      return;
    }

    localStorage.setItem('searchQuery', query);
    try {
      const response = await SearchAPI(query);
      if (response.status === 'success') {
        if (response.data.results.length > 0) {
          this.setState({ list: response.data.results, message: null });
        } else {
          this.setState({ list: [], message: 'No results found' });
        }
      } else {
        this.setState({ list: [], message: 'Search failed' });
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error('Search error:', error);
      }
    }
  };

  render() {
    const { query, list, message } = this.state;
    return (
      <form onSubmit={this.handleSearch}>
        <input
          type="text"
          value={query}
          onChange={this.handleChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
        <SearchResults list={list} message={message} />
      </form>
    );
  }
}

export default Search;
