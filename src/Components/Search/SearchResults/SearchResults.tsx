import { Component } from 'react';
import './SearchResults.css';

import { IFilm } from 'Api/search';

interface SearchResultsProps {
  list: IFilm[] | [];
  message?: string | null;
}

class SearchResults extends Component<SearchResultsProps> {
  render() {
    const list = this.props?.list ? this.props?.list : [];

    return (
      <>
        {list.length > 0 ? (
          <>
            {list.map((item) => (
              <div key={item.title} className="film-list">
                <div>{item.title}</div>
                <div>{item.opening_crawl}</div>
              </div>
            ))}
          </>
        ) : this.props.message ? (
          <div className="message">{this.props.message}</div>
        ) : null}
      </>
    );
  }
}

export default SearchResults;
