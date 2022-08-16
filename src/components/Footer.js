import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <p className='copyright'>
          © 2022 - Made by <a className='footerLink' href="https://github.com/pinggyu"> Ping Yu </a> at Juno College
      </p>
      <p className="credits">
        Images provided by <a className='footerLink' href="https://unsplash.com/developers"> Unsplash API</a> and profanity filter by <a className='footerLink' href="https://www.purgomalum.com/index.html">PurgoMalum RESTful API.</a>
      </p>
      <p className="credits">
        Header background provided by <a className='footerLink' href="https://loading.io/"> loading.io</a>
      </p>
      <Link to={`/error`}>
        <p className='footerLink'>Don't click this</p>
      </Link> 
    </footer>
  )
}

export default Footer;