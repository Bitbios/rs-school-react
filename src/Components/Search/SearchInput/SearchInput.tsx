import React, { Component } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class SearchInput extends Component<SearchInputProps> {
  render() {
    return (
      <input
        className="search-input"
        type="text"
        value={this.props.value}
        onChange={(e) => {
          const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');
          this.props.onChange({
            ...e,
            target: {
              ...e.target,
              value,
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
        placeholder="Search..."
      />
    );
  }
}

export default SearchInput;
