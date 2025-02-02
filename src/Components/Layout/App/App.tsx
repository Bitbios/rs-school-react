import { Component } from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import { IFilm, SearchAPI } from '../../../Api/search';

interface AppState {
  queryValue: string;
  list: IFilm[];
  message: string | null;
  loading: boolean;
  hasError: boolean;
}

class App extends Component<unknown, AppState> {
  state: AppState = {
    queryValue: localStorage.getItem('searchQuery') || '',
    list: [],
    message: null,
    loading: false,
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  handleInputChange = (query: string): void => {
    this.setState({ queryValue: query }, () => {
      localStorage.setItem('searchQuery', query);
    });
  };

  handleSearch = (query: string): Promise<void> => {
    this.setState({ loading: true });
    return SearchAPI(query).then((response) => {
      if (response.status === 'success') {
        if (response.data.results.length > 0) {
          this.setState({
            list: response.data.results,
            message: null,
            loading: false,
          });
        } else {
          this.setState({
            list: [],
            message: 'No results found',
            loading: false,
          });
        }
        return;
      }

      const errorData = response.error || {};
      const errorCode = Number(errorData.code) || 500;
      const errorMessage = errorData.message || 'Search failed';
      let displayMessage = 'Search failed';

      if (errorCode >= 400 && errorCode < 500) {
        displayMessage = `Client error (${errorCode}): ${errorMessage}`;
      } else if (errorCode >= 500) {
        displayMessage = `Server error (${errorCode}): ${errorMessage}`;
      } else {
        displayMessage = `Error: ${errorMessage}`;
      }

      this.setState({
        list: [],
        message: displayMessage,
        loading: false,
      });
    });
  };

  throwError = (): void => {
    this.setState({
      hasError: true,
    });
    throw new Error('Test error');
  };

  render() {
    const { queryValue, list, message, loading, hasError } = this.state;

    if (hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>Please try again later or contact support.</p>
          <a href="/">Please refresh the page</a>
        </div>
      );
    }

    return (
      <div className="App">
        <Header
          onSearch={this.handleSearch}
          queryValue={queryValue}
          onInputChange={this.handleInputChange}
        />
        <Main list={list} message={message} loading={loading} />
        <div className="error-test-button-container">
          <button onClick={this.throwError} className="error-test-button">
            Test Error Boundary
          </button>
        </div>
      </div>
    );
  }
}

export default App;
