import { Link } from 'react-router-dom';
import React from 'react'
import error from "../images/error.svg";

function ErrorPage() {
  return (
    <div className="pageWrapper">
        <div className="errorPageText wrapper">
            <img src={ error } alt="Little animated characters with a question mark" />
            <h1>404 ERROR</h1>
            <p>This page does not exist. Are you sure you meant to travel here? Go back to the homepage to view better places to travel!</p>
            <Link to={`/`}>
                <button>Back</button>
            </Link> 
        </div>
    </div>
  )
}

export default ErrorPage;