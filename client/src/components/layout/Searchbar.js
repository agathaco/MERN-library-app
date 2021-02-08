import React, { Fragment, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search, clearSearch } from '../../actions/search';

const Searchbar = ({ onSearch, clearSearch, search }) => {

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
   if (search.query) setInputValue(search.query)

  }, [search]);

  const handleSearch = (e) => {
    const enteredValue = e.target.value
    setInputValue(enteredValue)
    onSearch(enteredValue)
  }
  const handleClearSearch = () => {
    setInputValue('')
    clearSearch()
  }

  return (
    <Fragment>
      <form className="form">
        <input
          type="text"
          placeholder="Search for an author"
          onChange={event => handleSearch(event)}
          className="searchbar"
          value={inputValue}
        />
        <span onClick={handleClearSearch}>x</span>
      </form>
    </Fragment>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    onSearch: (query) => dispatch(search(query)),
    clearSearch: () => dispatch(clearSearch())
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
