import earth from "../images/earth.svg";

function Header({ toggleAddModal }) {
  return (
      <header>
        <div className="headerContainer wrapper">
          <div className="headerTextContainer">
            <h1>Travel Sheets</h1>
            <h2>A travel itinerary board to inspire you on your next destination.</h2>
            <p>What are your favourite cities and the top 5 most memorable things to do there? Add it below and help others plan for their next trip ↓ </p>    
            <button 
            onClick={toggleAddModal}
            className="addTripBtn"
            >
              Add A Trip
            </button>        
          </div>
          <div className="imgContainer headerImg" data-aos='zoom-in' data-aos-duration='1200' data-aos-easing='ease' data-aos-delay="0">
            <img src={earth} alt="The earth" />
          </div>
        </div>
      </header>
  )
}

export default Header;