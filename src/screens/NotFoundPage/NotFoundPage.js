import React from 'react';
import { Link } from 'react-router-dom';

import "./index.scss"

const NotFoundPage = () => {
    return <div className="not-found">
      <p>
        <div>
          Error 404
          Page was not found
        </div>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
};

export default NotFoundPage;
