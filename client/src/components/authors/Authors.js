import React from 'react'
import { Link } from 'react-router-dom';

const Authors = () => {
  return (
    <div>
      All authors <br/>
      <Link to="/new-author">New Author</Link>
    </div>
  )
}

export default Authors
