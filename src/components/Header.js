import earth from "../images/earth.svg";

function Header({ toggleAddModal }) {
  return (
      <header>
        <div className="headerContainer wrapper">
          <div className="headerTextContainer">
            <h1>Travel Sheets</h1>
            <h2>A travel itinerary board to inspire you on your next destination.</h2>
            <p>What are your favourite cities and the 5 most memorable things to do in those cities? Contribute to the board below and help others plan their next trip ↓ </p>    
            <button 
            onClick={toggleAddModal}
            className="addTripBtn"
            >
              Contribute
            </button>        
          </div>
          <div className="imgContainer">
            <img src={earth} alt="The earth" />
          </div>
        </div>
      </header>
  )
}

export default Header;