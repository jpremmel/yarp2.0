import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSearchResults } from './../actions';

function SearchForm({ dispatch }){
  let input;
  let btnStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '10px'
  };
  return(
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        if (!input.value.trim()) {
          return;
        }
        dispatch(fetchSearchResults(input.value.trim()));
        input.value = '';
      }}>
        <div className='input-field'>
          <input
            type='text'
            placeholder='Search for an article'
            ref={node => { input = node; }} />
        </div>
        <button style={btnStyle} className='waves-effect waves-light btn-small'>Search</button>
      </form>
    </div>
  );
}

SearchForm.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(SearchForm);