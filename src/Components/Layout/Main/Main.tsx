import { Component } from 'react';
import SearchResults from '../../Search/SearchResults/SearchResults.tsx';
import { IFilm } from '../../../Api/search.ts';

interface MainProps {
  list: IFilm[];
  message: string | null;
  loading: boolean;
}

class Main extends Component<MainProps> {
  render() {
    const { list, message, loading } = this.props;

    if (loading) {
      return (
        <main className="main loading">
          <ul className="skeleton">
            {[...Array(1)].map((_, i) => (
              <li key={i} className="skeleton-item">
                Loading...
              </li>
            ))}
          </ul>
        </main>
      );
    }

    return (
      <main className="main">
        {message && <div className="message">{message}</div>}
        {list.length > 0 && <SearchResults list={list} />}
      </main>
    );
  }
}

export default Main;
