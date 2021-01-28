import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search } from '../../actions/search';

const Searchbar = ({search}) => {

  const handleSearch = (e) => {
    search(e.target.value)
  }

  return (
    <Fragment>
      <form className="form">
        <input
          type="text"
          placeholder="Search for an author"
          onChange={event => handleSearch(event)}
        />
      </form>
    </Fragment>
  );
};

Searchbar.propTypes = {
  search: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    search: (query) => dispatch(search(query))
  }
}

export default connect(null, mapDispatchToProps)(Searchbar);
