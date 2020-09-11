import React from "react"
import PropTypes from "prop-types"


const NotFound = ({ history }) => (
  <div className='notFound'>
    <div className='Header'>
      404
    </div>
      <span>Page Not Found</span>
      <button size="small" color="primary" onClick={() => history.push("/")}>
        Go Home
      </button>
  </div>
);

export default NotFound
