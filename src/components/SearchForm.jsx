import React from 'react';
import { connect } from 'react-redux';
import { fetchSearchResults } from './../actions';

const SearchForm = ({ dispatch }) => {
  let input = '';
  const btnStyle = {
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
        <button style={btnStyle} className='waves-effect waves-light btn-small'><i className='material-icons left'>search</i>Search</button>
      </form>
    </div>
  );
};

export default connect()(SearchForm);