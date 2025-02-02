import { Component } from 'react';
import SearchInput from '../../Search/SearchInput/SearchInput.tsx';
import SearchButton from '../../Search/SearchButton/SearchButton.tsx';
import './Header.css';

interface HeaderProps {
  onSearch: (query: string) => Promise<void>;
  queryValue: string;
  onInputChange: (query: string) => void;
}

class Header extends Component<HeaderProps> {
  handleSearch = () => {
    const { onSearch, queryValue } = this.props;
    onSearch(queryValue);
  };

  render() {
    return (
      <header className="header">
        <SearchInput
          value={this.props.queryValue}
          onChange={(e) => this.props.onInputChange(e.target.value)}
        />
        <SearchButton onClick={this.handleSearch} />
      </header>
    );
  }
}

export default Header;
