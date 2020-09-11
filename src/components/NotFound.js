import React from "react"
<<<<<<< HEAD
=======
import PropTypes from "prop-types"

>>>>>>> 5d5cedb16550339d24af279c11510acdb0b739ca

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
